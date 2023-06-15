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
    url: {
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
  dislikes:{
    type: Number,
    default: 0
  },
  liked_by: [{
    type: String
  }],
  disliked_by: [{
    type: String
  }],
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
