import React from "react";
import { FaLaptopCode, FaRocket, FaHeart } from "react-icons/fa";
import team from '../images/team.jpeg';

const AboutUs = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Section Header */}
            <header className="bg-gray-800 text-white text-center pt-32 pb-20">
                <h1 className="text-4xl font-bold mb-4">À propos de nous</h1>
                <p className="text-lg">
                    Deux jeunes futurs ingénieurs, unis par la passion de la technologie, l'innovation, et les grandes idées.
                </p>
            </header>

            {/* Section Présentation */}
            <section className="max-w-6xl mx-auto px-6 py-12 text-center">
                <h2 className="text-3xl font-bold text-blue-600 mb-6">Qui sommes-nous ?</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                    Nous sommes deux amis partageant une vision commune : utiliser nos compétences en ingénierie pour
                    construire des solutions innovantes. Avec nos connaissances en programmation, conception et
                    technologies modernes, nous rêvons de créer un impact positif dans le monde.
                </p>
            </section>

            {/* Section Nos Valeurs */}
            <section className="bg-white py-12">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-blue-600 mb-8">Nos Valeurs</h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        {/* Carte Passion */}
                        <div className="text-center p-6 shadow-lg rounded-lg">
                            <FaHeart className="text-red-500 text-6xl mx-auto mb-4" />
                            <h3 className="text-2xl font-bold mb-2">Passion</h3>
                            <p className="text-gray-600">
                                Nous aimons ce que nous faisons. La passion nous motive à apprendre, explorer, et créer sans limites.
                            </p>
                        </div>
                        {/* Carte Innovation */}
                        <div className="text-center p-6 shadow-lg rounded-lg">
                            <FaRocket className="text-yellow-500 text-6xl mx-auto mb-4" />
                            <h3 className="text-2xl font-bold mb-2">Innovation</h3>
                            <p className="text-gray-600">
                                Nous croyons en l'innovation comme moteur de progrès. Nos idées sont ambitieuses et orientées vers l'avenir.
                            </p>
                        </div>
                        {/* Carte Collaboration */}
                        <div className="text-center p-6 shadow-lg rounded-lg">
                            <FaLaptopCode className="text-blue-500 text-6xl mx-auto mb-4" />
                            <h3 className="text-2xl font-bold mb-2">Travail d'équipe</h3>
                            <p className="text-gray-600">
                                En combinant nos forces, nous trouvons des solutions meilleures et plus rapides. Ensemble, nous sommes plus forts.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Objectifs */}
            <section className="max-w-7xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-2 items-center">
                <div>
                    <h2 className="text-3xl font-bold text-blue-600 mb-4">Nos Objectifs</h2>
                    <p className="text-gray-700 leading-relaxed">
                        En tant que futurs ingénieurs, nous voulons :
                    </p>
                    <ul className="list-disc list-inside text-left text-gray-600 mt-4">
                        <li>Construire des projets innovants qui résolvent des problèmes réels.</li>
                        <li>Apprendre les dernières technologies et les appliquer de manière créative.</li>
                        <li>Créer des solutions accessibles et impactantes pour tous.</li>
                    </ul>
                </div>
                <div className="flex justify-center">
                    <img
                        src={team}
                        alt="Travail d'équipe"
                        className="w-96 rounded-lg shadow-lg"
                    />
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
