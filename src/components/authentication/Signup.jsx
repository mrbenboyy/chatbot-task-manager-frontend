import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserAlt, FaEnvelope, FaLock, FaUpload } from 'react-icons/fa';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profileImage: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profileImage: e.target.files[0],
    });
    setUploadSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      if (formData.profileImage) {
        formDataToSend.append('profileImage', formData.profileImage);
      }

      const response = await axios.post('http://localhost:5050/api/users/register', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.token) {
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="bg-gradient-to-r from-indigo-600 to-blue-800 pt-32 pb-32">
      <div className="flex flex-col items-center justify-center animate__animated animate__zoomIn px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white shadow-xl rounded-xl p-8 max-w-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-900 mb-8">
            Créer un compte
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="relative">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 flex items-center">
                <FaUserAlt className="text-gray-400 mr-2" />
                Votre nom complet
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-600"
                placeholder="John Doe"
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 flex items-center">
                <FaEnvelope className="text-gray-400 mr-2" />
                Votre email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-600"
                placeholder="name@company.com"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 flex items-center">
                <FaLock className="text-gray-400 mr-2" />
                Mot de passe
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-600"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Profile Image Upload */}
            <div>
              <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 flex items-center">
                <FaUpload className="text-gray-400 mr-2" />
                Photo de profil
              </label>
              <div className="mt-2 flex flex-col items-center justify-center p-6 border-2 border-gray-300 border-dashed rounded-lg">
                <input
                  type="file"
                  name="profileImage"
                  id="profileImage"
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
                <label
                  htmlFor="profileImage"
                  className="cursor-pointer text-gray-500 hover:text-blue-500"
                >
                  Cliquez pour télécharger ou glissez-déposez ici
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
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            >
              {loading ? 'Création du compte...' : 'Créer un compte'}
            </button>

            <p className="text-sm font-light text-center text-gray-600">
              Vous avez déjà un compte ?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:underline">
                Connectez-vous ici
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Signup;
