import Navbar from "../HomeComponents/Navbar";
import ProfileContainer from "../Profile/ProfileContainer";
import PostSection from "../Profile/PostSection";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser } from "../../helper/helper";
import { useEffect,useState } from "react";

const ProfileView = () => {
    const { username } = useParams();
    // console.log(username);
    const [user,setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const user = await getUser({ username: username });
            console.log(user);
            setUser(user);
            // Use the user data here or set it to the component's state
          } catch (error) {
            console.log(error);
          }
        };      
        fetchUser();

      }, [username]);
      

    
    
// const name = 'John Doe';
//   const userId = 'johndoe123';
  const posts = user.posts ? user.posts.length : 0;
  const followers = user.followers ? user.followers.length : 0;
  const following = user.following ? user.following.length : 0;

  return (
    <div className="container mx-auto h-screen bg-[#212121]">
        <Navbar />
      <ProfileContainer
        userId={username}
        posts={posts}
        followers={followers}
        following={following}
      />
        <PostSection user={username}/>
    </div>
  );
};
 

export default ProfileView;