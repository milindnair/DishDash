const ProfileStats = (props) => {
  return (
    <div className="flex justify-center mt-4 w-full">
    <div className="w-64 flex justify-between">
      <div className="mr-20">
        <p className="font-bold">{props.posts}</p>
        <p className="text-xs text-gray-500">Posts</p>
      </div>
      <div className="mr-20">
        <p className="font-bold">{props.followers}</p>
        <p className="text-xs text-gray-500">Followers</p>
      </div>
      <div className="mr-20">
        <p className="font-bold">{props.following}</p>
        <p className="text-xs text-gray-500">Following</p>
      </div>
    </div>
  </div>
  );
};

export default ProfileStats;
