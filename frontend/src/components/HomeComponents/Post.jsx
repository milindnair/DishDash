import Card from "./Card";
import yumGif from "./yum.gif";
import yukGif from "./yuk.gif";
import yum1Gif from "./yum1.gif";
import yuk1Gif from "./yuk1.gif";
import { useState } from "react";
import Avatar from "./Avatar";
import Cook from "./cooking.png";
import Button from "../authComponents/Button";

const Post = () => {
  const [isYuk, setIsYuk] = useState(false);
  const [isYum, setIsYum] = useState(false);
  const [showComments, setShowComments] = useState(false);
  
  const comments = [
    { username: 'User1', comment: 'Great post!' },
    { username: 'User2', comment: 'I love this recipe!' },
    { username: 'User3', comment: 'Amazing presentation!' },
    { username: 'User4', comment: 'Thanks for sharing!' },
    { username: 'User5', comment: 'Yummy!' }
  ];
  
  const handleYukClick = () => {
    setIsYuk(true);
    setIsYum(false);

    setTimeout(() => {
      setIsYuk(false);
    }, 1500); // Set the duration of the GIF animation in milliseconds
  };

  const handleYumClick = () => {
    setIsYum(true);
    setIsYuk(false);

    setTimeout(() => {
      setIsYum(false);
    }, 1950); // Set the duration of the GIF animation in milliseconds
  };

  const commentHandler = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="mt-5">
      <Card height={showComments ? 910 : 720} width={720}>
        <div className="flex justify-between">
          <div className="flex">
            <img
              src="https://picsum.photos/200"
              alt="profile"
              className="rounded-full h-10 w-10"
            />
            <div className="ml-2">
              <h1 className="text-black font-bold">Username</h1>
              <h1 className="text-gray-400">Date</h1>
            </div>
          </div>
          <div className="flex">
            <div className="ml-5 flex flex-col">
              <img
                src={isYuk ? yukGif : yuk1Gif}
                alt="Animated GIF"
                style={{ height: "40px" }}
                onClick={handleYukClick}
              />
              <h1 className="text-black font-bold">Yuk</h1>
            </div>
            <div className="ml-5 flex flex-col">
              <img
                src={isYum ? yumGif : yum1Gif}
                alt="Animated GIF"
                style={{ height: "40px" }}
                onClick={handleYumClick}
              />
              <h1 className="text-black font-bold">Yum</h1>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <img
            src="https://picsum.photos/720/500"
            alt="post"
            className="rounded-lg"
            style={{ height: "500px", width: "720px" }}
          />
        </div>
        <div className="mt-5">
          <p className="text-black-400">Caption</p>
        </div>
        <div className="mt-5 flex flex-col  ">
          <div className="flex justify-between">
            <Avatar src={Cook} className="w-[40px] rounded-full mr-2" />
            <input
              type="text"
              className="w-4/6 border border-gray-300 p-2 rounded-md focus:outline-none"
              placeholder="Comment on this post"
            />
            <Button
              onClick={commentHandler}
              type="submit"
              title="View Comments"
            />
          </div>

          {showComments && (
            <div className="mt-5 h-40 overflow-y-auto flex flex-col gap-4">
              {/* Map and render comments */}
              {comments.map((comment, index) => (
                <div key={index}>
                  <h2>{comment.username}</h2>
                  <p>{comment.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Post;
