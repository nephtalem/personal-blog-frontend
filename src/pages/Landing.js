import BlogList from "../components/BlogList/BlogList";

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="container mx-auto p-4 md:p-8">
        <BlogList />
      </section>
    </div>
  );
};

export default Landing;
