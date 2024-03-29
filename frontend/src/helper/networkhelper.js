import axios from "axios";


export async function followUser({username,userId}) {
    try{
    
        const data = {
            userId: userId,
            username: username,
            loggedInUsername: sessionStorage.getItem('username'),
        };
        console.log(data);
        const res = await axios.put('http://localhost:8080/api/followUser', data);
        return res;
    }catch(error){
        console.error(error);
    }
};

export  async function unfollowUser(loggedInUser,username,userId) {
    try{
        const data = {
            userId: userId,
            username: username,
            loggedInUsername: loggedInUser,
        };
        const res = await axios.put('http://localhost:8080/api/unfollowUser', data);
        return res;
    }catch(error){
        console.error(error);
    }
};

export async function acceptRequest(loggedInUser,username) {
    try{
        const data = {
            followerUsername: username,
            loggedInUsername: loggedInUser,
        };
        console.log(data);
        const res = await axios.put('http://localhost:8080/api/acceptRequest', data);
        return res;
    }catch(error){
        console.error(error);
    }
}

export async function rejectRequest(loggedInUser,username,userId) {
    try{
        const data = {
            username: username,
            loggedInUsername: loggedInUser,
        };
        const res = await axios.put('http://localhost:8080/api/rejectRequest', data);
        return res;
    }catch(error){
        console.error(error);
    }
}
