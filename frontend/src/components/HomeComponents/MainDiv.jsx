import QuickPost from "./QuickPost";
import Stories from "./Stories";
import Post from "./Post";

const MainDiv = () => {
    return(
        <div className="w-1/2 p-4 h-full bg-[#212121] ">
            <Stories />
            <QuickPost />
            <Post />
        </div>
    )
};

export default MainDiv;