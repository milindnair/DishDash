import mongoose from "mongoose";
import User from "../model/userModel.js";

export async function followUser(req, res) {
    try {
        const { userId, username, loggedInUsername } = req.body;
        const validUserId = new mongoose.Types.ObjectId(userId);
        const user = await User.findById(validUserId);
        const loggedInUserdata = await User.findOne({ username: loggedInUsername });
        //find user with logginInusername
        
        console.log(user); 
    
        // add logginInUser into the user's followers list
        user.followers.push({ 
            username: loggedInUsername,
        });

        //increment the followers count
        user.followersCount += 1;

        //add the user into the loggedInUser's following list
        
        loggedInUserdata.following.push({
            username: username,
        });

        console.log(loggedInUserdata)

        await user.save();
        await loggedInUserdata.save();
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export async function unfollowUser(req, res) {
    try{
        const { userId, username, loggedInUsername } = req.body;
        const validUserId = new mongoose.Types.ObjectId(userId);
        const user = await User.findById(validUserId);
        const loggedInUserdata = await User.findOne({ username: loggedInUsername });
        //find user with logginInusername
        
    
        // remove the loggedIn from the user's followers list
        user.followers = user.followers.filter((user) => user.username !== loggedInUsername);

        //increment the followers count
        user.followersCount -= 1;

        //add the user into the loggedInUser's following list        
        loggedInUserdata.following = loggedInUserdata.following.filter((user) => user.username !== username);

        await user.save();
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};