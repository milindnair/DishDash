const About = () => {
    return(
        <div className="flex flex-col items-center ml-20 mt-10">
          <p className="text-gray-700 text-lg font-bold mb-4">Bio</p>
          <p className="text-gray-600 text-sm mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            quis justo nisi. In eu lorem eget tellus placerat condimentum vitae
            quis odio. Nunc id neque sit amet sapien ullamcorper efficitur non
            nec elit.
          </p>
          <p className="text-gray-700 text-lg font-bold mb-4">Interests</p>
          <div className="flex flex-wrap justify-center">
            <div className="bg-gray-200 rounded-lg px-4 py-2 m-2">
              Traveling
            </div>
            <div className="bg-gray-200 rounded-lg px-4 py-2 m-2">Reading</div>
            <div className="bg-gray-200 rounded-lg px-4 py-2 m-2">
              Watching movies
            </div>
          </div>
        </div>
    )
};

export default About;