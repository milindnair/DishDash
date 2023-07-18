const Input = (props) => {
  return (
    <>
      <label className="text-white text-xl">{props.label}</label>
      <input
        className={`p-2 rounded-xl border h-${props.size}`}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        required={props.required} // Added the required prop here
      />
      {props.required && (
        <span className="text-red-500 text-xs">Required</span>
      )}
    </>
  );
};

export default Input;
