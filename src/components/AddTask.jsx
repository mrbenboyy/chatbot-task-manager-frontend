import React, { useState } from "react";
import axios from "axios";

const AddTask = ({ onTaskAdded }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!title) {
            setError("Le titre est requis.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const taskData = {
                title,
                description,
                dueDate,
                priority,
            };

            const response = await axios.post(
                "https://chatbot-task-manager-backend.onrender.com/api/tasks",
                taskData,
                config
            );

            setSuccess("Tâche ajoutée avec succès !");
            setTitle("");
            setDescription("");
            setDueDate("");
            setPriority("Medium");

            // Appeler la fonction de mise à jour dans le parent (Dashboard)
            if (onTaskAdded) {
                onTaskAdded(response.data);
            }
        } catch (err) {
            setError("Erreur lors de l'ajout de la tâche. Vérifiez votre connexion.");
        }
    };

    return (
        <div className="bg-white/80 shadow-lg animate__animated animate__slideInUp rounded-lg p-5 w-full mx-auto mb-5">
            <h2 className="text-2xl font-bold mb-4">Ajouter une nouvelle tâche</h2>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                        Titre <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Titre de la tâche"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Description de la tâche"
                        rows="3"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                        Date d'échéance
                    </label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                        Priorité
                    </label>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        <option value="Low">Faible</option>
                        <option value="Medium">Moyenne</option>
                        <option value="High">Élevée</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                    Ajouter
                </button>
            </form>
        </div>
    );
};

export default AddTask;
