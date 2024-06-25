//Model
import Blog from '../model/Blog.js';

export const getAllBlog = async (req, res) => {
    try {

        const allBlog = await Blog.find();
        res.status(200).json(allBlog);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "SErver Error" })
    }
}

export const getBlogByUserId = async (req, res) => {
    try {

        const userId = req.userId
        const userBlog = await Blog.find({ userId: userId }).lean();
        res.status(200).json(userBlog);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "SErver Error" })
    }
}

export const getBlog = async (req, res) => {
    try {
        const articleId = req.params.id
        const article = await Blog.findById(articleId);

        res.status(200).json(article);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "SErver Error" })
    }
}

export const createBlog = async (req, res) => {
    try {
        const userId = req.userId
        const data = req.body

        if (data.title == "" || data.description == "" || data.category == "") return res.status(409).json({ message: "Fill all the fields" })

        const newBlog = await Blog.create({
            ...data, userId: userId
        })

        await newBlog.save();

        res.status(201).json({ message: "Blog Created" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }
}

export const updateBlog = async (req, res) => {
    try {

        let userId = req.userId;
        let id = req.params.id
        let data = req.body

        const updatedBlog = await Blog.findOneAndUpdate({ _id: id, userId: userId }, data);

        if (!updatedBlog) return res.status(409).json({ message: "You don't have access to update the article" })

        res.status(202).json({ message: "Blog Updated" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "SErver Error" })
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const userId = req.userId
        const id = req.params.id;
        
        //This will check if the userid and blogid matches, if not means user is trying to delete someone's else blog
        const blog = Blog.findOne({_id: id ,userId: userId})
        if(!blog) return res.status(409).json({message: "You do not have access to delete the blog"})

        const artilce = await Blog.findByIdAndDelete(id);
        return res.status(200).json({ message: "Blog deleted" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "SErver Error" })
    }
}


