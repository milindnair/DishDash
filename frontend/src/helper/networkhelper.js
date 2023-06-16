import axios from "axios";


export async function followUser({username,userId}) {
    try{
    
        const data = {
            userId: userId,
            username: username,
            loggedInUsername: localStorage.getItem('username'),
        };
        console.log(data);
        const res = await axios.put('http://localhost:8080/api/followUser', data);
        return res;
    }catch(error){
        console.error(error);
    }
};

export  async function unfollowUser(logginInUser,username,userId) {
    try{
        const data = {
            userId: userId,
            username: username,
            loggedInUsername: logginInUser,
        };
        const res = await axios.post('http://localhost:8080/api/unfollowUser', data);
        return res;
    }catch(error){
        console.error(error);
    }
};