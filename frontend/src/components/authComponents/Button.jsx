const Button = (props) => {
  return (
    <button className="bg-[#f09090] rounded-xl py-2 hover:scale-105 duration-300 text-[#002D74]">
      {props.title}
    </button>
  );
};

export default Button;
