import NavBar from "../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Explore() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getNonFollowers = async () => {
      const response = await axios.get(
        "http://localhost:8081/users/get/nonfollowers",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      await setUsers(response.data);
    };
    getNonFollowers();
  }, [setUsers]);

  const follow = async (id) => {
    try {
      const hello = await axios.patch(
        `http://localhost:8081/users/editfollowing/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(hello.data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container mx-auto mt-8 p-4">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Users
          </h1>
          <div className="space-y-4">
            {users?.map((user) => (
              <div key={user._id}>
                <div className="flex justify-between items-center">
                  <div className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200">
                    {user.username}
                  </div>
                  <div>
                    <button
                      onClick={() => follow(user._id)}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                      Follow
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Explore;
