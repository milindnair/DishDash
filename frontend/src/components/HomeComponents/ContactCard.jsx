import React from 'react';
import Card from "./Card";
import Face6RoundedIcon from "@mui/icons-material/Face6Rounded";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faUser } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../helper/helper";
import { followUser } from '../../helper/networkhelper';
import { useDispatch } from "react-redux";


const ContactCard = (props) => {
    console.log(props.user.username);
    console.log(props.user._id);
    const dispatch = useDispatch();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const profilePic = sessionStorage.getItem("profilePic");
    const handleDropdownToggle = () => {

        setIsDropdownOpen(!isDropdownOpen);
      };
    
      const handleOptionClick = async  (option,username) => {
        if (option === "follow") {
            try {
                console.log(username,"username",props.user._id,"userid");
                const res = await followUser({ username: username, userId: props.user._id });
                console.log(res);
          
                dispatch({ type: "FOLLOW", payload: username });
                
                // window.location.reload();
              } catch (err) {
                console.log(err);
              }

        } else if (option === "viewProfile") {
          navigate(`/profile/${username}`);
        }
      };
    
    
      useEffect(() => {
        const handleClickOutside = (event) => {
          if (isDropdownOpen && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
          }
        };
    
        document.addEventListener("click", handleClickOutside);
    
        return () => {
          document.removeEventListener("click", handleClickOutside);
        };
      }, [isDropdownOpen]);

  return (
    <Card
            key={props.user._id} // Make sure to provide a unique key prop here
            height={80}
            width={305}
            className="flex items-center justify-center bg-gray-100 px-4 py-3 rounded-lg"
          >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3 overflow-hidden">
              {!profilePic ? <Face6RoundedIcon className={"w-10 h-10 rounded-full"} sx={{ height: "45px", width: "45px", color: "black" }} /> : <img
                className={"w-10 h-10 rounded-full"}
                src={profilePic}
                alt="Rounded avatar"

              />}
              <div>
                <p className="text-black font-semibold">{props.user.username}</p>
              </div>
            </div>
            <button
              className="focus:outline-none"
              onClick={handleDropdownToggle}
              ref={dropdownRef}
            >
              <FontAwesomeIcon icon={faEllipsisH} className="text-black" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                <ul className="py-2">
                  <li
                    onClick={() => handleOptionClick("follow",props.user.username)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    Follow
                  </li>
                  <li
                    onClick={() => handleOptionClick("viewProfile",props.user.username)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    View Profile
                  </li>
                </ul>
              </div>
            )}
          </div>
        </Card>
  )
}

export default ContactCard;