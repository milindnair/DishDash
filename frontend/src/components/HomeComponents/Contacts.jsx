import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faUser } from "@fortawesome/free-solid-svg-icons";
import Avatar from "./Avatar";
import Cook from "./icons8-chef-60.png";
import Card from "./Card";

const Contacts = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
      height={80}
      width={305}
      className="flex items-center justify-center bg-gray-100 px-4 py-3 rounded-lg"
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3 overflow-hidden">
          <Avatar src={Cook} className="w-10 h-10 rounded-full" alt="user" />
          <div>
            <p className="text-black font-semibold">Ironman</p>
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
                onClick={() => handleOptionClick("follow")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Follow
              </li>
              <li
                onClick={() => handleOptionClick("viewProfile")}
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
  );
};

export default Contacts;
