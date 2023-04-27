import React, { useState } from 'react';

const PostSection = () => {
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
      {activeTab === 'About' && (
        <div className="flex flex-col items-center">
          <p className="text-gray-700 text-lg font-bold mb-4">Bio</p>
          <p className="text-gray-600 text-sm mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            quis justo nisi. In eu lorem eget tellus placerat condimentum vitae
            quis odio. Nunc id neque sit amet sapien ullamcorper efficitur non
            nec elit.
          </p>
          <p className="text-gray-700 text-lg font-bold mb-4">Interests</p>
          <ul className="list-disc list-inside text-gray-600 text-sm mb-8">
            <li>Traveling</li>
            <li>Reading</li>
            <li>Watching movies</li>
          </ul>
        </div>
      )}
      {activeTab === 'Posts' && (
        <div className="flex flex-col items-center">
          <p className="text-gray-700 text-lg font-bold mb-4">Posts</p>
          <div className="bg-gray-200 w-full h-64 mb-8"></div>
          <div className="bg-gray-200 w-full h-64 mb-8"></div>
          <div className="bg-gray-200 w-full h-64 mb-8"></div>
        </div>
      )}
    </div>
  );
};

export default PostSection;
