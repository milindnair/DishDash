import { useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Face6RoundedIcon from '@mui/icons-material/Face6Rounded';

const Avatar = (props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    console.log("toggle");
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleProfileClick = () => {
    // Handle profile click logic here
    console.log("Profile");
    navigate('/profile');
  };

  const handleLogoutClick = () => {
    // Handle logout click logic here
    sessionStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');

  };

  const handleHomeClick = () => {
    // Handle home click logic here
    navigate('/');
  };

  return(
    <>
    
  {!props.ProfilePic ? <Face6RoundedIcon className={props.className} sx={{height:"45px",width:"45px"}} onClick={toggleDropdown} /> : <img
    className={props.className}
    src={props.src}
    alt="Rounded avatar"
    onClick={toggleDropdown}
  />}

  {isDropdownOpen && (
    <div className="absolute top-full right-0 mt-1/2 py-2 bg-white shadow-lg rounded z-50">
      <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 z-100" onClick={handleProfileClick}>
        Profile
      </button>
      <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={handleLogoutClick}>
        Logout
      </button>
      <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={handleHomeClick}>
        Home
      </button>
    </div>
  )}
  
  </>
);
};

export default Avatar;
