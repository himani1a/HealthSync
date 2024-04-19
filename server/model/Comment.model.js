// model/Blog.model.js
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});


export default mongoose.model("comment", commentSchema);
