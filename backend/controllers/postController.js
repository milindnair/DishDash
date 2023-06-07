import Post from "../model/postsModel.js";

// Controller for creating a new post
export default async function createPost (req, res) {
  try {
    const { user, image_url, caption, comments } = req.body;

    // Create a new post
    const post = new Post({
      user,
      image_url,
      caption,
      comments
    });

    // Save the post to the database
    await post.save();

    res.status(201).json({ success: true, post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};


