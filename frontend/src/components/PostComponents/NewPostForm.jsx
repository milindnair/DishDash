// import {Input} from "../authComponents/Input";
import { useState } from "react";
import Input from "../authComponents/Input";
import Button from "../authComponents/Button";
import Navbar from "../HomeComponents/Navbar";
import Section from "../authComponents/Section";
import Carousel from "./Carousel.jsx";

const MAX_COUNT = 5;

const NewPostForm = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);

  //////////////////////////////////////////////////

  const handleUploadFiles = (files) => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        const objectURL = URL.createObjectURL(file);
        uploaded.push({ name: file.name, url: objectURL });
        if (uploaded.length === MAX_COUNT) setFileLimit(true);
        if (uploaded.length > MAX_COUNT) {
          alert(`You can only add a maximum of ${MAX_COUNT} files`);
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }
    });
    if (!limitExceeded) setUploadedFiles(uploaded);
  };
  

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
    console.log(uploadedFiles);
  };

  //   const handleImageUpload = (event) => {
  //     const files = event.target.files;
  //     const newImageSrcs = [];

  //     for (let i = 0; i < files.length; i++) {
  //       const file = files[i];
  //       const reader = new FileReader();

  //       reader.onload = () => {
  //         newImageSrcs.push(reader.result);

  //         if (newImageSrcs.length === files.length) {
  //           setImageSrc(newImageSrcs);
  //         }
  //       };

  //       reader.readAsDataURL(file);
  //     }
  //   };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(uploadedFiles.length);
  };

  return (
    <div>
      <Navbar />
      <Section>
        <form
          onSubmit={handleSubmit}
          className="flex flex-row gap-4 h-[600px] w-[2000px]"
        >
          <div className="w-3/5">
            <input
              id="fileUpload"
              type="file"
              multiple
              accept="image/jpg, image/png"
              onChange={handleFileEvent}
              disabled={fileLimit}
            />

            {uploadedFiles.length>0 ? (
              <Carousel slides={uploadedFiles} />
            ) : (
              <p>No carousel available</p>
            )}
          </div>

          {/* <input type="file" name="image" placeholder="image" onChange={handleImageUpload}/> */}
          <div className="w-2/5 flex flex-col gap-4" style={{ flexGrow: 1 }}>
            <textarea
              className="p-2 mt-4 rounded-xl border resize-none"
              style={{ width: "100%", minHeight: "70px" }}
              type="text"
              name="image"
              placeholder="Caption"
            ></textarea>
            <Button title="Cook" type="submit" />
          </div>
        </form>
      </Section>
    </div>
  );
};

export default NewPostForm;
