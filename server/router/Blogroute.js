// In your router or server.js
import express from 'express';
import Blog from '../model/Blog.model.js'; // Adjust the path as per your folder structure
import multer from 'multer';
const router = express.Router();

const upload = multer({ dest: 'uploads/' }); // Keep this if you still want the upload functionality

// Endpoint to create a blog post with an image URL or uploaded image
router.post('/blogs', upload.single('imageFile'), async (req, res) => {
    const { title, content, author, imageUrl } = req.body;
    const imageFile = req.file ? req.file.path : null; // If an image was uploaded

    const blog = new Blog({
        title,
        content,
        author,
        imageUrl,
        imageFile
    });
    
    await blog.save();
    res.status(201).json(blog);
});
// Get all blogs
router.get('/blogs', async (req, res) => {
    const blogs = await Blog.find();
    res.json(blogs);
});

// Get a single blog by ID
router.get('/blogs/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
});

// Create a new blog
router.post('/blogs', async (req, res) => {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
});

// Update a blog
router.put('/blogs/:id', async (req, res) => {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBlog);
});

// Delete a blog
router.delete('/blogs/:id', async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

export default router;
