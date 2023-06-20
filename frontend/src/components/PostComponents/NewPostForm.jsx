// import {Input} from "../authComponents/Input";
import { useState,useEffect,useRef } from "react";
import Button from "../authComponents/Button";
import Navbar from "../HomeComponents/Navbar";

import Carousel from "./Carousel.jsx";
import {createPost} from "../../helper/posthelper";
import HashLoader from "react-spinners/HashLoader"; 
import { useNavigate } from "react-router-dom";
import Snackbar from "./Snackbar";
import axios from "axios";

const SnackbarType = {
  success: "success",
  fail: "fail",
};
const MAX_COUNT = 5;
const NewPostForm = () => {
  const snackbarRef = useRef(null);
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state variable

  //////////////////////////////////////////////////

  const handleUploadFiles = async (files) => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;
  
    for (const file of files) {
      const existingFileIndex = uploaded.findIndex((f) => f.name === file.name);
      if (existingFileIndex === -1) {
        const objectURL = URL.createObjectURL(file);
        uploaded.push({ name: file.name, url: objectURL, file: file });
        if (uploaded.length === MAX_COUNT) setFileLimit(true);
        if (uploaded.length > MAX_COUNT) {
          alert(`You can only add a maximum of ${MAX_COUNT} files`);
          setFileLimit(false);
          limitExceeded = true;
          break;
        }
      }
    }
  
    if (!limitExceeded) setUploadedFiles(uploaded);
  };
  
  useEffect(() => {
    console.log(uploadedFiles);
  }, [uploadedFiles]);
  
  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const caption = event.target[1].value;
    const user = sessionStorage.getItem('username');
    const comments = [];
    const imageUrls = [];
  
    for (const file of uploadedFiles) {
      const formData = new FormData();
      console.log(file.file);
      formData.append('file', file.file);
      formData.append('upload_preset', 'uk9mlazu');
  
      try {
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dltouwcph/image/upload',
          formData
        );
  
        const imageUrl = response.data.secure_url;
        imageUrls.push(imageUrl);
        console.log('File uploaded successfully:', response.data);
      } catch (error) {
        console.log('Error uploading file:', error);
        return false;
      }
    }
  
    setIsLoading(true);
  
    const post = {
      user: user,
      image_urls: imageUrls,
      caption: caption,
      comments: comments,
    };
  
    console.log(post);
  
    createPost({ post })
      .then((data) => {
        console.log('Post created');
        console.log(data);
  
        snackbarRef.current.show();
        setTimeout(() => {
          setIsLoading(false);
          navigate('/');
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };
  

  return (
    <div>
      <Navbar />
      <section className="bg-[#212121] min-h-screen flex items-center justify-center">
      <div className="bg-[#ff4545] flex rounded-2xl shadow-lg max-w-5xl p-5 items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-row gap-4 h-[600px] w-[2000px]"
        >
          <div className="w-3/5 flex flex-col justify-center items-center">
            <label
              htmlFor="fileUpload"
              className="add-post-button inline-block px-4 py-2 text-white rounded-lg cursor-pointer hover:scale-105 duration-300 bg-[#f09090] w-1/2 text-center "
            >
              Add Post
              <input
                id="fileUpload"
                type="file"
                multiple
                accept="image/jpg, image/png"
                onChange={handleFileEvent}
                disabled={fileLimit}
                className="hidden"
              />
            </label>
            {MAX_COUNT - uploadedFiles.length > 0 ? (
              <p className="mt-4 text-lg">
                You can add more {`${MAX_COUNT - uploadedFiles.length}`} photos
              </p>
            ) : (
              <p className="mt-4 text-lg">You can't add more photos</p>
            )}

            {uploadedFiles.length > 0 ? (
              <Carousel slides={uploadedFiles} />
            ) : (
              <p>Click to add Posts</p>
            )}
          </div>

          <div className="flex flex-col w-2/5 gap-4">
            <div className="flex flex-col gap-4" style={{ flexGrow: 1 }}>
              <textarea
                className="p-2 mt-32 rounded-xl border resize-none"
                style={{ width: '100%', minHeight: '70px' }}
                type="text"
                name="image"
                placeholder="Caption"
              ></textarea>
              <Button title="Cook" type="submit" />
            </div>
          </div>
        </form>
        {/* Display the loading screen if isLoading is true */}
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-center">
                <HashLoader color="#36d7b7" />
              </div>
            </div>
          </div>
        )}
         
      </div>
      </section>
      <Snackbar
        ref={snackbarRef}
        message="Task Completed Successfully!"
        type={SnackbarType.success}
      />
    </div>
  );
};

export default NewPostForm;
