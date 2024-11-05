import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const baseURL = "https://personal-blog-backend-1.onrender.com";

export const api = axios.create({
  baseURL: baseURL,
});

export const useAuth = () => {
  const navigate = useNavigate();
  const { setUser, setPosts, setSinglePost } = useContext(AuthContext);

  const register = async (data) => {
    try {
      const resp = await api.post("/register", data);
      console.log(resp);
      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      console.error(error.response.data);
      toast.error(
        error.response.data.error || "Registration failed. Please try again."
      );
    }
  };

  const login = async (data) => {
    try {
      const resp = await api.post("/login", data, { withCredentials: true });
      setUser(resp.data.user);
      toast.success("Login successful");
      navigate("/"); // Redirect to the home page on success
    } catch (error) {
      console.error(error.response.data);
      toast.error(
        error.response.data.error || "Login failed. Please try again."
      );
    }
  };

  const createPost = async (data) => {
    try {
      const resp = await api.post("/post", data, { withCredentials: true });
      console.log(resp);
      toast.success("Post created successfully");
      navigate("/");
    } catch (error) {
      console.error(error.response.data);
      toast.error(
        error?.response?.data || "Failed to create post. Please try again."
      );
    }
  };

  const getAllPost = async () => {
    try {
      const resp = await api.get("/post");
      setPosts(resp.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load posts. Please try again later.");
    }
  };

  const getSinglePost = async (id) => {
    try {
      const resp = await api.get(`/post/${id}`);
      console.log(resp);
      setSinglePost(resp.data);
    } catch (error) {
      console.error(error);
      toast.error(
        "Failed to load post. Please check the post ID and try again."
      );
    }
  };

  const updatePost = async (data, id) => {
    try {
      const resp = await api.put(`/post/${id}`, data, {
        withCredentials: true,
      });
      toast.success("Post updated successfully");
      navigate(`/post/${id}`);
    } catch (error) {
      console.error(error.response.data);
      toast.error(
        error.response.data.error || "Failed to update post. Please try again."
      );
    }
  };

  return { register, login, createPost, getAllPost, getSinglePost, updatePost };
};
