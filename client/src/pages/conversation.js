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
    <div>
      <NavBar />
      <div>
        <div className="flex flex-col">
          {conversation?.map((chat, i) => (
            <div key={i} className="flex flex-col py-1">
              <p className="text-lg">{chat.message}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <textarea
          id="message"
          className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:border-blue-500 h-32 resize-none"
          placeholder="Enter message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:bg-blue-600"
          onClick={handleSubmit}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Conversation;
