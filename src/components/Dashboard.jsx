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
  FaFlag
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

  // Filtrage des tâches
  const filteredTasks = tasks.filter((task) => {
    // Filtre par titre
    const matchesTitle = task.title.toLowerCase().includes(searchTitle.toLowerCase());

    // Filtre par priorité
    const matchesPriority = filterPriority ? task.priority === filterPriority : true;

    // Filtre par date
    const matchesDate = filterDate ? new Date(task.dueDate).toLocaleDateString() === new Date(filterDate).toLocaleDateString() : true;

    // Retourne la tâche si elle satisfait tous les filtres
    return matchesTitle && matchesPriority && matchesDate;
  });


  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) return <div className="text-center text-gray-500">Chargement...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  // Animation Variants
  const taskVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
  };

  return (
    <div className="bg-gradient-to-r from-teal-400 to-teal-600 min-h-screen flex flex-col p-6 pt-32">
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
      <div className="bg-white/80 shadow-lg p-6 rounded-xl mb-6 flex flex-wrap gap-2">
        <div className="relative flex-grow">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par titre"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        <div className="relative flex-grow max-w-xs">
          <FaFilter className="absolute left-3 top-3 text-gray-400" />
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="">Toutes les priorités</option>
            <option value="Low">Faible</option>
            <option value="Medium">Moyenne</option>
            <option value="High">Élevée</option>
          </select>
        </div>

        <div className="relative flex-grow max-w-xs">
          <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
        <div className="bg-white p-8 rounded-xl shadow-xl text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pas encore de tâches ?</h2>
          <MdSentimentDissatisfied size={100} className="text-gray-500 mx-auto mb-3" />
          <p className="text-gray-600 mb-6">
            Commencez par ajouter une tâche en cliquant sur le bouton{" "}
            <span className="font-semibold text-blue-600">"Ajouter une tâche"</span>.
          </p>
        </div>
      )}

      {/* Liste des tâches */}
      {tasks.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 bg-gradient-to-b from-white/80 via-gray-100 to-gray-200 rounded-lg lg:grid-cols-3 xl:grid-cols-3 gap-8 p-4">
          {/* Catégorie En Attente */}
          {/* Catégorie En Attente */}
          <div>
            <h2 className="font-semibold text-xl mb-4 text-blue-600">En Attente</h2>
            <div className="space-y-4">
              {filteredTasks
                .filter((task) => task.status === "Pending")
                .map((task) => (
                  <motion.div
                    key={task._id}
                    className={`relative bg-white p-6 rounded-xl shadow-xl border-l-8 border-blue-500`}
                    variants={taskVariants}
                    initial="rest"
                    whileHover="hover"
                  >
                    {/* Contenu de la tâche */}
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">{task.title}</h2>
                    <p className="text-sm text-gray-600 mb-3">{task.description || "Aucune description."}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-gray-500" />
                        <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaFlag
                          className={`${task.priority === "High"
                            ? "text-red-500"
                            : task.priority === "Medium"
                              ? "text-yellow-500"
                              : "text-green-500"
                            }`}
                        />
                        <span className="capitalize">{task.priority}</span>
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="flex gap-4 justify-between mt-4">
                      <button
                        className="bg-indigo-600 text-white py-2 px-5 rounded-full hover:bg-indigo-700 transition-all"
                        onClick={() => {
                          setShowAddTaskForm(false);
                          setTaskToEdit(task);
                        }}
                      >
                        Modifier
                      </button>
                      <button
                        className="bg-red-600 text-white py-2 px-5 rounded-full hover:bg-red-700 transition-all"
                        onClick={() => handleDelete(task._id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>


          {/* Catégorie En Cours */}
          <div>
            <h2 className="font-semibold text-xl mb-4 text-yellow-600">En Cours</h2>
            <div className="space-y-4">
              {filteredTasks
                .filter((task) => task.status === "Ongoing")
                .map((task) => (
                  <motion.div
                    key={task._id}
                    className={`relative bg-white p-6 rounded-xl shadow-xl border-l-8 border-yellow-500`}
                    variants={taskVariants}
                    initial="rest"
                    whileHover="hover"
                  >
                    {/* Contenu de la tâche */}
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">{task.title}</h2>
                    <p className="text-sm text-gray-600 mb-3">{task.description || "Aucune description."}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-gray-500" />
                        <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaFlag
                          className={`${task.priority === "High"
                            ? "text-red-500"
                            : task.priority === "Medium"
                              ? "text-yellow-500"
                              : "text-green-500"
                            }`}
                        />
                        <span className="capitalize">{task.priority}</span>
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="flex gap-4 justify-between mt-4">
                      <button
                        className="bg-indigo-600 text-white py-2 px-5 rounded-full hover:bg-indigo-700 transition-all"
                        onClick={() => {
                          setShowAddTaskForm(false);
                          setTaskToEdit(task);
                        }}
                      >
                        Modifier
                      </button>
                      <button
                        className="bg-red-600 text-white py-2 px-5 rounded-full hover:bg-red-700 transition-all"
                        onClick={() => handleDelete(task._id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>

          {/* Catégorie Terminées */}
          <div>
            <h2 className="font-semibold text-xl mb-4 text-green-600">Terminées</h2>
            <div className="space-y-4">
              {filteredTasks
                .filter((task) => task.status === "Completed")
                .map((task) => (
                  <motion.div
                    key={task._id}
                    className={`relative bg-white p-6 rounded-xl shadow-xl border-l-8 border-green-500`}
                    variants={taskVariants}
                    initial="rest"
                    whileHover="hover"
                  >
                    {/* Contenu de la tâche */}
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">{task.title}</h2>
                    <p className="text-sm text-gray-600 mb-3">{task.description || "Aucune description."}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-gray-500" />
                        <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaFlag
                          className={`${task.priority === "High"
                            ? "text-red-500"
                            : task.priority === "Medium"
                              ? "text-yellow-500"
                              : "text-green-500"
                            }`}
                        />
                        <span className="capitalize">{task.priority}</span>
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="flex gap-4 justify-between mt-4">
                      <button
                        className="bg-indigo-600 text-white py-2 px-5 rounded-full hover:bg-indigo-700 transition-all"
                        onClick={() => {
                          setShowAddTaskForm(false);
                          setTaskToEdit(task);
                        }}
                      >
                        Modifier
                      </button>
                      <button
                        className="bg-red-600 text-white py-2 px-5 rounded-full hover:bg-red-700 transition-all"
                        onClick={() => handleDelete(task._id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>

      )}

      {tasks.length > 0 && <TaskStats tasks={tasks} />}
      <ChatBot onTaskAdded={fetchTasks} />
    </div>
  );
};

export default Dashboard;
