const Image = (props) => {
    return (
        <div className="md:block hidden w-1/2 ">
            <img className=" rounded-2xl h-[600px]" src={props.image} />
          </div>
    )
};

export default Image;