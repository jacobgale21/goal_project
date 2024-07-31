import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8081/users/login", {
        username,
        password,
      });

      const token = response.data.token;
      setUsername("");
      setPassword("");
      navigate("/home");
      localStorage.setItem("token", token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App flex items-center justify-center min-h-screen bg-white-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white-800 text-white border border-black p-8 md:p-10 w-80 md:w-96 rounded-lg shadow-lg"
      >
        <h3 className="text-3xl text-black font-bold text-center mb-6">
          Login
        </h3>

        <div className="mb-4">
          <label className="block mb-2 text-lg text-black" htmlFor="username">
            Username
          </label>
          <input
            className="w-full h-10 px-3 py-2 border border-black rounded-md bg-white-700 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="username"
            type="text"
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-lg text-black" htmlFor="password">
            Password
          </label>
          <input
            className="w-full h-10 px-3 py-2 border border-black rounded-md bg-white-700 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-md transition duration-300"
            type="button"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded-md transition duration-300"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
export default Login;
