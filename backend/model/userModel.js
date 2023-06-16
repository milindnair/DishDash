import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: [true, "Please provide a unique username"],
      unique: [true, "Username already exists"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    email: {
      type: String,
      required: [true, "Please provide a unique email"],
      unique: true,
    },
    firstName: String,
    lastName: String,
    mobile: Number,
    address: String,
    profile: String,
    visibility: {
      type: String,
      default: 'public',
    },
    following: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      username: String,
    }],
    followers: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      username: String,
    }],
    posts: {
      type: Number,
      default: 0,
    },
  });

export default mongoose.model.Users || mongoose.model('User', UserSchema);