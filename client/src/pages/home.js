import NavBar from "../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8081/users/getall", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        await setUsers(response.data);
      } catch (err) {
        console.log("Error on getting goals", err);
      }
    };
    getUsers();
  });

  return (
    // <div>
    //   <NavBar />
    //   {/* Map users and create a link with each
    // user linking to a direct message chat */}
    //   <div className="flex flex-col">
    //     {users?.map((user) => (
    //       <div key={user._id} className="flex flex-col py-1">
    //         <Link to={`/conversation/${user._id}`}>
    //           <p className="text-lg">{user.username}</p>
    //         </Link>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div>
      <NavBar />
      <div className="container mx-auto mt-8 p-4">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Users
          </h1>
          <div className="space-y-4">
            {users?.map((user) => (
              <div
                key={user._id}
                className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <Link
                  to={`/conversation/${user._id}`}
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
export default Home;
