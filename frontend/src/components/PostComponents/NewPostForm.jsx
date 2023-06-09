// import {Input} from "../authComponents/Input";
import { useState,useEffect } from "react";
import Input from "../authComponents/Input";
import Button from "../authComponents/Button";
import Navbar from "../HomeComponents/Navbar";
import Section from "../authComponents/Section";
import Carousel from "./Carousel.jsx";
import {createPost} from "../../helper/posthelper";
import HashLoader from "react-spinners/HashLoader"; 
import { useNavigate } from "react-router-dom";


const MAX_COUNT = 5;
const NewPostForm = () => {
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
        const base64Data = await readAsDataURL(file);
        uploaded.push({ name: file.name, url: objectURL, base64: base64Data });
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

  const readAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    console.log(uploadedFiles);
  }, [uploadedFiles]);

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const caption = event.target[1].value;
    const user = localStorage.getItem('username');
    const comments = [];
    const imageurl = uploadedFiles.map((file) => file.base64);
    const post = { user: user, image_urls: imageurl, caption, comments };

    setIsLoading(true); // Set isLoading to true when submitting the form

    createPost({ post })
      .then((data) => {
        console.log('post created');
        console.log(data);
        setIsLoading(false); // Set isLoading to false when the request is complete
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false); // Set isLoading to false in case of an error
      });
  };

  return (
    <div>
      <Navbar />
      <Section>
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
         
      </Section>
    </div>
  );
};

export default NewPostForm;
