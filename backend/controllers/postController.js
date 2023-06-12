import Post from "../model/postsModel.js";
import mongoose from "mongoose";
import User from "../model/userModel.js";

// Controller for creating a new post
export async function createPost(req, res) {
  try {
    const { user, image_urls, caption, comments } = req.body;

    // Convert image_urls to an array of objects with key-value pairs
    const imageUrlArray = image_urls.map((imageUrl, index) => ({
      key: index.toString(),
      url: imageUrl,
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


// Controller for getting all posts on profile 
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

// Controller for getting all posts on feed
export async function getFeedPosts(req, res) {
  try {
    const { username } = req.params; // Assuming you have the user's username available in the request parameters
    const user = await User.findOne({ username }); // Assuming you have a User model to retrieve user information

    const followedUsers = user.following; // Assuming the user.following property contains an array of followed user usernames

    const posts = await Post.find({
      $or: [
        { visibility: 'public' }, // Fetching posts with public visibility
        { user: { $in: followedUsers } } // Fetching posts of followed users
      ]
    })
      .populate('user', 'username') // Assuming you want to populate the 'user' field with the 'username' only
      .exec();

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

//Controller to handle comments
export async function addComment(req, res) {
  try{
    const {username, text} = req.body;
    const {postId} = req.params;
    const validPostId = new mongoose.Types.ObjectId(postId);
    const post = await Post.findById(validPostId);
    post.comments.push({user:username, text});
    await post.save();
    res.status(200).json({success: true, post});
  }catch(error){
    console.error(error);
    res.status(500).json({success: false, error: error});
  }
}



