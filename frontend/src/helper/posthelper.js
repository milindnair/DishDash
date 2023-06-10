import axios from 'axios';
import { getUser } from './helper';

//add new posts to db
export   async function createPost({post}){
    try{
        const response = await axios.post('http://localhost:8080/api/createPost', post);
        console.log(response.data);
        return Promise.resolve(response.data);
    }catch(error){
        console.error(error);
        return Promise.reject(error);
    }
}

//fetch posts from db
export async function getPosts(username) {
    try {
      const response = await axios.get(`http://localhost:8080/api/getPosts/${username}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return { error: 'Could not find posts due to error: ' + error };
    }
  }