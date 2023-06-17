import mongoose from "mongoose";
import User from "../model/userModel.js";

export async function followUser(req, res) {
  try {
    const { userId, username, loggedInUsername } = req.body;
    const validUserId = new mongoose.Types.ObjectId(userId);
    const user = await User.findById(validUserId);
    const loggedInUserdata = await User.findOne({ username: loggedInUsername });

    console.log(user);

    // Add loggedInUsername to the user's followers list
    user.followers.push(loggedInUsername);
    user.followersCount += 1;

    // Add username to the loggedInUser's following list
    loggedInUserdata.following.push(username);

    console.log(loggedInUserdata);

    await user.save();
    await loggedInUserdata.save();
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function unfollowUser(req, res) {
  try {
    const { userId, username, loggedInUsername } = req.body;
    console.log(req.body);
    const validUserId = new mongoose.Types.ObjectId(userId);
    const user = await User.findById(validUserId);
    const loggedInUserdata = await User.findOne({ username: loggedInUsername });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // remove the loggedInUsername from the user's followers list
    user.followers = user.followers.filter(
      (follower) => follower !== loggedInUsername
    );

    // decrement the followers count
    user.followersCount -= 1;

    // remove the username from the loggedInUser's following list
    loggedInUserdata.following = loggedInUserdata.following.filter(
      (followedUser) => followedUser !== username
    );

    await user.save();
    await loggedInUserdata.save();
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
}

