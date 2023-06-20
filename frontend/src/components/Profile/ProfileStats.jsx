const ProfileStats = (props) => {
  // console.log(props.posts);
  return (
    <div className="flex justify-center mt-4 w-full items-center ml-[-5rem] ">
    <div className="w-64 flex justify-between">
      <div className="mr-20">
        <p className="font-bold text-[#edcbb4] text-center">{props.posts}</p>
        <p className="text-lg text-[#bd9086]">Posts</p>
      </div>
      <div className="mr-20">
        <p className="font-bold text-[#edcbb4] text-center">{props.followers}</p>
        <p className="text-lg text-[#bd9086]">Followers</p>
      </div>
      <div className="mr-20">
        <p className="font-bold text-[#edcbb4] text-center">{props.following}</p>
        <p className="text-lg text-[#bd9086]">Following</p>
      </div>
    </div>
  </div>
  );
};

export default ProfileStats;
