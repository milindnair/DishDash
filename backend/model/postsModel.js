import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  image_urls: [{
    key: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  }],
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
      type: String,
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
