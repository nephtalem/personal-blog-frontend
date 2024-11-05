import img from "../../assets/hospital.png";
import { Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";

const Blog = ({
  content,
  cover,
  title,
  summary,
  createdAt,
  _id,
  user,
  author,
}) => {
  console.log(cover)
  return (
    <Link
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 max-w-lg sm:w-1/2"
      to={`/post/${_id}`}
    >
      <div className="h-56 w-full overflow-hidden">
        <img
          src={cover} // cover now contains the Cloudinary URL
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h1 className="text-xl font-semibold text-gray-800 mb-2">{title}</h1>
        <div className="text-gray-600 text-sm mb-4">
          <p>
            <span className="font-medium">{author.username}</span>{" "}
            <span>{formatISO9075(new Date(createdAt))}</span>
          </p>
        </div>
        <p className="text-gray-700 text-base">{summary}</p>
      </div>
    </Link>
  );
};

export default Blog;
