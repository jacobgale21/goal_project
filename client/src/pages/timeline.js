import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import axios from "axios";

function Timeline() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8081/timelines/create/${id}`,
        { title, description, date, goal },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTitle("");
      setDate("");
      setDescription("");
    } catch (err) {
      console.log("Error in creating progress", err);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Create Progress Report</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="time"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Goal Deadline
            </label>
            <input
              type="text"
              id="date"
              className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter deadline"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:border-blue-500 h-32 resize-none"
              placeholder="Enter description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:bg-blue-600"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
export default Timeline;
