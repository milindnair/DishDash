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
      default: 'Private',
    },
    following: [String],
    followers: [String],
    requests: [String],
    posts: {
      type: Number,
      default: 0,
    },
    Bio:{
      type:String,
      default:""
    },
    profilePic:{
      type:String,
      default:""
    },
  });

export default mongoose.model.Users || mongoose.model('User', UserSchema);