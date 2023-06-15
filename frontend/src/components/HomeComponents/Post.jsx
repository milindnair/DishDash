import Card from "./Card";
import yumGif from "./yum.gif";
import yukGif from "./yuk.gif";
import yum1Gif from "./yum1.gif";
import yuk1Gif from "./yuk1.gif";
import { useState, useEffect } from "react";
import Avatar from "./Avatar";
import Cook from "./cooking.png";
import Button from "../authComponents/Button";
import Carousel from "../PostComponents/Carousel";
import { getFeedPosts } from "../../helper/posthelper";
import { addComment } from "../../helper/posthelper";
import { likePost } from "../../helper/posthelper";
import { dislikePost } from "../../helper/posthelper";
import { set } from "mongoose";

const Post = () => {
  const [isYuk, setIsYuk] = useState(false);
  const [isYum, setIsYum] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [yuks, setYuks] = useState(0);
  const [yums, setYums] = useState(0);

  const handleYukClick = async (postId) => {
    try{
      if(isYuk){
        setIsYuk(false);
        setYuks(yuks-1);
        await dislikePost({postId: postId , username: localStorage.getItem("username")});
      }
      else if(isYum){
        setIsYum(false);
        setIsYuk(true);
        setYuks(yuks+1);
        setYums(yums-1);
        await dislikePost({postId: postId , username: localStorage.getItem("username")});
      }
      else{
        setIsYuk(true);
        setYuks(yuks+1);
        await dislikePost({postId: postId , username: localStorage.getItem("username")});
      }
    }catch(error){
      console.log("Error:", error.message);
    }
  };

  const handleYumClick = async (postId) => {
    try{
      if(isYum){
        setIsYum(false);
        setYums(yums-1);
        await likePost({postId: postId , username: localStorage.getItem("username")});
      }
      else if(isYuk){
        setIsYuk(false);
        setIsYum(true); 
        setYuks(yuks-1);
        setYums(yums+1);
        await likePost({postId: postId , username: localStorage.getItem("username")});
      }
      else{
        setIsYum(true);
        setYums(yums+1);
        await likePost({postId: postId , username: localStorage.getItem("username")});
      }
    }catch(error){
      console.log("Error:", error.message);
    }
  };
  
  
  

  const commentHandler = () => {
    setShowComments(!showComments);
  };

  const addCommentHandler = async (postId) => {
    try {
      if (!commentText) {
        alert("Comment cannot be empty");
        return;
      }
      const username = localStorage.getItem("username");
      await addComment({ postId, username, text: commentText });
      setCommentText(""); // Clear the input field

      // Additional logic or UI updates after adding the comment
    } catch (error) {
      console.error("Error:", error.message);
      // Handle the error state or display an error message to the user
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const username = localStorage.getItem("username");
        const response = await getFeedPosts(username);
        console.log(response);
        setPosts(response);
  
        // Calculate the total dislikes (yuks) and likes (yums) for all posts
        let totalYuks = 0;
        let totalYums = 0;
  
        response.forEach((post) => {
          totalYuks += post.dislikes;
          totalYums += post.likes;
        });
  
        setYuks(totalYuks);
        setYums(totalYums);
  
        const alreadyLikedPost = response.find(
          (post) => post.liked_by && post.liked_by.includes(username)
        );
        const alreadyDislikedPost = response.find(
          (post) => post.disliked_by && post.disliked_by.includes(username)
        );
  
        if (alreadyLikedPost) {
          setIsYum(true);
        } else {
          setIsYum(false);
        }
  
        if (alreadyDislikedPost) {
          setIsYuk(true);
        } else {
          setIsYuk(false);
        }
      } catch (error) {
        console.log("Error:", error.message);
      }
    };
  
    fetchPosts();
  }, []);
  

  return (
    <div className="mt-5">
      {posts.map((post) => (
        <Card key={post._id} height={showComments ? 980 : 790} width={720}>
          <div className="flex justify-between">
            <div className="flex">
              <img
                src="https://picsum.photos/200"
                alt="profile"
                className="rounded-full h-10 w-10"
              />
              <div className="ml-2">
                <h1 className="text-black font-bold">{post.user}</h1>
                <h1 className="text-gray-400">Date</h1>
              </div>
            </div>
            <div className="flex">
              <div className="ml-5 flex flex-col">
                <img
                  src={isYuk ? yukGif : yuk1Gif}
                  alt="Animated GIF"
                  style={{ height: "40px" }}
                  onClick={() => handleYukClick(post._id)}
                />
                <h1 className="text-black font-bold">{yuks} Yuk</h1>
              </div>
              <div className="ml-5 flex flex-col">
                <img
                  src={isYum ? yumGif : yum1Gif}
                  alt="Animated GIF"
                  style={{ height: "40px", width: "40.92px" }}
                  onClick={() => handleYumClick(post._id)}
                />
                <h1 className="text-black font-bold">{yums} Yum</h1>
              </div>
            </div>
          </div>

          <Carousel slides={post.image_urls} />

          {/* <div className="mt-5">
           <img
             src="https://picsum.photos/720/500"
             alt="post"
             className="rounded-lg"
             style={{ height: "500px", width: "720px" }}
           />
         </div> */}
          <div className="mt-5">
            <p className="text-black-400">{post.caption}</p>
          </div>
          <div className="mt-5 flex flex-col  ">
            <div className="flex justify-between">
              <Avatar src={Cook} className="w-[40px] rounded-full mr-2" />
              <input
                type="text"
                className="w-4/6 border border-gray-300 p-2 rounded-md focus:outline-none"
                placeholder="Comment on this post"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <Button
                onClick={() => addCommentHandler(post._id)}
                type="submit"
                title="Post Comment"
              />
            </div>
            <div className="mt-2">
              <Button
                onClick={commentHandler}
                type="submit"
                title="View Comments"
              />
            </div>

            {showComments && (
              <div className=" h-40 overflow-y-auto flex flex-col gap-4">
                {post.comments.map((comment, index) => (
                  <div key={index} className="flex align-center">
                    <h2 style={{ marginRight: "10px" }}>{comment.user}</h2>
                    <p>{comment.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      ))}
      ;
    </div>
  );
};

export default Post;
