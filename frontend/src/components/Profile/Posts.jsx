import React, { useState, useEffect } from 'react';
import { getPosts } from '../../helper/posthelper';
import RingLoader from 'react-spinners/RingLoader';

const Posts = () => {
  const user = localStorage.getItem('username');
  console.log(user);

  const [posts, setPosts] = useState([]);
  const [isPostsLoaded, setIsPostsLoaded] = useState(false);

  useEffect(() => {
    if (!isPostsLoaded) {
      const fetchPosts = async () => {
        try {
          console.log(user);
          const response = await getPosts(user);
          const postsWithBase64Images = response.posts.map((post) => {
            const binaryData = post.image_urls[0].value.split(',').map(Number);
            const base64String = arrayBufferToBase64(binaryData);
            return { ...post, base64Image: base64String };
          });
          setPosts(postsWithBase64Images);
          setIsPostsLoaded(true);
        } catch (error) {
          console.error(error);
        }
      };

      fetchPosts();
    }
  }, [isPostsLoaded, user]);

  // Function to convert Uint8Array to Base64 encoded string
  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-gray-700 text-lg font-bold mb-4">Posts</p>
      {!isPostsLoaded ? (
        <div className="text-center">
          <RingLoader color="#36d7b7" />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-x-10 gap-y-4 w-5/6 mx-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="w-full h-64 bg-gray-200 rounded-lg mb-4 hover:shadow-lg transition-all duration-300"
              style={{
                backgroundImage: `url(data:image/jpeg;base64,${post.base64Image})`,
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
