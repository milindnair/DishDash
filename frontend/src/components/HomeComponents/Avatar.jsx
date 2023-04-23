const Avatar = (props) => {
    return(
        <img
        className={props.className}
        src={props.src}
        alt="Rounded avatar"
      />
    )
};

export default Avatar;