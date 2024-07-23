import NavBar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";

function EditPassword() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [username, setUsername] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        "http://localhost:8081/users/editpassword",
        { username, password, newPassword },
        {
          headers: {
            Authorization: `Bearers ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("new password set");
      setPassword("");
      setNewPassword("");
      setUsername("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container mx-auto mt-8 p-4">
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <form onSubmit={onSubmit} className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Edit Profile</h1>

            {/* Username */}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-bold mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-3 py-2 border rounded shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter new username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Current Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border rounded shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter current password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-gray-700 font-bold mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                id="newpassword"
                className="w-full px-3 py-2 border rounded shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPassword;
