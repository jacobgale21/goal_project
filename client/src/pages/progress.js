import NavBar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Progress() {
  const { id } = useParams();
  const [timelines, setTimelines] = useState([]);

  useEffect(() => {
    const getTimeline = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/timelines/get/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTimelines(response.data);
      } catch (err) {
        console.log("Error in creating progress", err);
      }
    };
    getTimeline();
  }, [setTimelines]);
  return (
    <div>
      <NavBar />
      <div className="container mx-auto mt-8 p-4">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Timelines
          </h1>
          <div className="space-y-4">
            {timelines?.map((timeline, i) => (
              <div key={i} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                  {timeline.title}
                </h2>
                <p className="text-gray-700 mb-2">{timeline.description}</p>
                <p className="text-sm text-gray-500">
                  Date Completed: {timeline.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Progress;
