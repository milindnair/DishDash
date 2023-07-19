import axios from 'axios';

// axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export async function authenticate(username){
    try{
        return await axios.post('/api/authenticate', {username});
    }
    catch(err){
        return{error : "Username doesnt exist"}
}
}

export async function getUser({username}){
    try{
       const {data} =  await axios.get(`http://localhost:8080/api/user/${username}`);
         return data;
    }catch(error){
        return{error : "Password doesnt match"};
    }
}

//register user function
export async function registerUser(user) {
    try {
      const response = await axios.post('http://localhost:8080/api/register', user);
      console.log(response.data);
      return response.data; // Return the response data
    } catch (error) {
      throw error; // Throw the error for the caller to handle
    }
  }

//login function
export async function verifyPassword({ username, password }) {
    try {
      if (username) {
        const { data } = await axios.post('http://localhost:8080/api/login', { username: username, password: password });
        return Promise.resolve({ data });
      } else {
        throw new Error('Username is required.'); // Reject the promise with an error
      }
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

//update user profile function 
export async function updateUser(response){
    try{

        const token = await sessionStorage.getItem('token');
        const {data} = await axios.put('/api/updateuser',response,{headers : {"Authorization" : `Bearer ${token}`}});
        return Promise.resolve({data});
    }catch(error){
        return Promise.reject({error : "Error updating user profile"});
    }
}

//generate otp
export async function generateOTP(username){
    try{
        const {data: {code} , status} = await axios.get('/api/generateOTP' , {params : {username}});
        if(status === 201){
            let {data : {email}} = await getUser({username});
            let text = `Your password recovery OTP is ${code}`;
            await axios.post('/api/registerMail',{username , userEmail : email , text , subject: "Password Recovery OTP"});
        }
        return Promise.resolve({code});
    }catch(error){
        return Promise.reject({error });
    }
}

//verify OTP
export async function verifyOTP({username , code}){
    try{
        const {data , status} = await axios.get('/api/verifyOTP',{params : {username , code}});
        return {data , status};
    }catch(error){
        return Promise.reject({error});
    }
}

//reset password
export async function resetPassword({username , password}){
    try{
        const {data , status} = await axios.put('/api/resetPassword',{username , password});
        return Promise.resolve({data , status});
    }catch(error){
        return Promise.reject({error});
    }
} 

//get all users
export async function getAllUsers(){
    try{
        const data = await axios.get('http://localhost:8080/api/getAllUsers');
        return Promise.resolve(data);
    }catch(error){
        return Promise.reject({error});
    }
}

