import express from "express"
import { createBlog, deleteBlog, getAllBlogs, getSingleBlog, updateBlog, userBlogs } from "../controllers/blog.controller.js"
import upload from "../middlewares/multerConfig.js";

const router = express.Router();



router.get('/getallblogs', getAllBlogs);
router.post('/createBlog', upload.single('image'), createBlog);
router.put('/updateBlog/:id',upload.single('image'), updateBlog);
router.delete('/deleteBlog/:id', deleteBlog);

router.get('/user-blogs/:id', userBlogs);
router.get('/getsingleblog/:id', getSingleBlog);

export default router;