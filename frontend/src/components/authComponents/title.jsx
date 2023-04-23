const Title = (props) => {
  return (
    <>
      <h2 className="font-bold text-4xl text-[#002D74]">{props.title}</h2>
      <p className="text-xl mt-4 text-[#002D74]">
        {props.subtitle1}
        <br />
        {props.subtitle2}
      </p>
    </>
  );
};

export default Title;
