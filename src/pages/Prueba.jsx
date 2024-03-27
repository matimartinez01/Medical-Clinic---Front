import React, { useState } from 'react';

function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSendMessage = () => {
        if (inputText.trim() !== '') {
            setMessages([...messages, { text: inputText, sender: 'user' }]);
            setInputText('');
            handleBotResponse(inputText);
        }
    };

    const handleBotResponse = (userMessage) => {
        // Respuestas predefinidas o lógica para redireccionar

        let botMessage;
        switch (userMessage.toLowerCase()) {
            case 'hello':
                botMessage = "Hi there! How can I assist you today?";
                break;
            case 'services':
                botMessage = "Sure, here are our services: ...";
                break;
            case 'contact':
                botMessage = "You can contact us at contact@example.com";
                break;
            default:
                botMessage = "I'm sorry, I didn't understand that. How can I assist you?";
                break;
        }

        setMessages([...messages, { text: botMessage, sender: 'bot' }]);
    };

    return (
        <div className="bg-green-300 h-screen w-[500px] ">
            <div className="chat-window">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                        {message.text}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={inputText}
                    onChange={handleInputChange}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chatbot;