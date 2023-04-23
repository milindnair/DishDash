import Card from "./Card";
import Contacts from "./Contacts";
import Requests from "./Requests";

const RightDiv = () => {
  return (
    <div className="w-1/4 p-4">
      <div>
        <h2 className="text-white">REQUESTS</h2>
        <div>
          <Requests />
          <Requests />
        </div>
      </div>
      <div className="mt-[50px]">
        <h2 className="text-white">CONTACTS</h2>
        <div className="mt-5">
            <Contacts />
        </div>
        
      </div>
    </div>
  );
};

export default RightDiv;
