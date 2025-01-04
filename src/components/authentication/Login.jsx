import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEnvelope, FaLock } from 'react-icons/fa'; // Icons from react-icons

function Login() {
  const navigate = useNavigate();

  // State hooks to manage input values and errors
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5050/api/users/login', { email, password });
      localStorage.setItem('token', response.data.token); // Store token in localStorage (or cookies)
      navigate('/dashboard'); // Redirect to the dashboard (or any other route)
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue'); // Display backend error message
    }
  };

  return (
    <section className="bg-gradient-to-r from-purple-600 to-blue-700 pt-10 pb-24">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white/80 rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-2xl font-bold leading-tight text-center text-gray-900">
              Connectez-vous à votre compte
            </h1>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email input */}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 flex items-center">
                  <FaEnvelope className="mr-2 text-gray-500" />
                  Votre email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password input */}
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 flex items-center">
                  <FaLock className="mr-2 text-gray-500" />
                  Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Error message */}
              {error && <div className="text-red-600 text-sm">{error}</div>}

              {/* Submit button */}
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Se connecter
              </button>

              {/* Signup link */}
              <p className="text-sm font-light text-center text-gray-600">
                Vous n’avez pas encore de compte ?{' '}
                <Link to="/register" className="font-medium text-blue-600 hover:underline">
                  S'inscrire
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
