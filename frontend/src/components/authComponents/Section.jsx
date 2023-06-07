const Section = ({ children }) => {
  return (
    <section className="bg-[#212121] min-h-screen flex items-center justify-center">
      <div className="bg-[#ff4545] flex rounded-2xl shadow-lg max-w-5xl p-5 items-center">
        {children}
      </div>
    </section>
  );
};

export default Section;
