import React, { useState } from 'react';
import Posts from './Posts';

const PostSection = (props) => {

  return (
    <div className="w-full bg-[#212121]">
      <div className="flex justify-center w-full mb-4 mt-10">
        <button className="font-bold text-white px-4 py-2 text-center text-2xl">
          Posts
        </button>
      </div>
      <div className="border-b w-full transition-all duration-300 hover:transform hover:translate-y-[-2px]" />
      <Posts user={props.user} />
    </div>
  );
};

export default PostSection;
