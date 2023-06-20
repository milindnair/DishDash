import Navbar from "../HomeComponents/Navbar";
import ProfileContainer from "../Profile/ProfileContainer";
import PostSection from "../Profile/PostSection";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser } from "../../helper/helper";
import { useEffect, useState,useRef } from "react";
import Snackbar from "../PostComponents/Snackbar";
import { useNavigate } from "react-router-dom";

const ProfileView = () => {
  const snackbarRef = useRef(null);
  const navigate = useNavigate();
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [showSnackbar, setShowSnackbar] = useState(false); // State variable for controlling Snackbar visibility

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUser({ username: username });
        if (fetchedUser.error) {
          setShowSnackbar(true); // Show the Snackbar
          snackbarRef.current.show();
          setTimeout(() => {
            navigate('/error');
          }, 500);
          return;
        }
        setUser(fetchedUser);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [username]);

  const posts = user.posts ? user.posts.length : 0;
  const followers = user.followers ? user.followers.length : 0;
  const following = user.following ? user.following.length : 0;

  const ProfilePic = user.profilePic;

  return (
    <div className="container mx-auto h-screen bg-[#212121]">
      <Navbar />
      <ProfileContainer
        username={username}
        posts={posts}
        followers={followers}
        following={following}
        from={'ProfileView'}
        userId={user._id}
        ProfilePic={ProfilePic}
      />
      <PostSection user={username} />

      {/* Render the Snackbar component conditionally */}
      {showSnackbar && (
        <Snackbar
          ref={snackbarRef}
          message="User not found!"
          type="fail"
        />
      )}
    </div>
  );
};

export default ProfileView;
