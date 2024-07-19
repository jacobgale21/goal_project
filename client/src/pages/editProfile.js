import { useState } from "react";
import NavBar from "../components/Navbar";
import axios from "axios";

function EditProfile() {
  const [user, setUser] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [changeUsername, setChangeUsername] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);

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
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <form className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Edit Profile</h1>

            <div className="flex mb-4">
              <div className="w-full mr-2">
                <label
                  htmlFor="username"
                  className="block text-gray-700 font-bold mb-2"
                >
                  New Username
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
              <button
                type="submit"
                className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold  rounded focus:outline-none focus:shadow-outline"
                onClick={handleUsername}
              >
                Save
              </button>
            </div>
            <div className="flex mb-4">
              <div className="w-full mr-2">
                <label
                  htmlFor="username"
                  className="block text-gray-700 font-bold mb-2"
                >
                  New Email
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full px-3 py-2 border rounded shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter new username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleEmail}
              >
                Save
              </button>
            </div>

            {/* Password */}
            {/* <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter new password"
              value={newPassword}
              onChange={handlePasswordChange}
            />
          </div> */}

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default EditProfile;
