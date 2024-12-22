import React, { useState } from 'react';
import { FaWhatsapp } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import '../styles/Chatbox.css';

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { sender: 'user', text: input },
        { sender: 'bot', text: 'Share your queries with us:' },
        {
          sender: 'bot',
          text: 'WhatsApp:',
          link: 'https://wa.me/7077829595',
          icon: <FaWhatsapp style={{color:'green'}}/>
        },
        {
          sender: 'bot',
          text: 'Email us:',
          link: 'mailto:evotto.info@gmail.com',  
          icon: <SiGmail style={{color:'red'}}/>
        }
      ]);
      setInput('');
    }
  };

  return (
    <div className={`chatbox-container ${isOpen ? 'open' : ''}`}>
      <div className="chatbox-header" onClick={() => setIsOpen(!isOpen)}>
        <span>Chat with us</span>
      </div>
      {isOpen && (
        <div className="chatbox-body">
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <p>{msg.text}</p>
                {msg.link && (
                  <p>
                    <a href={msg.link} target="_blank" rel="noopener noreferrer" className="whatsapp-link">
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
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbox;
