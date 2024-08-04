import { useState } from "react";
import NavBar from "../components/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditGoal() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const navigate = useNavigate();

  const handleTitle = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:8081/goals/edittitle/${id}`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Title changed");
    } catch (err) {
      console.log(err);
    }
    setTitle("");
  };
  //Might have to implement refresh token when username is changed
  const handleDescription = (e) => {
    e.preventDefault();
    try {
      const response = axios.patch(
        `http://localhost:8081/goals/editdescription/${id}`,
        { description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Description changed");
    } catch (err) {
      console.log(err);
    }
    setDescription("");
  };

  const handleDate = (e) => {
    e.preventDefault();
    try {
      const response = axios.patch(
        `http://localhost:8081/goals/editdate/${id}`,
        { date },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Date changed");
    } catch (err) {
      console.log(err);
    }
    setDate("");
  };

  return (
    <div>
      <NavBar />
      <div className="container mx-auto mt-8 p-4">
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <form className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Edit Goal</h1>

            <div className="mb-6 flex items-end">
              <div className="flex-grow mr-2">
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  New Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full px-4 py-2 border rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter new Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="h-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={handleTitle}
              >
                Save
              </button>
            </div>

            <div className="mb-6 flex items-end">
              <div className="flex-grow mr-2">
                <label
                  htmlFor="date"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  New Date
                </label>
                <input
                  type="date"
                  id="date"
                  className="w-full px-4 py-2 border rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter new date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="h-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={handleDate}
              >
                Save
              </button>
            </div>
            <div className="w-full mr-2">
              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  New Description
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
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleDescription}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default EditGoal;
