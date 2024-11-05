import { useState } from "react";
import { useAuth } from "../services/api";

const Register = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ ...formData });
    setFormData({
      username: "",
      password: "",
    });
  };

  return (
    <form
      className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-8 space-y-6"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-bold text-center text-gray-800">Register</h1>
      <div className="space-y-2">
        <label htmlFor="username" className="block text-gray-600">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="block text-gray-600">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Register
      </button>
    </form>
  );
};

export default Register;
