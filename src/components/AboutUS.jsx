import React from "react";
import { FaLaptopCode, FaRocket, FaHeart, FaRocketchat, FaHandsHelping } from "react-icons/fa";
import team from '../images/team.jpeg';

const AboutUs = () => {
    return (
        <div className="bg-gray-100 min-h-screen">

            {/* Section Header */}
            <header className="bg-gradient-to-r from-teal-400 to-teal-600 text-white text-center pt-32 pb-16 rounded-b-2xl">
                <h1 className="text-5xl font-bold mb-4 tracking-wide">À propos de nous</h1>
                <p className="text-xl font-light max-w-3xl mx-auto">
                    Deux amis, unis par la passion pour l'innovation, la technologie et la créativité.
                </p>
            </header>

            {/* Section Présentation */}
            <section className="max-w-5xl mx-auto px-6 py-12 text-center mt-16">
                <h2 className="text-4xl font-semibold text-gray-800 mb-8">Qui sommes-nous ?</h2>
                <p className="text-gray-700 text-lg leading-relaxed mx-auto max-w-xl">
                    Nous sommes deux jeunes passionnés par la technologie, déterminés à utiliser nos compétences pour construire des solutions innovantes. Notre objectif est de créer des projets qui ont un impact réel, en alliant savoir-faire et créativité.
                </p>
            </section>

            {/* Section Nos Valeurs */}
            <section className="bg-gradient-to-r from-blue-400 via-green-400 to-teal-400 py-16">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-semibold text-white mb-12">Nos Valeurs</h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        {/* Carte Passion */}
                        <div className="text-center p-8 bg-white shadow-xl rounded-lg transform hover:scale-105 transition-all duration-300 hover:bg-teal-100">
                            <FaHeart className="text-red-500 text-6xl mx-auto mb-4" />
                            <h3 className="text-2xl font-bold mb-4">Passion</h3>
                            <p className="text-gray-700">
                                La passion est au cœur de tout ce que nous faisons. Elle nous pousse à repousser les limites et à apprendre constamment.
                            </p>
                        </div>
                        {/* Carte Innovation */}
                        <div className="text-center p-8 bg-white shadow-xl rounded-lg transform hover:scale-105 transition-all duration-300 hover:bg-teal-100">
                            <FaRocket className="text-yellow-500 text-6xl mx-auto mb-4" />
                            <h3 className="text-2xl font-bold mb-4">Innovation</h3>
                            <p className="text-gray-700">
                                L'innovation est notre moteur. Nous cherchons constamment de nouvelles solutions pour résoudre des problèmes complexes.
                            </p>
                        </div>
                        {/* Carte Collaboration */}
                        <div className="text-center p-8 bg-white shadow-xl rounded-lg transform hover:scale-105 transition-all duration-300 hover:bg-teal-100">
                            <FaLaptopCode className="text-blue-500 text-6xl mx-auto mb-4" />
                            <h3 className="text-2xl font-bold mb-4">Travail d'équipe</h3>
                            <p className="text-gray-700">
                                Nous croyons que le travail d'équipe est essentiel pour réussir. Ensemble, nous atteignons des objectifs plus grands.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Objectifs */}
            <section className=" text-gray-800 py-20 relative">
    <div className="container mx-auto px-6">
        <div className="flex items-center justify-between gap-16">
            {/* Texte de la section */}
            <div className="max-w-lg space-y-6">
                <h2 className="text-5xl font-bold text-center md:text-left">Nos Objectifs</h2>
                <p className="text-xl font-light text-center md:text-left">
                    En tant que futurs ingénieurs, nous avons pour mission :
                </p>

                <div className="flex flex-col space-y-4 mt-6 md:mt-12 text-center md:text-left">
                    {/* Liste des objectifs avec des icônes */}
                    <div className="flex items-center justify-center md:justify-start">
                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center mr-4">
                            <FaRocketchat className="text-white text-2xl" />
                        </div>
                        <span className="text-lg">Développer des solutions innovantes pour des problèmes réels.</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start">
                        <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center mr-4">
                            <FaLaptopCode className="text-white text-2xl" />
                        </div>
                        <span className="text-lg">Apprendre et appliquer les technologies de demain.</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start">
                        <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center mr-4">
                            <FaHandsHelping className="text-white text-2xl" />
                        </div>
                        <span className="text-lg">Contribuer positivement à notre communauté avec nos projets.</span>
                    </div>
                </div>
            </div>

            {/* Image */}
            <div className="flex justify-center md:justify-end flex-1">
                <img
                    src={team}
                    alt="Travail d'équipe"
                    className="w-full md:w-3/5 rounded-3xl shadow-xl object-cover"
                />
            </div>
        </div>

        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-b from-purple-600 to-transparent opacity-30 rounded-full z-0"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-t from-teal-400 to-transparent opacity-30 rounded-full z-0"></div>
    </div>
</section>

        </div>
    );
};

export default AboutUs;
