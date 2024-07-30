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
    <div>
      <NavBar />
      {/* Map users and create a link with each 
    user linking to a direct message chat */}
      <div className="flex flex-col">
        {users?.map((user) => (
          <div key={user._id} className="flex flex-col py-1">
            <Link to={`/conversation/${user._id}`}>
              <p className="text-lg">{user.username}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Home;
