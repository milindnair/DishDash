import Card from "./Card";
import Avatar from "./Avatar";
import Cook from "./cooking.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHomeUser } from "@fortawesome/free-solid-svg-icons";
import ProfilePic from "./icons8-chef-60.png";
import Resto_Events from "./icons8-celebration-60.png";
import Logout from "./icons8-exit-60.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const SideDiv = () => {
    const dispatch = useDispatch();
    const username = sessionStorage.getItem("username");
    const profilePic = sessionStorage.getItem("profilePic");


    const handleLogout = () => {
        // Handle logout click logic here
        sessionStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
        navigate('/login');
    
      };

    const navigate = useNavigate();
  return (
    <div className="w-1/4 p-4  h-full text-[#fff] sticky top-0">
      <Card height={60} width={280}>
        <div className="flex justify-center ">
          <Avatar src={profilePic} className="w-10 h-10 rounded-full" alt="user" />
          <span className="ml-2 mt-2 text-[#000] text-xl">{username}</span>
        </div>
      </Card>
      <div className="mt-5">
        <Card height={400} width={280}>
          <ul className="space-y-4">
            <li>
              <Card height={60} width={245} wantEffect={true}>
                <div className="flex items-center justify-center gap-x-1" onClick={() => {
                    navigate("/");
                }}>
                  <FontAwesomeIcon
                    icon={faHomeUser}
                    size="2xl"
                    className="text-black mr-2"
                  />
                  <p className="text-black w-[90px]">Chef's Den</p>
                </div>
              </Card>
            </li>
            <li>
              <Card height={60} width={245} wantEffect={true}>
                <div className="flex items-center justify-center gap-x-4" onClick={()=>{
                    navigate("/profile");
                }}>
                  <img src={ProfilePic} alt="profile" className="w-[35px]" />
                  <p className="text-black w-[90px]">Profile</p>
                </div>
              </Card>
            </li>
            <li>
              <Card height={60} width={245} wantEffect={true}>
                <div className="flex items-center justify-center gap-x-4 " onClick={()=>{
                    navigate("/restoevents");
                }}>
                  <img
                    src={Resto_Events}
                    alt="resto-events"
                    className="w-[35px]"
                  />
                  <p className="text-black ">Resto-Events</p>
                </div>
              </Card>
            </li>
            <li>
              <Card height={60} width={245} wantEffect={true}>
                <div className="flex items-center justify-center gap-x-4" onClick={handleLogout}>
                  <img src={Logout} alt="logout" className="w-[35px]" />
                  <p className="text-black w-[90px]">Logout</p>
                </div>
              </Card>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default SideDiv;
