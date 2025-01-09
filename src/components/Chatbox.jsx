import React, { useState, useEffect, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaCommentDots } from "react-icons/fa"; // Import chat icon
import "../styles/Chatbox.css";

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const chatboxRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the input field is focused; don't close the chatbox if true
      if (document.activeElement !== inputRef.current) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { sender: "user", text: input },
        { sender: "bot", text: "Share your queries with us:" },
        {
          sender: "bot",
          text: "WhatsApp:",
          link: "https://wa.me/7077829595",
          icon: <FaWhatsapp style={{ color: "green" }} />,
        },
        {
          sender: "bot",
          text: "Email us:",
          link: "mailto:evotto.service@gmail.com",
          icon: <SiGmail style={{ color: "red" }} />,
        },
      ]);
      setInput("");
    }
  };

  return (
    <div
      className={`chatbox-container ${isOpen ? "open" : ""}`}
      ref={chatboxRef}
    >
      <div
        className="chatbox-header"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }} // Stop propagation to prevent closing chatbox
      >
        <FaCommentDots
          size={30}
          className={isOpen ? "chat-icon-hide" : ""}
          onClick={() => setIsOpen(!isOpen)} // Toggle state on click
        />
        {isOpen && <span>Chat with us</span>} {/* Show text when chatbox is open */}
      </div>
      {isOpen && (
        <div className="chatbox-body">
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <p>{msg.text}</p>
                {msg.link && (
                  <p>
                    <a
                      href={msg.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whatsapp-link"
                    >
                      {msg.icon} Click here to contact
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="chatbox-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message"
              ref={inputRef} // Reference for the input field
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbox;
