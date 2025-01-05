import React from 'react';

function Footer() {
    return (
        <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white text-center py-8">
            <div className="max-w-6xl mx-auto px-4">
                <p className="text-sm md:text-base mb-4">
                    &copy; 2025 <span className="font-semibold">TaskMate</span>
                </p>
                <div className="space-x-4">
                    <a href="/terms" className="hover:underline hover:text-blue-400 transition-colors duration-300">Conditions d'utilisation</a>
                    <a href="/privacy" className="hover:underline hover:text-blue-400 transition-colors duration-300">Politique de confidentialité</a>
                </div>
                {/* Optionnel: Ajout des icônes sociales */}
                <div className="mt-4 flex justify-center gap-6">
                    <a href="#" className="hover:text-blue-400 transition-colors duration-300">
                        <i className="fab fa-facebook-f text-xl"></i>
                    </a>
                    <a href="#" className="hover:text-blue-400 transition-colors duration-300">
                        <i className="fab fa-twitter text-xl"></i>
                    </a>
                    <a href="#" className="hover:text-blue-400 transition-colors duration-300">
                        <i className="fab fa-instagram text-xl"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
