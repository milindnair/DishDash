const Input = (props) => {
  return (
    <>
        <input
          className="p-2 mt-8 rounded-xl border"
          type={props.type}
          name={props.name}
          placeholder={props.placeholder}
        />
    
    </>
  );
};

export default Input;
