import { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Goals() {
  const [goals, setGoals] = useState([]);
  const navigate = useNavigate();

  const timeline = (id) => {
    navigate(`/timeline/${id}`);
  };

  const edit = (id) => {
    navigate(`/editgoal/${id}`);
  };
  const progress = (id) => {
    navigate(`/progress/${id}`);
  };

  const complete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8081/goals/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      window.location.reload();
    } catch (err) {
      console.log("errol", err);
    }
  };

  useEffect(() => {
    const getGoals = async () => {
      try {
        const response = await axios.get("http://localhost:8081/goals/get", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        await setGoals(response.data);
      } catch (err) {
        console.log("Error on getting goals", err);
      }
    };
    getGoals();
  }, [setGoals]);

  return (
    <div>
      <NavBar />
      <div className="container mx-auto mt-8 p-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <h1 className="text-3xl font-semibold mb-8 text-center">My Goals</h1>
          <div className="flex flex-col space-y-4">
            {goals.map((goal) => (
              <div
                key={goal._id}
                className="p-4 bg-gray-100 rounded-lg shadow-sm"
              >
                <h2 className="text-2xl font-semibold mb-2">{goal.title}</h2>
                <p className="text-gray-700 mb-2">{goal.description}</p>
                <p className="text-sm text-gray-500 mb-4">
                  Target Date: {goal.date}
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => timeline(goal._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                  >
                    Create Timeline
                  </button>
                  <button
                    onClick={() => edit(goal._id)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                  >
                    Edit Goal
                  </button>
                  <button
                    onClick={() => progress(goal._id)}
                    className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                  >
                    View Progress
                  </button>
                  <button
                    onClick={() => complete(goal._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                  >
                    Goal Completed
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Goals;
