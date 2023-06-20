const Card = (props) => {
  return (
    <div
      className={
        props.wantEffect
          ? "bg-white rounded-lg drop-shadow-md p-4 mt-5 hover:transform hover:-translate-y-1 hover:shadow-lg transition duration-200"
          : "bg-white rounded-lg drop-shadow-md p-4 mt-5"
      }
      style={{ height: `${props.height}px`, width: `${props.width}px` }}
    >
      {props.children}
    </div>
  );
};

export default Card;
