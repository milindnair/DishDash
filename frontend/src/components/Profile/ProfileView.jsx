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
            const fetchedUser = await getUser({ username: username });
            console.log(fetchedUser);
            setUser(fetchedUser); // Update the state directly with the fetched user data
            // Use the user data here or set it to the component's state
          } catch (error) {
            console.log(error);
          }
        };
      
        fetchUser();
      }, [username]);
      
      const posts = user.posts ? user.posts.length : 0;
      const followers = user.followers ? user.followers.length : 0;
      const following = user.following ? user.following.length : 0;
      console.log(user._id); // Now user._id should have the correct value
      

  return (
    <div className="container mx-auto h-screen bg-[#212121]">
        <Navbar />
      <ProfileContainer
        username={username}
        posts={posts}
        followers={followers}
        following={following}
        from={"ProfileView"}
        userId ={user._id}        
      />
        <PostSection user={username}/>
    </div>
  );
};
 

export default ProfileView;