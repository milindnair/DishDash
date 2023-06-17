import Logo from "./dishdash-logo.png";
import Cook from "./cooking.png";
import Avatar from "./Avatar";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import axios from "axios";
import { useState } from "react";
import { getUser } from "../../helper/helper";

const Navbar = () => {
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();
  const NewPostHandler = () => {
    // Handle new post click logic here
    console.log("New Post");
    navigate("/newpost");
  };

  const searchHandler = async (event) => {
    event.preventDefault(); // Prevent page reload
  
    try {
      console.log(searchText);
      if(searchText === sessionStorage.getItem("username")){
        navigate("/profile");
      }
      else{
        navigate(`/profile/${searchText}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="bg-[#212121] relative border-b-2 p-3">
      <img src={Logo} alt="logo" className="h-[75px] w-[100px] pl-4 " />

      <form className="absolute top-1/2 transform -translate-y-1/2 right-28">
        {/* search input field */}
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <Search searchText={searchText} setSearchText={setSearchText} onClick={searchHandler} />
      </form>

 
      <div>
        <button
          className="bg-[#ff4545] absolute top-1/2 w-[180px] transform -translate-y-1/2 right-[90px] text-[#fff] rounded-xl p-2 flex gap-4 "
          onClick={NewPostHandler}
        >
          <img src={Cook} alt="cooking" className="h-[25px] w-[40px] pl-4  " />
          Create Post
        </button>
      </div>

      
      <Avatar
        src={Cook}
        className={
          "w-10 absolute top-1/2 transform -translate-y-1/2 right-4 rounded-full"
        }
        alt="user"
      />
    </div>
  );
};

export default Navbar;
