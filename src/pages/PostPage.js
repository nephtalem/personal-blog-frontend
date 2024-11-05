import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useAuth } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

const PostPage = () => {
  const { id } = useParams();
  const { getSinglePost } = useAuth();
  const { singlePost, user } = useContext(AuthContext);

  useEffect(() => {
    getSinglePost(id);
  }, [id, getSinglePost]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      {singlePost && (
        <div className="space-y-4">
          <div className="img-container">
            <img
              src={singlePost.cover}
              className="w-full h-64 object-cover"
              alt={singlePost.title}
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            {singlePost.title}
          </h1>
          <div className="text-gray-600">
            <p>
              <span className="font-semibold">
                {singlePost.author.username}
              </span>{" "}
              <span>{formatISO9075(new Date(singlePost.createdAt))}</span>
            </p>
          </div>
          <p className="text-gray-700">{singlePost.summary}</p>
          {user?.id === singlePost.author._id && (
            <Link
              to={`/edit/${id}`}
              className="inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200"
            >
              Edit this post
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default PostPage;
