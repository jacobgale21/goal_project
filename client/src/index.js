import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Register from "./pages/register";
import Login from "./pages/login";
import Create from "./pages/create";
import Profile from "./pages/profile";
import Goals from "./pages/goalspage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EditProfile from "./pages/editProfile";
import EditPassword from "./pages/editpassword";
import Timeline from "./pages/timeline";
import EditGoal from "./pages/editGoal";
import Conversation from "./pages/conversation";
import Progress from "./pages/progress";
import Messaging from "./pages/messaging";
import Home from "./pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/chat",
    element: <Messaging />,
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
  {
    path: "/editprofile",
    element: <EditProfile />,
  },
  {
    path: "/editpassword",
    element: <EditPassword />,
  },
  {
    path: "/timeline/:id",
    element: <Timeline />,
  },
  {
    path: "/editgoal/:id",
    element: <EditGoal />,
  },
  {
    path: "/conversation/:id",
    element: <Conversation />,
  },
  {
    path: "/progress/:id",
    element: <Progress />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
