import React, { useState } from "react";
import axios from "axios";

const UpdateTask = ({ task, onTaskUpdated, onCancel }) => {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [dueDate, setDueDate] = useState(task.dueDate ? task.dueDate.split("T")[0] : ""); // Formater la date
    const [priority, setPriority] = useState(task.priority);
    const [status, setStatus] = useState(task.status);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const updatedTaskData = {
                title,
                description,
                dueDate,
                priority,
                status,
            };

            const response = await axios.put(
                `https://chatbot-task-manager-backend.onrender.com/api/tasks/${task._id}`,
                updatedTaskData,
                config
            );

            setSuccess("Tâche mise à jour avec succès !");
            onTaskUpdated(response.data);
        } catch (err) {
            setError("Erreur lors de la mise à jour de la tâche. Vérifiez votre connexion.");
        }
    };

    return (
        <div className="bg-white/80 shadow-lg rounded-lg animate__animated animate__slideInUp p-5 w-full mx-auto mb-5">
            <h2 className="text-2xl font-bold mb-4">Modifier une tâche</h2>
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
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                        Statut
                    </label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        <option value="Pending">En attente</option>
                        <option value="Ongoing">En cours</option>
                        <option value="Completed">Terminé</option>
                    </select>
                </div>
                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                    >
                        Mettre à jour
                    </button>
                    <button
                        type="button"
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none"
                        onClick={onCancel}
                    >
                        Annuler
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateTask;
