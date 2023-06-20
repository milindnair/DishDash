import Card from "./Card";
import Contacts from "./Contacts";
import Requests from "./Requests";
import { faArrowRight} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RightDiv = () => {
  const totalRequests = 10;
  return (
    <div className="w-1/4 p-4 sticky top-0">
      <div>
      <div className="flex items-center justify-between mt-4">
      <h2 className="text-white">REQUESTS</h2>
        <div className="flex items-center">
          <p className="mr-2 text-white cursor-pointer transition duration-300 hover:scale-105">+{totalRequests}</p>
          <FontAwesomeIcon icon={faArrowRight} size="lg" className="text-gray-500" />
        </div>
      </div>
        <div>
          <Requests />
          <Requests />
        </div>
      </div>
      <div className="mt-[50px]">
      <div className="flex items-center justify-between mt-4">
      <h2 className="text-white">CONTACTS</h2>
        <div className="flex items-center">
        <p className="mr-2 text-white cursor-pointer transition duration-300 hover:scale-105">FIND MORE FOODIES</p>
          <FontAwesomeIcon icon={faArrowRight} size="lg" className="text-gray-500" />
        </div>
      </div>
        <div className="mt-5">
            <Contacts />
            <Contacts />
        </div>
        
      </div>
    </div>
  );
};

export default RightDiv;
