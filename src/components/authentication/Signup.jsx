import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserAlt, FaEnvelope, FaLock, FaUpload } from 'react-icons/fa'; // Icons from react-icons

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profileImage: null, // Champ pour l'image
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false); // État pour gérer le succès de l'upload

  // Gérer les changements des champs de texte
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Gérer le changement pour le fichier image
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profileImage: e.target.files[0], // Stocker l'image uploadée
    });
    setUploadSuccess(false); // Réinitialiser le message de succès lors de la sélection d'une nouvelle image
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      // Utilisation de FormData pour inclure l'image
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      if (formData.profileImage) {
        formDataToSend.append('profileImage', formData.profileImage);
      }

      // Envoi de la requête POST
      const response = await axios.post('http://localhost:5050/api/users/register', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Si tout va bien, redirection vers la page de connexion
      if (response.data.token) {
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-r from-purple-600 to-blue-700 pt-52 pb-32">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white/80 rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-2xl font-bold leading-tight text-center text-gray-900">Créer un compte</h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 flex items-center">
                  <FaUserAlt className="mr-2 text-gray-500" />
                  Votre nom complet
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 flex items-center">
                  <FaEnvelope className="mr-2 text-gray-500" />
                  Votre email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 flex items-center">
                  <FaLock className="mr-2 text-gray-500" />
                  Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>

              {/* Profile Image Upload */}
              <div>
                <p className="block mb-2 text-sm font-medium text-gray-900 flex items-center">
                  <FaUpload className="mr-2 text-gray-500" />
                  Télécharger la photo de profil
                </p>
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="profileImage" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Cliquez pour télécharger</span> ou glisser-déposer</p>
                      <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input
                      type="file"
                      name="profileImage"
                      id="profileImage"
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                </div>
                {formData.profileImage && (
                  <p className="mt-2 text-sm text-green-600">Image prête à être téléchargée !</p>
                )}
              </div>

              {/* Error Display */}
              {error && <div className="text-red-600 text-sm">{error}</div>}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {loading ? 'Creating account...' : 'Créer un compte'}
              </button>

              {/* Login Link */}
              <p className="text-sm font-light text-center text-gray-600">
                Vous avez déjà un compte ? <Link to="/login" className="font-medium text-blue-600 hover:underline">Connectez-vous ici</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
