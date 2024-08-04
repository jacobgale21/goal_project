import NavBar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const [goals, setGoals] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/goals/getposts`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setGoals(response.data);
      } catch (err) {
        console.log("Errol in getting posts", err);
      }
    };
    getPosts();
  }, [setGoals]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <NavBar />
      <div className="max-w-3xl mx-auto py-8">
        <div className="flex justify-center items-center relative mb-11 mt-4">
          <h1 className="text-4xl font-bold text-black absolute left-1/2 transform -translate-x-1/2">
            Goals
          </h1>
          <button
            onClick={() => navigate("/explore")}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors absolute right-0"
          >
            Explore
          </button>
        </div>
        {goals?.map((goal) => (
          <div
            key={goal._id}
            className="p-6 bg-white rounded-lg shadow-md mb-6"
          >
            <div className="flex items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {goal.username}
                </h2>
                <p className="text-sm text-gray-600">
                  Target Date: {goal.date}
                </p>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {goal.title}
            </h2>
            <p className="text-gray-700 mb-4">{goal.description}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => navigate(`/progress/${goal._id}`)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                View Progress
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Home;
