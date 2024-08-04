import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Explore from "./explore";

function Profile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const signOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const editClick = () => {
    navigate("/editprofile");
  };

  useEffect(() => {
    const userData = async () => {
      const response = await axios.get("http://localhost:8081/users/get", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsername(response.data.username);
      setEmail(response.data.email);
    };
    userData();
  }, [setUsername, setEmail]);

  return (
    <div>
      <NavBar />
      <div className="container mx-auto mt-8 p-4">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2">Username: {username}</h1>
            <p className="text-gray-700 mb-4">Email: {email}</p>
            <div className="flex space-x-4">
              <button
                onClick={editClick}
                className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Edit Profile
              </button>
              <button
                onClick={() => navigate("/following")}
                className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Following
              </button>
              <button
                onClick={() => navigate("/followers")}
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                Followers
              </button>
              <button
                onClick={signOut}
                className="bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
