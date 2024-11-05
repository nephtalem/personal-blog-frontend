import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Blog from "../Blog/Blog";
import { useAuth } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const BlogList = () => {
  const { getAllPost } = useAuth();
  const { setPosts, posts, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <div className="grid gap-6 grid-cols-1 p-4 place-items-center">
      {posts?.length > 0 ? (
        posts.map((post) => <Blog key={post._id} {...post} user={user} />)
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">
            No blog posts available
          </h2>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate("/create")}
          >
            Create a Post
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogList;
