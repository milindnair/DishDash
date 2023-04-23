import "../index.css";
import Navbar from "./HomeComponents/Navbar";

const Home = () => {
  return (
    <>
       <Navbar />
       
      <div className="flex h-screen justify-between w-full bg-[#212121]">
        <div className="w-1/4 p-4  h-full text-[#fff]">
          <ul>
            <li>Home</li>
            <li>Photos</li>
            <li>Reels</li>
          </ul>
        </div>
        <div className="w-1/2 p-4">
          <h1>Main content goes here</h1>
        </div>
        <div className="w-1/4 p-4">
          <ul>
            <li>Friend Requests</li>
            <li>List</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
