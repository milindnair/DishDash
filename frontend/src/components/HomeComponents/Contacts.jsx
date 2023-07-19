import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faUser } from "@fortawesome/free-solid-svg-icons";
import Avatar from "./Avatar";
import Cook from "./icons8-chef-60.png";
import Card from "./Card";
import Face6RoundedIcon from "@mui/icons-material/Face6Rounded";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../helper/helper";
import ContactCard from "./ContactCard";

const Contacts = () => {
  
  const [users, setUsers] = useState([]);


  
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersdata = await getAllUsers();
        setUsers(usersdata.data);
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);
  console.log(users);


  return (
    users.map((user) => {
      console.log(user);
      if (user.username !== sessionStorage.getItem("username") && user !== sessionStorage.getItem("following")) {
        return (
        //   <Card
        //     key={user._id} // Make sure to provide a unique key prop here
        //     height={80}
        //     width={305}
        //     className="flex items-center justify-center bg-gray-100 px-4 py-3 rounded-lg"
        //   >
        //   <div className="flex items-center justify-between w-full">
        //     <div className="flex items-center gap-3 overflow-hidden">
        //       {!profilePic ? <Face6RoundedIcon className={"w-10 h-10 rounded-full"} sx={{ height: "45px", width: "45px", color: "black" }} /> : <img
        //         className={"w-10 h-10 rounded-full"}
        //         src={profilePic}
        //         alt="Rounded avatar"

        //       />}
        //       <div>
        //         <p className="text-black font-semibold">{user.username}</p>
        //       </div>
        //     </div>
        //     <button
        //       className="focus:outline-none"
        //       onClick={handleDropdownToggle}
        //       ref={dropdownRef}
        //     >
        //       <FontAwesomeIcon icon={faEllipsisH} className="text-black" />
        //     </button>

        //     {isDropdownOpen && (
        //       <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
        //         <ul className="py-2">
        //           <li
        //             onClick={() => handleOptionClick()}
        //             className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        //           >
        //             <FontAwesomeIcon icon={faUser} className="mr-2" />
        //             Follow
        //           </li>
        //           <li
        //             onClick={() => handleOptionClick()}
        //             className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        //           >
        //             <FontAwesomeIcon icon={faUser} className="mr-2" />
        //             View Profile
        //           </li>
        //         </ul>
        //       </div>
        //     )}
        //   </div>
        // </Card>
        <ContactCard user={user} />
        )
      }
    })
  );
};

export default Contacts;
