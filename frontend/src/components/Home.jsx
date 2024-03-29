import "../index.css";
import Navbar from "./HomeComponents/Navbar";
import SideDiv from "./HomeComponents/SideDiv";
import MainDiv from "./HomeComponents/MainDiv";
import RightDiv from "./HomeComponents/RightDiv";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUser } from "../helper/helper";


const Home = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  console.log(isLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/Login');
    }
  }, [isLoggedIn, navigate]);

  if(!isLoggedIn){
    return null;
  }




   return (
    <>
    <div className="h-full bg-[#212121]">
       <Navbar />       
      <div className="flex h-full   justify-between w-full bg-[#212121]">
        <SideDiv />
        <MainDiv />
        <RightDiv />
        
        
      </div>
      </div>
    </>
  );
};

export default Home;
