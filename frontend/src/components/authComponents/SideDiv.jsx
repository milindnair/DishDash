import { Link } from "react-router-dom";
import Title from "./title";
import Input from "./Input";
import Button from "./Button";
import { verifyPassword } from "../../helper/helper";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../helper/helper";

const SideDiv = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginHandler = async (event) => {
    event.preventDefault();
    console.log("Login");
    const username = event.target.username.value;
    const password = event.target.password.value;
  
    try {
      const res = await verifyPassword({ username, password });
      const { token } = res.data;
      localStorage.setItem('token', token);
      const user = await getUser({ username: username });
      dispatch({ type: 'LOGIN', username: username , email: user.email,followers:user.followers,following:user.following,posts:user.posts });
      navigate('/');
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');

    if (token && storedUsername) {
      dispatch({ type: 'LOGIN', username: storedUsername });
    }
  }, [dispatch]);
  
  
  

  return (
    <div className="md:w-1/2 px-8 md:px-16">
      <Title
        title={"Dish Up"}
        subtitle1={"Welcome Back!"}
        subtitle2={"Please Login to Continue"}
      />

      <form
        action=""
        className="flex flex-col gap-4"
        onSubmit={loginHandler}
      >
        <Input type="username" name="username" placeholder="username" />
        <Input type="password" name="password" placeholder="Password" />
        <Button title={"Login"} type="submit" />
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
