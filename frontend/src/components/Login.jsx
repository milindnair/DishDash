import image from "../login_image1.jpg";
import { Link } from "react-router-dom";
import Section from "./authComponents/Section";
import Image from "./authComponents/Image";
import SideDiv from "./authComponents/SideDiv";
import Title from "./authComponents/title";

const Login = () => {
  return (
    <>
      <Section>
        <SideDiv />
        <Image image={image} />
      </Section>
    </>
  );
};

export default Login;
