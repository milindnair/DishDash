const Input = (props) => {
  return (
    <>
      <form action="" className="flex flex-col gap-4">
        <input
          className="p-2 mt-8 rounded-xl border"
          type={props.type}
          name={props.name}
          placeholder={props.placeholder}
        />
      </form>
    </>
  );
};

export default Input;
