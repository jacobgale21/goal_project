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
  });

  return (
    <div>
      <NavBar />
      <div className="container mx-auto mt-8 p-4">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden">
          <h1 className="text-3xl font-semibold mb-8">My Goals</h1>
          <div className="flex flex-col">
            {goals.map((goal) => (
              <div key={goal._id} className="flex flex-col py-1">
                <h2 className="text-xl font-semibold mb-2">{goal.title}</h2>
                <p className="text-grey-700 mb-2">{goal.description}</p>
                <p className="text-sm text-grey-500">
                  Target Date: {goal.date}
                </p>
                <button
                  onClick={() => timeline(goal._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Create Timeline
                </button>
                <button
                  onClick={() => edit(goal._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Edit Goal
                </button>
                <button
                  onClick={() => complete(goal._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Goal Completed
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Goals;
