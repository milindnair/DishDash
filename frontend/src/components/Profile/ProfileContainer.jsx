import React from "react";
import Avatar from "../HomeComponents/Avatar";
// import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Cook from "../HomeComponents/cooking.png";
import ProfileStats from "./ProfileStats";
import { followUser, unfollowUser } from "../../helper/networkhelper";
// import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import 'tailwindcss/tailwind.css'

const ProfileContainer = ({
  username,
  posts,
  followers,
  following,
  from,
  userId,
  profilePic,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storefollowing = sessionStorage.getItem("following");
  //search  in storefollowing
  console.log(storefollowing);
  const isFollowing = storefollowing.includes(username);
  console.log(username);
  console.log(isFollowing);
  const bio  = sessionStorage.getItem("Bio");
  console.log(bio);

  const followHandler = async () => {
    console.log(userId);
    try {
      const res = await followUser({ username: username, userId: userId });
      console.log(res);

      dispatch({ type: "FOLLOW", payload: username });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const UnFollowHandler = async () => {
    console.log(userId);
    try {
      const loggedInUsername = sessionStorage.getItem("username");
      const res = await unfollowUser(loggedInUsername, username, userId);
      console.log(res);
      dispatch({ type: "UNFOLLOW", payload: username });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const editProfileHandler = () => {
    navigate("/editprofile");
    // console.log("Edit Profile");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full pt-4 bg-[#212121] font-sans">
      <div className="w-32 h-32 rounded-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={profilePic}
          alt="Rounded avatar"
        />
      </div>
      <p className="text-lg text-[#edcbb4] mt-4 ">@{username}</p>
      <p className="text-base text-[#bd9086]">{bio}</p>
      
      <ProfileStats posts={posts} followers={followers} following={following} />

      <div className="mt-4 ml- flex">
        {from === "Profile" ? (
          <>
            <button
              className="bg-gray-200 text-gray-700 rounded-full px-4 py-2 mr-4 flex items-center"
              onClick={editProfileHandler}
            >
              {/* <FaEdit className="mr-2" /> */}
              Edit Profile
            </button>
            <button className="bg-red-500 text-white rounded-full px-4 py-2 flex items-center">
              {/* <FaTrashAlt className="mr-2" /> */}
              Delete Account
            </button>
          </>
        ) : from === "ProfileView" ? (
          <>
            {!isFollowing ? (
              <button
                className="bg-gray-200 text-gray-700 rounded-full px-4 py-2 mr-4 flex items-center"
                onClick={followHandler}
              >
                {/* <FaEdit className="mr-2" /> */}
                Follow
              </button>
            ) : (
              <button
                className="bg-gray-200 text-gray-700 rounded-full px-4 py-2 mr-4 flex items-center"
                onClick={UnFollowHandler}
              >
                {/* <FaEdit className="mr-2" /> */}
                Unfollow
              </button>
            )}
            <button className="bg-red-500 text-white rounded-full px-4 py-2 flex items-center">
              {/* <FaTrashAlt className="mr-2" /> */}
              Report
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ProfileContainer;
