import React, { useState } from 'react';
import About from './About';
import Posts from './Posts';

const PostSection = (props) => {
  const [activeTab, setActiveTab] = useState('About');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="w-full bg-[#212121]">
      <div className="flex justify-between w-full mb-4">
      <button
          className={`${
            activeTab === 'About' ? 'font-bold' : 'font-normal'
          } text-gray-700 px-4 py-2 text-center w-1/2`}
          onClick={() => handleTabClick('About')}
        >
          About
        </button>
        <button
          className={`${
            activeTab === 'Posts' ? 'font-bold' : 'font-normal'
          } text-gray-700 px-4 py-2 text-center w-1/2`}
          onClick={() => handleTabClick('Posts')}
        >
          Posts
        </button>
      </div>
      <div className="flex justify-between w-full">
        <div
          className={`${
            activeTab === 'About' ? 'bg-blue-500' : 'bg-gray-200'
          } h-1 w-1/2 rounded-full transition-all duration-300`}
        ></div>
        <div
          className={`${
            activeTab === 'Posts' ? 'bg-blue-500' : 'bg-gray-200'
          } h-1 w-1/2 rounded-full transition-all duration-300`}
        ></div>
      </div>
      {activeTab === 'About' ? <About /> : <Posts user={props.user}/>}
    </div>
  );
};

export default PostSection;
