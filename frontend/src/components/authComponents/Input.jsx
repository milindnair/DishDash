const Input = (props) => {
  return (
    <>
        <input
          className={`p-2 mt-8 rounded-xl border h-${props.size}`}
          type={props.type}
          name={props.name}
          placeholder={props.placeholder}
          onChange={props.onChange}
          
        />
    
    </>
  );
};

export default Input;
