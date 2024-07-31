import { useState } from "react";
import NavBar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const [user, setUser] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [changeUsername, setChangeUsername] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);
  const navigate = useNavigate();

  const editPass = (e) => {
    navigate("/editpassword");
  };

  const handleEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        "http://localhost:8081/users/editemail",
        { email },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Email changed");
    } catch (err) {
      console.log(err);
    }
    setEmail("");
  };
  //Might have to implement refresh token when username is changed
  const handleUsername = (e) => {
    e.preventDefault();
    try {
      const response = axios.patch(
        "http://localhost:8081/users/editusername",
        { username },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Username changed");
    } catch (err) {
      console.log(err);
    }
    setUsername("");
  };

  return (
    <div>
      <NavBar />
      <div className="container mx-auto mt-8 p-4">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <form className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Edit Profile
            </h1>

            <div className="mb-6 flex items-end">
              <div className="flex-grow mr-2">
                <label
                  htmlFor="username"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  New Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full px-4 py-2 border rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter new username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="h-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={handleUsername}
              >
                Save
              </button>
            </div>

            <div className="mb-6 flex items-end">
              <div className="flex-grow mr-2">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  New Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter new email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="h-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={handleEmail}
              >
                Save
              </button>
            </div>

            <button
              type="button"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mt-4"
              onClick={editPass}
            >
              Edit Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default EditProfile;
