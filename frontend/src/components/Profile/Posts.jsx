import React, { useState, useEffect } from 'react';
import { getPosts } from '../../helper/posthelper';
import RingLoader from "react-spinners/RingLoader"

const Posts = () => {
  const user = localStorage.getItem('username');
  console.log(user);

  const [posts, setPosts] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log(user);
        const response = await getPosts(user); // Pass the username as an argument to the getPosts function
        setPosts(response.posts);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [user]);

  return (
    <div className="flex flex-col items-center">
      <p className="text-gray-700 text-lg font-bold mb-4">Posts</p>
      {isLoading ? (
        <div className="text-center"><RingLoader color="#36d7b7" /></div>
      ) : (
        <div className="grid grid-cols-3 gap-x-10 gap-y-4 w-5/6 mx-6">
          {Object.values(posts).map((post) => (
            <div
              key={post._id}
              className="w-full h-64 bg-gray-200 rounded-lg mb-4 hover:shadow-lg transition-all duration-300"
              style={{ backgroundImage: `url(${post.image_urls[0]})` }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
