import Navbar from "./HomeComponents/Navbar";
import ProfileContainer from "./Profile/ProfileContainer";
import PostSection from "./Profile/PostSection";
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { getUser } from "../helper/helper";

const Profile = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const username = useSelector(state => state.username);

// const name = 'John Doe';
//   const userId = 'johndoe123';
  
const [user,setUser] = useState({});

useEffect(() => {
    const fetchUser = async () => {
      try {
        const userdata = await getUser({ username: username });
        console.log(userdata);
        setUser(userdata);
        // Use the user data here or set it to the component's state
      } catch (error) {
        console.log(error);
      }
    };      
    fetchUser();

  }, [username]);

  console.log(user);
  const posts = user.posts ? user.posts : 0;

  console.log(user);
  const followers = user.followers ? user.followers.length : 0;
  const following = user.following ? user.following.length : 0;

  return (
    
    <div className=" h-screen w-screen bg-[#212121]">
        <Navbar />
      <ProfileContainer
        username={username}
        posts={posts}
        followers={followers}
        following={following}
        from={"Profile"}
        profilePic={user.profilePic}
      />
        <PostSection user={sessionStorage.getItem('username')}/>
    </div>
  

  );
};
 

export default Profile;