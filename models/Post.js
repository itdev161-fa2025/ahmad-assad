const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true, 
        maxlength: 100,
    },
    body: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now, 
    },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;