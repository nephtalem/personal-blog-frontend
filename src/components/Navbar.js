import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { api } from "../services/api";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, setUser, logout } = useContext(AuthContext);

  useEffect(() => {
    api
      .get("/profile", {
        withCredentials: true,
      })
      .then((response) => {
        setUser({ ...response.data });
      })
      .catch((error) => {
        // toast.error("Please login");
        console.error(error);
      });
  }, []);

  return (
    <header className="bg-white shadow-md py-4 px-6 md:px-12">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-semibold text-gray-800 hover:text-gray-600"
        >
          Personal <span className="text-blue-500">Blog</span>
        </Link>
        <nav>
          <ul className="flex items-center space-x-6 text-gray-600">
            {user ? (
              <>
                <li>
                  <Link
                    to="/create"
                    className="hover:text-blue-500 transition-colors duration-300"
                  >
                    Create New Post
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="hover:text-blue-500 transition-colors duration-300"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="hover:text-blue-500 transition-colors duration-300"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="hover:text-blue-500 transition-colors duration-300"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
