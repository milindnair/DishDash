const Button = (props) => {
  return (
    <button
      className={`bg-[${props.color}] rounded-xl py-2 hover:scale-105 duration-300 text-[#002D74]`}
      type={props.type || 'button'}
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
};

export default Button;
