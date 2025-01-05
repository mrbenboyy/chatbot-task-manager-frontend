import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEnvelope, FaLock } from 'react-icons/fa';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5050/api/users/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="bg-gradient-to-r from-indigo-600 to-blue-800 pt-10">
      <div className="flex flex-col items-center animate__animated animate__zoomIn justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white shadow-xl rounded-xl p-8 max-w-md">
          <h1 className="text-3xl font-semibold text-center text-gray-900 mb-8">
            Connectez-vous à votre compte
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 flex items-center">
                <FaEnvelope className="text-gray-400 mr-2" />
                Votre email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full p-4 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500"
                placeholder="name@company.com"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 flex items-center">
                <FaLock className="text-gray-400 mr-2" />
                Mot de passe
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full p-4 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Error Message */}
            {error && <div className="text-red-600 text-sm text-center">{error}</div>}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              Se connecter
            </button>

            <p className="text-sm font-light text-center text-gray-600">
              Vous n’avez pas encore de compte ?{' '}
              <Link to="/register" className="font-medium text-blue-600 hover:underline">
                S'inscrire
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
