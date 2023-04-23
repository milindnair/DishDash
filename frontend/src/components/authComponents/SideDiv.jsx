import { Link } from "react-router-dom";
import Title from "./title";
import Input from "./Input";
import Button from "./Button";

const SideDiv = () => {
  return (
    <div className="md:w-1/2 px-8 md:px-16">
      <Title
        title={"Dish Up"}
        subtitle1={"Welcome Back!"}
        subtitle2={"Please Login to Continue"}
      />

      <form action="" className="flex flex-col gap-4">
        <Input type="email" name="email" placeholder="Email" />
        <Input type="password" name="password" placeholder="Password" />
        <Button title={"Login"} />
      </form>
      <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
        <a href="#">Forgot your password?</a>
      </div>

      <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
        <p>Don't have an account?</p>
        <Link to="/register">
          <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SideDiv;
