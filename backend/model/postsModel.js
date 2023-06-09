import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user: {
    type: String, // Store the username as a string
    required: true
  },
  image_urls: {
    type: [String], // Array of strings to store multiple image URLs
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [{
    user: {
      type: String, // Store the username as a string
    },
    text: {
      type: String,
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  }],
  created_at: {
    type: Date,
    default: Date.now
  }
});


const Post = mongoose.model('Post', postSchema);

export default Post;
