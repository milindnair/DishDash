import "../index.css";
import Navbar from "./HomeComponents/Navbar";
import SideDiv from "./HomeComponents/SideDiv";
import MainDiv from "./HomeComponents/MainDiv";
import RightDiv from "./HomeComponents/RightDiv";

const Home = () => {
  return (
    <>
       <Navbar />
       
      <div className="flex h-full justify-between w-full bg-[#212121]">
        <SideDiv />
        <MainDiv />
        <RightDiv />
        
        
      </div>
    </>
  );
};

export default Home;
