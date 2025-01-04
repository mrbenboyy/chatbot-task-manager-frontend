import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import AddTask from "./AddTask";
import UpdateTask from "./UpdateTask";
import TaskStats from "./TaskStats";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdSentimentDissatisfied } from 'react-icons/md';
import {
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaFlag,
  FaCheckCircle,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import ChatBot from "./ChatBot";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [filterPriority, setFilterPriority] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [searchTitle, setSearchTitle] = useState("");

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get("http://localhost:5050/api/tasks", config);
      setTasks(response.data);

      const urgentTasks = response.data.filter((task) => {
        const dueDate = new Date(task.dueDate);
        const today = new Date();
        const twoDaysLater = new Date();
        twoDaysLater.setDate(today.getDate() + 2);

        return dueDate >= today && dueDate <= twoDaysLater && task.status !== "Completed";
      });

      if (urgentTasks.length > 0) {
        urgentTasks.forEach((task) => {
          toast.error(
            `🔔 Tâche urgente : "${task.title}" à terminer avant le ${new Date(
              task.dueDate
            ).toLocaleDateString()}!`
          );
        });
      }
    } catch (err) {
      setError("Impossible de récupérer les tâches. Vérifiez votre connexion.");
    } finally {
      setLoading(false);
    }
  };

  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setShowAddTaskForm(false);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
    setTaskToEdit(null);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Voulez-vous vraiment supprimer cette tâche ?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`http://localhost:5050/api/tasks/${id}`, config);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      toast.success("Tâche supprimée avec succès !");
    } catch (err) {
      toast.error("Erreur lors de la suppression de la tâche.");
    }
  };

  const handleDeleteCompletedTasks = async () => {
    const completedTasks = tasks.filter((task) => task.status === "Completed");

    if (completedTasks.length === 0) {
      toast.info("Aucune tâche terminée à supprimer.");
      return;
    }

    const confirm = window.confirm("Voulez-vous vraiment supprimer toutes les tâches terminées ?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete("http://localhost:5050/api/tasks/completed", config);
      setTasks((prevTasks) => prevTasks.filter((task) => task.status !== "Completed"));
      toast.success(response.data.message);
    } catch (err) {
      toast.error("Erreur lors de la suppression des tâches terminées.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) return <div className="text-center text-gray-500">Chargement...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  // Animation Variants
  const taskVariants = {
    rest: { scale: 1 }, // État normal
    hover: { scale: 1.05 }, // État au survol
  };

  return (
    <div className="p-6 pt-32 bg-gradient-to-r from-indigo-800 via-indigo-600 to-indigo-500 min-h-screen">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
      />

      {/* Barre de recherche et filtrage */}
      <div className="bg-white/90 p-4 rounded-lg shadow-xl mb-8 flex flex-wrap items-center gap-6 border border-gray-200">
        <div className="relative flex-grow">
          <FaSearch className="absolute left-4 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par titre"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          />
        </div>

        <div className="relative flex-grow max-w-xs">
          <FaFilter className="absolute left-4 top-3 text-gray-400" />
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <option value="">Toutes les priorités</option>
            <option value="Low">Faible</option>
            <option value="Medium">Moyenne</option>
            <option value="High">Élevée</option>
          </select>
        </div>

        <div className="relative flex-grow max-w-xs">
          <FaCalendarAlt className="absolute left-4 top-3 text-gray-400" />
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          />
        </div>

        <button
          onClick={() => {
            setTaskToEdit(null);
            setShowAddTaskForm(!showAddTaskForm);
          }}
          className={`${showAddTaskForm ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
            } text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-200`}
        >
          {showAddTaskForm ? "Annuler" : "Ajouter une tâche"}
        </button>

        <button
          onClick={handleDeleteCompletedTasks}
          className="bg-red-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-red-700 transition-all duration-200"
        >
          Supprimer tâches terminées
        </button>
      </div>

      {showAddTaskForm && <AddTask onTaskAdded={handleTaskAdded} />}

      {taskToEdit && (
        <UpdateTask
          task={taskToEdit}
          onTaskUpdated={handleTaskUpdated}
          onCancel={() => setTaskToEdit(null)}
        />
      )}

      {/* Si aucune tâche n'est disponible */}
      {tasks.length === 0 && (
        <div className="bg-white/80 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Pas encore de tâches ?</h2>
          <MdSentimentDissatisfied size={100} className="text-gray-900 mx-auto mb-3" />
          <p className="text-gray-900 mb-6">
            Commencez par ajouter une tâche en cliquant sur le bouton{" "}
            <span className="font-semibold text-blue-600">"Ajouter une tâche"</span>.
          </p>
        </div>
      )}

      {/* Liste des tâches */}
      {tasks.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks
            .filter((task) => {
              if (filterPriority && task.priority !== filterPriority) return false;
              if (filterDate && task.dueDate.split("T")[0] !== filterDate) return false;
              if (searchTitle && !task.title.toLowerCase().includes(searchTitle.toLowerCase()))
                return false;
              return true;
            })
            .map((task) => (
              <motion.div
                key={task._id}
                className={`p-5 rounded-xl shadow-lg bg-white/90 transition-all duration-300 ${task.status === "Completed" ? "bg-green-100" : ""
                  } hover:shadow-xl`}
                variants={taskVariants}
                initial="rest"
                whileHover="hover"
              >
                <h2 className="text-xl font-semibold mb-3 text-blue-700 flex items-center gap-2">
                  <FaFlag className="text-blue-500" />
                  {task.title}
                </h2>
                <p className="text-gray-800 mb-2">{task.description || "Pas de description."}</p>
                <p className="text-sm text-gray-800 mb-2 flex items-center gap-2">
                  <FaCalendarAlt className="text-gray-800" />
                  Échéance : {new Date(task.dueDate).toLocaleDateString()}
                </p>
                <p className="text-sm mb-2 flex items-center gap-2">
                  <FaFlag
                    className={`text-${task.priority === "High"
                      ? "red-500"
                      : task.priority === "Medium"
                        ? "yellow-500"
                        : "green-500"
                      }`}
                  />
                  Priorité : <span className="font-semibold text-blue-600">{task.priority}</span>
                </p>
                <p className="text-sm mb-4 flex items-center gap-2">
                  <FaCheckCircle
                    className={task.status === "Completed" ? "text-green-600" : "text-blue-600"}
                  />
                  Statut :{" "}
                  <span
                    className={`font-semibold ${task.status === "Completed" ? "text-green-600" : "text-blue-600"
                      }`}
                  >
                    {task.status}
                  </span>
                </p>
                <div className="flex justify-between">
                  <button
                    className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2"
                    onClick={() => {
                      setShowAddTaskForm(false);
                      setTaskToEdit(task);
                    }}
                  >
                    <FaEdit />
                    Modifier
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-all flex items-center gap-2"
                    onClick={() => handleDelete(task._id)}
                  >
                    <FaTrash />
                    Supprimer
                  </button>
                </div>
              </motion.div>
            ))}
        </div>
      )}

      {tasks.length > 0 && <TaskStats tasks={tasks} />}
      <ChatBot onTaskAdded={fetchTasks} />
    </div>
  );
};

export default Dashboard;
