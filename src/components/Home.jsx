import React from 'react';
import { FaPlus, FaTasks, FaBell } from 'react-icons/fa'; // Import des icônes
import { useNavigate } from 'react-router-dom';
import RecentNews from './RecentNews'; // Import du composant "Recent News"

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Vérifie si l'utilisateur est connecté

  // Fonction pour gérer le clic sur "Commencez dès maintenant"
  const handleStartNow = () => {
    if (token) {
      navigate('/dashboard'); // Redirige vers le tableau de bord si l'utilisateur est connecté
    } else {
      navigate('/register'); // Sinon, redirige vers la page d'inscription
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      {/* En-tête (Header) */}
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center pt-36 pb-14 rounded-b-lg shadow-xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
          Bienvenue sur votre assistant de gestion des tâches !
        </h1>
        <p className="mt-4 text-xl sm:text-2xl font-semibold">
          Un chatbot intelligent pour vous aider à organiser vos tâches quotidiennes.
        </p>
      </header>

      {/* Contenu basé sur l'état de connexion */}
      <section className="flex-grow bg-white py-10 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {token ? (
            // Afficher les "Recent News" si l'utilisateur est connecté
            <RecentNews />
          ) : (
            // Afficher le guide pour les nouveaux utilisateurs
            <>
              <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800">Comment ça marche ?</h2>
              <p className="mt-4 text-lg sm:text-xl text-gray-600">
                Notre application vous permet de gérer vos tâches quotidiennes de manière simple et efficace grâce à un chatbot intelligent. Voici comment vous pouvez l'utiliser :
              </p>

              {/* Explications étape par étape */}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Étape 1 */}
                <div className="flex flex-col items-center bg-blue-50 p-6 rounded-lg shadow-lg hover:bg-blue-100 transition duration-200">
                  <div className="text-blue-600 text-4xl mb-4">
                    <FaPlus />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800">Ajoutez des tâches facilement</h3>
                  <p className="mt-2 text-lg text-gray-600">Dites simplement au chatbot ce que vous devez faire et il ajoutera la tâche pour vous.</p>
                </div>

                {/* Étape 2 */}
                <div className="flex flex-col items-center bg-green-50 p-6 rounded-lg shadow-lg hover:bg-green-100 transition duration-200">
                  <div className="text-green-600 text-4xl mb-4">
                    <FaTasks />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800">Organisez vos priorités</h3>
                  <p className="mt-2 text-lg text-gray-600">Le chatbot vous aide à prioriser vos tâches en fonction de vos objectifs.</p>
                </div>

                {/* Étape 3 */}
                <div className="flex flex-col items-center bg-yellow-50 p-6 rounded-lg shadow-lg hover:bg-yellow-100 transition duration-200">
                  <div className="text-yellow-600 text-4xl mb-4">
                    <FaBell />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800">Recevez des rappels</h3>
                  <p className="mt-2 text-lg text-gray-600">Le chatbot vous enverra des rappels automatiques pour vous assurer que vous ne manquez jamais une échéance.</p>
                </div>
              </div>

              {/* Appel à l'action */}
              <div className="mt-12">
                <button
                  onClick={handleStartNow}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                >
                  Commencez dès maintenant !
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
