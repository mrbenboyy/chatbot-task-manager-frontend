import React from 'react';
import { FaPlus, FaTasks, FaBell, FaChartBar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import RecentNews from './RecentNews';

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleStartNow = () => {
    if (token) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-100 to-gray-200 flex flex-col justify-between">
      {/* En-tête (Header) */}
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center pt-32 pb-16 px-4 rounded-b-3xl shadow-lg">
        <h1 className="text-5xl font-extrabold leading-tight mb-4">
          Bienvenue dans votre Assistant de Gestion des Tâches !
        </h1>
        <p className="mt-4 text-xl font-medium text-gray-100">
          Un chatbot intelligent pour vous aider à organiser vos tâches quotidiennes de manière simple et efficace.
        </p>
      </header>

      {/* Contenu basé sur l'état de connexion */}
      <section className="flex-grow bg-white pb-10 pt-5 px-6">
        <div className="max-w-5xl mx-auto text-center">
            // Afficher le guide pour les nouveaux utilisateurs
            <>
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                Comment ça marche ?
              </h2>
              <p className="mt-4 text-lg text-gray-600 mb-10">
                Découvrez comment notre application peut vous aider à gérer vos tâches quotidiennes avec facilité.
              </p>

              {/* Explications étape par étape */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {/* Étape 1 */}
                <div className="flex flex-col items-center bg-gradient-to-t from-teal-50 to-teal-200 p-8 rounded-xl shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
                  <div className="text-teal-600 text-5xl mb-6">
                    <FaPlus />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">Ajoutez des tâches facilement</h3>
                  <p className="text-lg text-gray-600">
                    Dites simplement au chatbot ce que vous devez faire et il ajoutera la tâche pour vous.
                  </p>
                </div>

                {/* Étape 2 */}
                <div className="flex flex-col items-center bg-gradient-to-t from-indigo-50 to-indigo-200 p-8 rounded-xl shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
                  <div className="text-indigo-600 text-5xl mb-6">
                    <FaChartBar />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">Suivez vos progrès</h3>
                  <p className="text-lg text-gray-600">
                    Visualisez l'évolution de vos tâches et restez motivé en suivant vos accomplissements.
                  </p>
                </div>

                {/* Étape 3 */}
                <div className="flex flex-col items-center bg-gradient-to-t from-yellow-50 to-yellow-200 p-8 rounded-xl shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
                  <div className="text-yellow-600 text-5xl mb-6">
                    <FaBell />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">Recevez des rappels</h3>
                  <p className="text-lg text-gray-600">
                    Le chatbot vous enverra des rappels automatiques pour vous assurer que vous ne manquez jamais une échéance.
                  </p>
                </div>
              </div>

              {/* Appel à l'action */}
              <div className="mt-12">
                <button
                  onClick={handleStartNow}
                  className="bg-teal-600 text-white px-10 py-4 rounded-xl text-xl hover:bg-teal-700 transition duration-300 transform hover:scale-105"
                >
                  Commencez dès maintenant !
                </button>
              </div>
            </>
        </div>
      </section>
    </div>
  );
}

export default Home;
