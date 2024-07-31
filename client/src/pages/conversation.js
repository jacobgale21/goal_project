import NavBar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Conversation() {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8081/messages/post/${id}`,
        { message },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage("");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getConversation = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/messages/getmessages/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setConversation(response.data);
      } catch (err) {
        console.log("error get conversation", err);
      }
    };
    getConversation();
  }, [setConversation]);

  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow overflow-y-auto p-4 bg-gray-100">
        <div className="max-w-lg mx-auto">
          {conversation?.map((chat, i) => (
            <div
              key={i}
              className={`flex ${
                chat.sender === "You" ? "justify-end" : "justify-start"
              } mb-2`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs ${
                  chat.sender === "You"
                    ? "bg-blue-500 text-white self-end"
                    : "bg-white text-gray-700 self-start shadow"
                }`}
              >
                <p className="font-semibold">{chat.sender}</p>
                <p>{chat.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-4 border-t border-gray-300">
        <div className="max-w-lg mx-auto flex space-x-4">
          <textarea
            id="message"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 resize-none"
            placeholder="Enter message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            rows="2"
          />
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={handleSubmit}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Conversation;
