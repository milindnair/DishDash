import Card from "./Card";
import Avatar from "./Avatar";
import Cook from "./cooking.png";
import Button from "../authComponents/Button";
import { Fragment, React, useState, useEffect } from "react";
import { getUser } from "../../helper/helper";
import Face6RoundedIcon from "@mui/icons-material/Face6Rounded";
import axios from "axios";
import { acceptRequest,rejectRequest } from "../../helper/networkhelper";

const Requests = () => {
  const profilePic = sessionStorage.getItem("profilePic");
  const username = sessionStorage.getItem("username");
  const [user, setUser] = useState({ requests: [] }); // Provide an initial value for user state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userdata = await getUser({ username: username });
        console.log(userdata);
        setUser({ ...userdata, requests: userdata.requests || [] }); // Initialize requests as an empty array
      } catch (error) {
        console.log(error);
      }
    };

    // Fetch user data only if user.requests is empty
    if (user.requests.length === 0) {
      fetchUser();
    }
  }, [username,]); // Add user.requests to the dependency array
//   console.log(user.requests);

const acceptHandler = async (username) => {
    const requestUser = username;
    const loggedInUser = sessionStorage.getItem("username");
    try{
    const response = await acceptRequest(loggedInUser,requestUser);
    if(response.status === 200){
        //reload this component after accepting request
        window.location.reload();
    }
    console.log("Response:",response);
    } catch (error) {
        console.log(error);
    }

};

const rejectHandler = async (event) => {
    event.preventDefault(); // Prevent page reload
};
  

  // Check if user.requests is undefined or empty before mapping
  return (
    <Fragment>
      <div className="flex flex-col gap-3 mt-3">
        {user.requests &&
          user.requests.map((requestUser) => (
            <Card key={requestUser} height={130} width={300}>
              <div className="flex justify-between">
                {!profilePic ? (
                  <Face6RoundedIcon
                    className="w-10 rounded-full"
                    sx={{ height: "45px", width: "45px", color: "black" }}
                  />
                ) : (
                  <img
                    src={profilePic}
                    className="w-10 rounded-full"
                    alt="user"
                  />
                )}
                <p className="ml-3">
                  <b>{requestUser}</b> wants to add you to friends.
                </p>
              </div>
              <div className="flex justify-between mt-4">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg" onClick={() => acceptHandler(requestUser)}>
                  Accept
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg" onClick={rejectHandler}>
                  Reject
                </button>
              </div>
            </Card>
          ))}
      </div>
    </Fragment>
  );
};

export default Requests;
