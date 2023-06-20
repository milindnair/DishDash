import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../HomeComponents/Navbar";
import Section from "../authComponents/Section";
import Input from "../authComponents/Input";
import Button from "../authComponents/Button";
import { updateProfile } from "../../helper/updatehelper";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const storedData = sessionStorage;
    const newData = Object.keys(storedData).map((key) => ({
      [key]: storedData.getItem(key),
    }));
    const updatedUserData = Object.assign({}, ...newData);
    console.log(updatedUserData);
    setUserData(updatedUserData);
  }, []);

  const editProfileHandler = async (e) => {
    e.preventDefault();
  
    // Save the data to sessionStorage
    const updatedUserData = {
      ...userData,
      username: e.target.username.value,
      email: e.target.email.value,
      Bio: e.target.Bio.value,
      visibility: e.target.Toggle3.checked ? "Private" : "Public",
    };
    console.log(updatedUserData);
  
    try {
      const token = sessionStorage.getItem("token");
      let imageUrl = null;
  
      if (selectedFile) {
        // Upload the profile picture to Cloudinary
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", "uk9mlazu");
  
        const cloudinaryResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dltouwcph/image/upload",
          formData
        );
  
        imageUrl = cloudinaryResponse.data.secure_url;
      }
  
      // Add the image URL to updatedUserData
      if (imageUrl) {
        updatedUserData.profilePic = imageUrl;
      }
  
      const response = await updateProfile(
        updatedUserData.username,
        token,
        updatedUserData
      );
  
      if (response.status === 201) {
        Object.keys(updatedUserData).forEach((key) => {
          if (sessionStorage.getItem(key)) {
            sessionStorage.setItem(key, updatedUserData[key]);
          }
        });
      }
      console.log(response);
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };
  

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  

  return (
    <div className="container mx-auto h-screen bg-[#212121]">
      <Navbar />
      <Section>
        <form
          className="flex flex-col gap-4 h-[600px] w-[500px]"
          onSubmit={editProfileHandler}
        >
          <div className="relative flex justify-center ">
            <div className="w-32 h-32 rounded-full bg-gray-300 ">
              {selectedFile && (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected"
                  className="w-full h-full object-cover rounded-full"
                />
              )}
            </div>
            <label
              htmlFor="fileInput"
              className="bg-[#212121] hover:bg-gray-700 text-white rounded-full p-2 absolute bottom-[20px] right-[190px] transform translate-x-1/2 translate-y-1/2 cursor-pointer"
            >
              <FontAwesomeIcon icon={faCamera} size="lg" />
            </label>
            <input
              id="fileInput"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileSelect}
            />
          </div>
          <Input
            label="Username"
            type="text"
            name="username"
            placeholder="Username"
            size="10"
          />
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Email"
            size="10"
          />
          <div className="flex items-center">
            <label htmlFor="visibilityToggle" className="text-white">
              Visibility:
            </label>
            <div className="flex items-center space-x-2">
              <label
                htmlFor="Toggle3"
                className="inline-flex items-center p-2 rounded-md cursor-pointer dark:text-gray-800"
              >
                <input id="Toggle3" type="checkbox" className="hidden peer" />
                <span className="px-4 py-2 rounded-l-md dark:bg-violet-400 peer-checked:dark:bg-gray-300">
                  Public
                </span>
                <span className="px-4 py-2 rounded-r-md dark:bg-gray-300 peer-checked:dark:bg-violet-400">
                  Private
                </span>
              </label>
            </div>
          </div>
          <Input
            label="Bio"
            type="text"
            name="Bio"
            placeholder="Bio"
            size="10"
          />
          <Button type="submit" text="Save" title="Save Changes" />
        </form>
      </Section>
    </div>
  );
};

export default EditProfile;
