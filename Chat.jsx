import React, { useState, useEffect, useRef } from "react";
import SendIcon from '@mui/icons-material/Send';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const chatWindowRef = useRef(null);

  // Function to handle sending a message
  const sendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== "") {
      const newMessage = {
        text: inputMessage,
        timestamp: new Date().toLocaleTimeString(),
        sender: "user"
      };
      setMessages([...messages, newMessage]);
      setInputMessage(""); // Clear the input field
    }
  };

  // Scroll to the bottom when a new message is added
  const scrollToBottom = () => {
    chatWindowRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div className="chat-container">
      <div className="chat-window" ref={chatWindowRef}>
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <div className="message-content">
              <span>{msg.text}</span>
              <span className="timestamp">{msg.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
      <form className="message-input-container">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />
        <button type="submit" className="send-button" onClick={sendMessage}> <SendIcon/> </button>
      </form>
    </div>
  );
};

export default Chat;
