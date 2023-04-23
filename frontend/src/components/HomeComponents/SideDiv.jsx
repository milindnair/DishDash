
import Card from "./Card";

const SideDiv = () => {
    return (
        <div className="w-1/4 p-4  h-full text-[#fff]">
            <Card height={60} width={250} />
            <div className="mt-5">
            <Card height={400} width={250} />
            </div>
        </div>
    )
};

export default SideDiv;