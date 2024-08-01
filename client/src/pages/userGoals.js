import { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
function UserGoals() {
  const { id } = useParams();
  const [goals, setGoals] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getGoal = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/goals/getuser/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        setGoals(response.data);
      } catch (err) {
        console.log("error in getting goals", err);
      }
    };
    getGoal();
  }, [setGoals]);
  return (
    <div>
      <NavBar />
      <div className="container mx-auto mt-8 p-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <h1 className="text-3xl font-semibold mb-8 text-center">Goals</h1>
          <div className="flex flex-col space-y-4">
            {goals?.map((goal) => (
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
                    onClick={() => navigate(`/progress/${goal._id}`)}
                    className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                  >
                    View Progress
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
export default UserGoals;
