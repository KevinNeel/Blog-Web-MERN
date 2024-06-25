import express from 'express'
const blog = express.Router();

import authMiddleWare from '../middleware/authMiddleware.js'

import { getAllBlog, getBlog, createBlog, updateBlog, deleteBlog } from '../controller/blog_Controller.js';


//Blog
blog.get('/posts',authMiddleWare, getAllBlog);
blog.get('/posts/:id',authMiddleWare, getBlog);
blog.post('/posts',authMiddleWare, createBlog);
blog.put('/posts/:id',authMiddleWare, updateBlog);
blog.delete('/posts/:id',authMiddleWare, deleteBlog);

export default blog
