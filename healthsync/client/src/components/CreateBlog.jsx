// components/CreateBlog.jsx
import React, { useState } from 'react';
import axios from 'axios';

const CreateBlog = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        author: '',
        image: null
    });
    const handleImageChange = (e) => {
        // Only update the file path if a file is uploaded, otherwise update the URL
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, imageFile: e.target.files[0], imageUrl: '' });
        } else {
            setFormData({ ...formData, imageUrl: e.target.value, imageFile: null });
        }
    };
    const handleChange = (e) => {
        const value = e.target.name === 'image' ? e.target.files[0] : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('content', formData.content);
        data.append('author', formData.author);
        data.append('image', formData.image);
        if (formData.imageFile) {
            data.append('imageFile', formData.imageFile);
        }
        data.append('imageUrl', formData.imageUrl);
        axios.post('/api/blogs', data)
             .then(response => console.log(response.data))
             .catch(error => console.error('Error creating blog:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
            <textarea name="content" value={formData.content} onChange={handleChange} required />
            <input type="text" name="author" value={formData.author} onChange={handleChange} required />
            <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleImageChange} />
            <input type="file" name="imageFile" onChange={handleImageChange} />

            <button type="submit">Create Blog</button>
        </form>
    );
};

export default CreateBlog;
