import React, { useState } from "react";
import "./AI.css";
import axios from "axios";

const AI = () => {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]); // array to store messages

  const handleAi = async () => {
    if (!input.trim()) return; // ignore empty messages

    // Add user message to chat
    setChat((prev) => [...prev, { sender: "user", text: input }]);

    try {
      const res = await axios.post("http://localhost:5000/ai/ask-ai", {
        task: "AiSuggestions",
        prompt: input,
      });

      const aiMessage = res.data.result;

      // Add AI message to chat
      setChat((prev) => [...prev, { sender: "ai", text: aiMessage }]);
      setInput(""); // clear input
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="ai-container">
      {/* Chat messages area */}
      <div className="ai-box">
        {chat.map((msg, index) => (
          <p
            key={index}
            className={msg.sender === "user" ? "user-msg" : "ai-msg"}
          >
            {msg.text}
          </p>
        ))}
      </div>

      {/* Input area */}
      <div className="ai-input-box">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAi()}
        />
        <button onClick={handleAi}>Send</button>
      </div>
    </div>
  );
};

export default AI;
