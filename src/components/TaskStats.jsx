import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from "chart.js";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);

const TaskStats = ({ tasks }) => {
    // Calculer les données pour le graphique
    const priorityCounts = {
        Low: tasks.filter((task) => task.priority === "Low").length,
        Medium: tasks.filter((task) => task.priority === "Medium").length,
        High: tasks.filter((task) => task.priority === "High").length,
    };

    const statusCounts = {
        Pending: tasks.filter((task) => task.status === "Pending").length,
        Ongoing: tasks.filter((task) => task.status === "Ongoing").length,
        Completed: tasks.filter((task) => task.status === "Completed").length,
    };

    // Données pour le graphique en camembert (priorités)
    const priorityData = {
        labels: ["Faible", "Moyenne", "Élevée"],
        datasets: [
            {
                label: "Tâches par priorité",
                data: [priorityCounts.Low, priorityCounts.Medium, priorityCounts.High],
                backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],  // Couleurs modernes
                hoverBackgroundColor: ["#81C784", "#FFD54F", "#FF7961"], // Hover
                borderColor: "#fff",
                borderWidth: 2,
            },
        ],
    };

    // Données pour le graphique en barres (statuts)
    const statusData = {
        labels: ["En attente", "En cours", "Terminées"],
        datasets: [
            {
                label: "Tâches par statut",
                data: [statusCounts.Pending, statusCounts.Ongoing, statusCounts.Completed],
                backgroundColor: ["#FF9800", "#2196F3", "#4CAF50"],  // Couleurs modernes
                hoverBackgroundColor: ["#FFB74D", "#64B5F6", "#81C784"], // Hover
                borderRadius: 10,
            },
        ],
    };

    // Options pour le graphique
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    color: "#333",  // Couleur du texte de la légende
                    font: {
                        size: 14,
                        family: "'Inter', sans-serif",
                    },
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "#333",
                    font: {
                        size: 12,
                        family: "'Inter', sans-serif",
                    },
                },
                grid: {
                    display: false,
                },
            },
            y: {
                ticks: {
                    color: "#333",
                    font: {
                        size: 12,
                        family: "'Inter', sans-serif",
                    },
                },
                grid: {
                    color: "#e0e0e0",  // Légères lignes de grille
                    lineWidth: 1,
                },
            },
        },
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Graphique en camembert */}
            <div className="bg-white/90 p-6 shadow-lg rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 text-center">
                    Répartition par priorité
                </h3>
                <Pie data={priorityData} options={options} />
            </div>

            {/* Graphique en barres */}
            <div className="bg-white/90 p-6 shadow-lg rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 text-center">
                    Répartition par statut
                </h3>
                <Bar data={statusData} options={options} />
            </div>
        </div>
    );
};

export default TaskStats;
