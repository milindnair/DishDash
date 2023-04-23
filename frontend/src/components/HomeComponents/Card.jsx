const Card = (props) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-4"
      style={{ height: `${props.height}px`, width: `${props.width}px` }}
    >
      {props.children}
    </div>
  );
};

export default Card;
