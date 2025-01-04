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
                backgroundColor: ["#66BB6A", "#FFEB3B", "#EF5350"], // Couleurs modernes et harmonieuses
                hoverBackgroundColor: ["#81C784", "#FFEE58", "#FF7043"], // Hover
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
                backgroundColor: ["#FF7043", "#42A5F5", "#66BB6A"],  // Couleurs modernes
                hoverBackgroundColor: ["#FF8A65", "#64B5F6", "#81C784"], // Hover
                borderRadius: 12,
            },
        ],
    };

    // Options pour les graphiques
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    color: "#333", // Couleur du texte de la légende
                    font: {
                        size: 10, // Taille de la police réduite pour la légende
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
                        size: 10, // Taille des textes sur l'axe X plus petit
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
                        size: 10, // Taille des textes sur l'axe Y plus petit
                        family: "'Inter', sans-serif",
                    },
                },
                grid: {
                    color: "#e0e0e0", // Légères lignes de grille
                    lineWidth: 1,
                },
            },
        },
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {/* Graphique en camembert */}
            <div className="bg-white/90 p-6 shadow-xl rounded-xl transition-all duration-300 hover:shadow-2xl">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 text-center">
                    Répartition par priorité
                </h3>
                <div className="w-full" style={{ maxWidth: "350px", height: "350px" }}>
                    <Pie data={priorityData} options={options} />
                </div>
            </div>

            {/* Graphique en barres */}
            <div className="bg-white/90 p-6 shadow-xl rounded-xl transition-all duration-300 hover:shadow-2xl">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 text-center">
                    Répartition par statut
                </h3>
                <div className="w-full" style={{ maxWidth: "350px", height: "350px" }}>
                    <Bar data={statusData} options={options} />
                </div>
            </div>
        </div>
    );
};

export default TaskStats;
