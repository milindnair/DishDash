import Post from "../model/postsModel.js";
import mongoose from "mongoose";

// Controller for creating a new post
export async function createPost(req, res) {
  try {
    const { user, image_urls, caption, comments } = req.body;

    // Convert image_urls to an array of objects with key-value pairs
    const imageUrlArray = image_urls.map((imageUrl, index) => ({
      key: index.toString(),
      value: imageUrl,
    }));

    // Create a new post
    const post = new Post({
      user,
      image_urls: imageUrlArray,
      caption,
      comments,
    });

    // Save the post to the database
    await post.save();

    res.status(201).json({ success: true, post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
}


// Controller for getting all posts
export async function getPosts(req, res) {
  try {
    const { username } = req.params; // Assuming you pass the userId in the request parameter

    const posts = await Post.find({ user: username }).populate('user').exec();

    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
}

