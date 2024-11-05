import "./App.css";

import Landing from "./pages/Landing";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomeLayout from "./pages/HomeLayout";
import { AuthProvider } from "./context/AuthContext";
import Error from "./pages/Error";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import SingleErrorPage from "./pages/SingleErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Landing />,
        index: true,
        // errorElement: <SingleErrorPage />,
      },
      {
        path: "login",
        element: <Login />,
        // errorElement: <SingleErrorPage />,
      },
      {
        path: "register",
        element: <Register />,
        // errorElement: <SingleErrorPage />,
      },
      {
        path: "create",
        element: <CreatePost />,
        // errorElement: <SingleErrorPage />,
      },
      {
        path: "post/:id",
        element: <PostPage />,
        // errorElement: <SingleErrorPage />,
      },
      {
        path: "edit/:id",
        element: <EditPost />,
        // errorElement: <SingleErrorPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
