import mongoose from "mongoose";
import Blog from "../models/blogSchema.js";
import User from "../models/userSchema.js";

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    if (!blogs) {
      res.status(500).json({ message: "No Blogs Found" });
    }

    return res.status(200).json({
      message: "All Blogs Fetched Successfully",
      blogCount: blogs.length,
      blogs,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error While Fetching Blogs", error });
  }
};

const createBlog = async (req, res) => {
  try {
    const { title, description, user } = req.body;

    console.log('Request body:', req.body);
    console.log('File:', req.file);

    // Check if all required fields are provided
    if (!title || !description || !req.file || !user) {
      return res.status(500).json({ message: "Provide all credentials" });
    }

    // Find the user by ID
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(500).json({ message: "No User Found! Please Login" });
    }

    // Create a new blog with the uploaded image path
    const blog = new Blog({
      title,
      description,
      image: req.file.path, // Store the path of the uploaded image
      user
    });

    // Start a session and transaction
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();

    return res.status(200).json({ message: "Blog Created successfully", blog });
  } catch (error) {
    console.error('Error creating blog', error);
    return res.status(500).json({ message: "Error While Creating Blog", error });
  }
};


const updateBlog = async (req,res) => {
    try {
        const {id} = req.params;


        const blog = await Blog.findByIdAndUpdate(id, req.body);

        if (!blog) {
            return res.status(404).json({message: "Blog Not Found"});
        }
        const updatedBlog = await Blog.findById(id);

        res.status(200).json({message: "Blog Updated Successfully",updatedBlog});

      } catch (error) {
      console.log(error)
        return res.status(500).json({ message: "Error While Updating Blog", error })
    }
}
const deleteBlog = async (req,res) => {
    try {
        const {id} = req.params;

        const blog = await Blog.findByIdAndDelete(id, req.body).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();

        if (!blog) {
            return res.status(404).json({message: "Blog Not Found"});
        }

        res.status(200).json({message: "Blog Deleted Successfully"});

    } catch (error) {
        return res.status(500).json({ message: "Error While Deleting Blog", error })
    }
}

const userBlogs = async (req,res) => {
  try {
    const userBlogs = await User.findById(req.params.id).populate("blogs");
    if (!userBlogs) {
      return res.status(404).json({message: "Blogs Not Found"});
    }
    res.status(200).json({message: "User Blogs Fetched Successfully", userBlogs});

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error })
  }
}

const getSingleBlog = async (req,res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("user");
    if(!blog) {
      return res.status(404).json({ message: "Blog Not Found!" });
    }
    res.status(200).json({ message: "Blog Found", blog });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error })
  }
}

export { getAllBlogs, createBlog, updateBlog, deleteBlog, userBlogs, getSingleBlog };
