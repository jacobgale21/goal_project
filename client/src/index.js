import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Register from "./pages/register";
import Home from "./pages/home";
import Login from "./pages/login";
import Create from "./pages/create";
import Profile from "./pages/profile";
import Goals from "./pages/goalspage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create",
    element: <Create />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/goals",
    element: <Goals />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
