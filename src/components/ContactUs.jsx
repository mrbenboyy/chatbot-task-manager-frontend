import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [formErrors, setFormErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) {
            errors.name = "Le nom est requis.";
        }
        if (!formData.email.trim()) {
            errors.email = "L'adresse e-mail est requise.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "L'adresse e-mail n'est pas valide.";
        }
        if (!formData.message.trim()) {
            errors.message = "Le message est requis.";
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            setSuccessMessage("Votre message a été envoyé avec succès !");
            setFormData({ name: "", email: "", message: "" });
            setFormErrors({});
        } else {
            setFormErrors(errors);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">

            {/* En-tête */}
            <header className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-center pt-32 pb-16 rounded-b-lg shadow-lg">
                <h1 className="text-5xl font-bold mb-6">Contactez-nous</h1>
                <p className="text-lg max-w-2xl mx-auto mb-4">
                    Nous aimerions avoir de vos nouvelles. Remplissez le formulaire ci-dessous ou utilisez l'une de nos coordonnées.
                </p>
            </header>

            {/* Section coordonnées */}
            <section className="max-w-6xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-2">
                <div className="bg-white shadow-xl rounded-xl p-6">
                    <h2 className="text-3xl font-bold text-blue-600 mb-4">Nos Coordonnées</h2>
                    <div className="space-y-6">
                        {/* Téléphone */}
                        <div className="flex items-center text-lg text-gray-700 mb-4">
                            <FaPhone className="text-teal-500 text-3xl mr-4" />
                            <span>+212 658 85 05 73 <br /> +212 657 46 86 63</span>
                        </div>

                        {/* Email */}
                        <div className="flex items-center text-lg text-gray-700 mb-4">
                            <FaEnvelope className="text-teal-500 text-3xl mr-4" />
                            <span>a.benbouanane@mundiapolis.ma <br />o.chligui@mundiapolis.ma</span>
                        </div>

                        {/* Adresse */}
                        <div className="flex items-center text-lg text-gray-700 mb-4">
                            <FaMapMarkerAlt className="text-teal-500 text-3xl mr-4" />
                            <span>Deroua, Berrechid</span>
                        </div>

                        {/* Réseaux sociaux */}
                        <div className="flex space-x-6 mt-6">
                            <a href="https://facebook.com" className="text-blue-600 hover:text-blue-800 transform transition-all duration-300">
                                <FaFacebook size={32} />
                            </a>
                            <a href="https://twitter.com" className="text-blue-400 hover:text-blue-600 transform transition-all duration-300">
                                <FaTwitter size={32} />
                            </a>
                            <a href="https://linkedin.com" className="text-blue-700 hover:text-blue-900 transform transition-all duration-300">
                                <FaLinkedin size={32} />
                            </a>
                            <a href="https://instagram.com" className="text-pink-500 hover:text-pink-700 transform transition-all duration-300">
                                <FaInstagram size={32} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Formulaire de contact */}
                <div className="bg-white shadow-xl rounded-xl p-6">
                    <h2 className="text-3xl font-bold text-blue-600 mb-6">Envoyez-nous un message</h2>
                    {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        {/* Nom */}
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nom complet</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full p-4 border-2 rounded-lg ${formErrors.name ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-teal-500`}
                            />
                            {formErrors.name && <p className="text-red-500 text-sm mt-2">{formErrors.name}</p>}
                        </div>

                        {/* Email */}
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Adresse e-mail</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full p-4 border-2 rounded-lg ${formErrors.email ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-teal-500`}
                            />
                            {formErrors.email && <p className="text-red-500 text-sm mt-2">{formErrors.email}</p>}
                        </div>

                        {/* Message */}
                        <div className="mb-6">
                            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Votre message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                className={`w-full p-4 border-2 rounded-lg ${formErrors.message ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-teal-500`}
                            ></textarea>
                            {formErrors.message && <p className="text-red-500 text-sm mt-2">{formErrors.message}</p>}
                        </div>

                        <button
                            type="submit"
                            className="bg-teal-600 text-white py-3 px-8 rounded-lg hover:bg-teal-700 transition-all duration-300"
                        >
                            Envoyer
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default ContactUs;
