import Logo from "./dishdash-logo.png";
import Cook from "./cooking.png";

const Navbar = () => {
    return (
        <div className="bg-[#212121] relative">
  <img src={Logo} alt="logo" className="h-[95px] w-[120px] pl-4 pt-2" />

  <form className="absolute top-1/2 transform -translate-y-1/2 right-28">
    {/* search input field */}
    <label
      htmlFor="default-search"
      className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
    >
      Search
    </label>
    <div className="relative ">
      <input
        type="search"
        id="default-search"
        className="block absolute right-[300px] top-1/2 transform -translate-y-1/2 w-[350px] p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search Mockups, Logos..."
        required
      />
      <button
        type="submit"
        className="text-white absolute right-[200px] h-[41px] w-[80px] top-1/2 transform -translate-y-1/2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Search
      </button>
    </div>
  </form>

  {/* create post button */}
  <div>
    
  <button className="bg-[#ff4545] absolute top-1/2 w-[180px] transform -translate-y-1/2 right-[90px] text-[#fff] rounded-xl p-2 flex gap-4 ">
  <img src={Cook} alt="cooking" className="h-[25px] w-[40px] pl-4  " />
    Create Post
  </button>
  </div>

  {/* user avatar */}
  <img
    className="w-10 absolute top-1/2 transform -translate-y-1/2 right-4 rounded-full"
    src={Cook}
   alt="Rounded avatar"
  />
</div>

 
    )
};

export default Navbar;