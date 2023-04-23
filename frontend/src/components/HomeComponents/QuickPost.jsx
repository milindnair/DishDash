import Avatar from "./Avatar";
import Card from "./Card";
import Cook from "./cooking.png";

const QuickPost = () => {
  return (
    <div className="mt-4">
      <Card height={80} width={720}>
        
        <div className="flex justify-between">
        <Avatar  src={Cook} className={" w-[40px] rounded-full mr-2"}/>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none"
            placeholder="Write something to post"
          />
          <button className="bg-blue-500 text-white mx-2 px-4 py-1 rounded-md ">
            Post
          </button>
        </div>
      </Card>
    </div>
  );
};

export default QuickPost;
