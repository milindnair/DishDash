import Navbar from "./HomeComponents/Navbar";
import ProfileContainer from "./Profile/ProfileContainer";
import PostSection from "./Profile/PostSection";
import { useSelector } from "react-redux";

const Profile = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const username = useSelector(state => state.username);

// const name = 'John Doe';
//   const userId = 'johndoe123';
  const posts = 10;
  const followers = 100;
  const following = 50;

  return (
    <div className="container mx-auto h-screen bg-[#212121]">
        <Navbar />
      <ProfileContainer
        userId={username}
        posts={posts}
        followers={followers}
        following={following}
      />
        <PostSection />
    </div>
  );
};
 

export default Profile;