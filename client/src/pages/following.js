import NavBar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Following() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getFollowing = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/users/get/following",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        await setUsers(response.data);
      } catch (err) {
        console.log("Error in getting following list", err);
      }
    };
    getFollowing();
  }, [setUsers]);

  return (
    <div>
      <NavBar />
      <div className="container mx-auto mt-8 p-4">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Following
          </h1>
          <div className="space-y-4">
            {users?.map((user) => (
              <div
                key={user._id}
                className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <Link
                  to={`/goals/${user._id}`}
                  className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  {user.username}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Following;
