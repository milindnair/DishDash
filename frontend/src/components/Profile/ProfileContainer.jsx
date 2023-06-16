import React from 'react';
import Avatar from '../HomeComponents/Avatar';
// import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Cook from '../HomeComponents/cooking.png';
import ProfileStats from './ProfileStats';
import { followUser } from '../../helper/networkhelper';

const ProfileContainer = ({ username, posts, followers, following, from, userId }) => {
  const followHandler = async () => {
    console.log(userId );
    try {
      
      const res = await followUser({ username: username, userId: userId });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full pt-4 bg-[#212121]">
      <div className="w-32 h-32 rounded-full overflow-hidden">
        <Avatar src={Cook}/>
      </div>
      <p className="text-sm text-gray-500">@{username}</p>
      <ProfileStats posts={posts} followers={followers} following={following} />

      
  
  <div className="mt-4 flex">
    {from === "Profile" ? (
      <>
        <button className="bg-gray-200 text-gray-700 rounded-full px-4 py-2 mr-4 flex items-center">
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
        <button className="bg-gray-200 text-gray-700 rounded-full px-4 py-2 mr-4 flex items-center" onClick={followHandler}>
          {/* <FaEdit className="mr-2" /> */}
          Follow
        </button>
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
