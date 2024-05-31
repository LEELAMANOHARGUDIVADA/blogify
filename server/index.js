import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/userSchema.js";

import blogRoutes from "./routes/blogRoutes.js";
import multer from "multer";
import Blog from "./models/blogSchema.js";
import generateToken from "./utils/jwt.js";
import bcrypt from "bcryptjs";
dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/images", express.static("images"));

app.get("/", (req, res) => {
  res.send("App is working correctly");
});

mongoose.set(`strictQuery`, false);

const DB = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(error);
  }
};

app.use("/api/blog", blogRoutes);

app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = User.findOne({ email });
    if (existingUser === existingUser.email) {
      return res.status(400).json({ error: "Email already exists" });
    }

    if (!email || !name || !password) {
      return res.status(400).json("Please provide all credentials");
    }

    const user = new User({ email, password, name });
    await user.save();

    res
      .status(200)
      .json({
        message: "User registered successfully",
        user,
        token: generateToken(user._id),
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      throw new Error("Invalid credentials");
    }
    res
      .status(200)
      .json({
        message: "Login Successful",
        user,
        token: generateToken(user._id),
      });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

//image upload
const storage = multer.diskStorage({
  destination: (req, file, fn) => {
    fn(null, "images");
  },
  filename: (req, file, fn) => {
    fn(null, req.body.img);
    fn(null, "image1.jpg");
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  // console.log(req.body)
  res.status(200).json("Image has been uploaded successfully!");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  try {
    console.log("Server Running on", PORT);
    connectDB();
  } catch (error) {
    console.log(error);
  }
});
