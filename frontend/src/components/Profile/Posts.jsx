import React, { useState, useEffect } from 'react';
import { getPosts } from '../../helper/posthelper';
import RingLoader from 'react-spinners/RingLoader';

const Posts = (props) => {
  const user = props.user;
  console.log(user);

  const [posts, setPosts] = useState([]);
  const [isPostsLoaded, setIsPostsLoaded] = useState(false);

  useEffect(() => {
    if (!isPostsLoaded) {
      const fetchPosts = async () => {
        try {
          console.log(user);
          const response = await getPosts(user);
          console.log(response);
          const postsWithBase64Images = response.posts.map((post) => {
            const images = post.image_urls[0].url;
            
            return { ...post, base64Image: images };
          });
          setPosts(postsWithBase64Images);
          console.log(posts);
          setIsPostsLoaded(true);
        } catch (error) {
          console.error(error);
        }
      };

      fetchPosts();
    }
  }, [isPostsLoaded, user]);

  return (
    <div className="flex flex-col items-center">
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
                backgroundImage: `url(${post.base64Image})`,
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
