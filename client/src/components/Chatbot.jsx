import { useState, useEffect } from 'react';
import { qaDatabase, findBestMatch } from './chatbotKnowledgeBase';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hola! Soy el asistente NEXORA-HUG. Puedo ayudarte en ES o EN. 🤖' }
  ]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('es');

  useEffect(() => {
    const browserLang = navigator.language?.slice(0, 2) || 'es';
    setLanguage(['es', 'en'].includes(browserLang) ? browserLang : 'es');
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { type: 'user', text: input }]);
    const answer = findBestMatch(input, language);
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: answer ? answer.a : 'Lo siento, no encontré una respuesta. Contacta support@nexora-hug.com'
      }]);
    }, 500);
    
    setInput('');
  };

  return (
    <>
      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        🤖 Chat
      </button>
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <span>NEXORA Chat AI</span>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-footer">
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe tu pregunta..."
            />
            <button onClick={handleSend}>➤</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
