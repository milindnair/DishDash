import axios from "axios";

export const updateProfile = async (username, token, user) => {
    console.log("updateHelper", username, token, user);
    try {
        const response = await axios.put(
        `http://localhost:8080/api/updateuser`,
        user,
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );
        console.log("updateHelper", response);
        return response;
    } catch (error) {
        console.log("updateHelper", error);
        return error;
    }
};