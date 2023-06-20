import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Section from "./authComponents/Section";
import Image from "./authComponents/Image";
import SideDiv from "./authComponents/SideDiv";
import Title from "./authComponents/title";
import Input from "./authComponents/Input";
import Button from "./authComponents/Button";
import { registerUser } from "../helper/helper";
import image from "../login_image1.jpg";

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const email = event.target.email.value;
    const user = { username, password, email };

    try {
      await registerUser(user);
      navigate("/login"); // Navigate to /login on successful registration
    } catch (error) {
      console.log(error);
      alert("Registration failed. Please try again.");
      window.location.reload();
    }
  };

  return (
    <>
      <Section>
        <div className="md:w-1/2 px-8 md:px-16">
          <Title
            title={"Savor"}
            subtitle1={"Sign In!"}
            subtitle2={"Join the feast!"}
          />
          <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input type="username" name="username" placeholder="username" />
            <Input type="password" name="password" placeholder="Password" />
            <Input type="email" name="email" placeholder="Email" />

            <Button title={"Register"} type="submit" />
          </form>
          <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
            <p>Already have an account?</p>
            <Link to="/login">
              <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                Login
              </button>
            </Link>
          </div>
        </div>

        <Image image={image} />
      </Section>
    </>
  );
};

export default Register;
