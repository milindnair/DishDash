import Card from "./Card";
import Avatar from "./Avatar";
import Cook from "./cooking.png";
import Button from "../authComponents/Button";
import { Fragment , React } from "react";


const Requests = () => {
    return(
        <Fragment>
        <div className="flex flex-col gap-3 mt-3">
            <Card height={130} width={300} >
                <div className="flex justify-between">
                    <Avatar src={Cook} className="w-10 rounded-full" alt="user" />
                    <p className="ml-3"><b>XYZ</b> wants to add you to friends afhjasf</p>
                </div>
                <div className="flex justify-between mt-4">                
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                        Accept
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
                        Reject
                    </button>
                </div>


            </Card>
        </div>
        </Fragment>
    )
};

export default Requests;