import React, { createContext, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";

export const AuthContext = createContext();

// AuthContext.js
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [singlePost, setSinglePost] = useState(null);
  //   const login = (userData) => {
  //     setUser(userData); // Set user data when logged in
  //   };

  const logout = async () => {
    try {
      const resp = await api.post("/logout", {}, { withCredentials: true });
      setUser(null); // Clear user state
      toast.success(resp.data.message); // Log the response from the server
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        setUser,
        posts,
        setPosts,
        singlePost,
        setSinglePost,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
