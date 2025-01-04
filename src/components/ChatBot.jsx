import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaRobot, FaTimes } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

const ChatBot = ({ onTaskAdded }) => {
  const [isOpen, setIsOpen] = useState(false); // Contrôle l'ouverture/fermeture du chatbot
  const [messages, setMessages] = useState(() => {
    // Récupérer l'historique des messages du localStorage
    const savedMessages = localStorage.getItem("chatbotMessages");
    return savedMessages ? JSON.parse(savedMessages) : [
      { text: "Bonjour ! Je suis votre assistant. Comment puis-je vous aider ?", isBot: true },
    ];
  });
  const [userInput, setUserInput] = useState("");

  const messagesEndRef = useRef(null); // Référence pour faire défiler jusqu'au dernier message

  // Sauvegarder les messages dans le localStorage à chaque mise à jour
  useEffect(() => {
    localStorage.setItem("chatbotMessages", JSON.stringify(messages));
  }, [messages]);

  // Faire défiler vers le dernier message lorsque la discussion est ouverte
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { text: userInput, isBot: false };
    setMessages((prev) => [...prev, userMessage]); // Ajout du message utilisateur
    setUserInput("");

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.post(
        "http://localhost:5050/api/chatbot",
        { message: userInput },
        config
      );

      // Ajout du message du bot
      const botMessage = { text: response.data.botResponse, isBot: true };
      setMessages((prev) => [...prev, botMessage]);

      // Vérifiez la réponse pour déterminer si une tâche a été ajoutée, modifiée ou supprimée
      if (
        response.data.botResponse.startsWith("Tâche ajoutée") ||
        response.data.botResponse.startsWith("Tâche modifiée") ||
        response.data.botResponse.startsWith("Tâche supprimée") ||
        response.data.botResponse.startsWith("Tâche introuvable") ||
        response.data.botResponse.includes("supprimées")
      ) {
        setTimeout(() => {
          onTaskAdded(); // Appeler fetchTasks pour synchroniser les tâches
        }, 500); // Optionnel : délai pour afficher le message avant la mise à jour
      }
    } catch (error) {
      const botError = { text: "Désolé, une erreur est survenue. Veuillez réessayer.", isBot: true };
      setMessages((prev) => [...prev, botError]);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Icône pour ouvrir/fermer le chatbot avec effet de focus */}
      <div
        className="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-full shadow-lg cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-2xl hover:ring-4 hover:ring-blue-500 animate-bounce"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaRobot size={24} />
      </div>

      {/* Chatbot en tant que fenêtre fixe/modale */}
      {isOpen && (
        <div className="fixed bottom-0 right-4 bg-white shadow-lg w-full max-w-sm h-96 flex flex-col border border-gray-200 rounded-lg transition-transform transform duration-300 ease-in-out scale-in-fwd">
          {/* Header du chatbot */}
          <div className="flex justify-between items-center bg-gray-900 text-white px-4 py-2 rounded-t-lg">
            <h2 className="text-lg font-semibold">ChatBot</h2>
            <button onClick={handleClose} className="hover:text-gray-200">
              <FaTimes size={20} />
            </button>
          </div>

          {/* Zone de discussion */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 mb-2 rounded-lg ${
                  msg.isBot
                    ? "bg-gray-200 text-gray-700"
                    : "bg-blue-500 text-white"
                }`}
                style={{
                  textAlign: msg.isBot ? "left" : "right", // Alignement du texte
                  maxWidth: "80%", // Limiter la largeur des messages
                  alignSelf: msg.isBot ? "flex-start" : "flex-end", // Positionner le message à gauche ou à droite
                  marginRight: msg.isBot ? "auto" : "0", // Pour l'utilisateur, on met une marge à gauche
                  marginLeft: msg.isBot ? "0" : "auto", // Pour le bot, on met une marge à droite
                  borderRadius: "20px", // Coins arrondis
                }}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} /> {/* Marqueur pour la fin des messages */}
          </div>

          {/* Champ d'entrée */}
          <div className="flex items-center border-t border-gray-200 p-3">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Écrivez un message..."
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white p-3 ml-2 rounded-lg hover:bg-blue-700 transform transition-all duration-200 hover:scale-105"
            >
              <IoSend size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
