const Search = (props) => {
    return (
      <div className="relative">
        <input
          type="search"
          id="default-search"
          className="block absolute right-[300px] top-1/2 transform -translate-y-1/2 w-[350px] p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Mockups, Logos..."
          value={props.searchText} // Use the prop value for the input value
          onChange={(e) => props.setSearchText(e.target.value)} // Call the prop function to update the state
          required
        />
        <button
          type="submit"
          className="text-white absolute right-[200px] h-[41px] w-[80px] top-1/2 transform -translate-y-1/2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={(e) => props.onClick(e)}
        >
          Search
        </button>
      </div>
    );
  };

  export default Search;