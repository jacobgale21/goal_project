import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

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
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200"
              >
                Edit Profile
              </button>
              <button
                onClick={signOut}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors duration-200"
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
