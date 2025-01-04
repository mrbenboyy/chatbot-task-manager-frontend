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
        <div className="bg-gray-100 min-h-screen">
            {/* En-tête */}
            <header className="bg-gray-800 text-white text-center pt-32 pb-20">
                <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
                <p className="text-lg">
                    Nous aimerions avoir de vos nouvelles. Remplissez le formulaire ci-dessous ou utilisez l'une de nos coordonnées.
                </p>
            </header>

            {/* Section coordonnées */}
            <section className="max-w-6xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-2">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-blue-600 mb-4">Nos Coordonnées</h2>
                    <div className="flex items-center mb-4">
                        <FaPhone className="text-blue-500 text-2xl mr-4" />
                        <span className="text-gray-700">+212 658 85 05 73</span>
                    </div>
                    <div className="flex items-center mb-4">
                        <FaPhone className="text-blue-500 text-2xl mr-4" />
                        <span className="text-gray-700">+212 657 46 86 63</span>
                    </div>
                    <div className="flex items-center mb-4">
                        <FaEnvelope className="text-blue-500 text-2xl mr-4" />
                        <span className="text-gray-700">a.benbouanane@mundiapolis.ma</span>
                    </div>
                    <div className="flex items-center mb-4">
                        <FaEnvelope className="text-blue-500 text-2xl mr-4" />
                        <span className="text-gray-700">o.chligui@mundiapolis.ma</span>
                    </div>
                    <div className="flex items-center mb-4">
                        <FaMapMarkerAlt className="text-blue-500 text-2xl mr-4" />
                        <span className="text-gray-700">Deroua, Berrechid</span>
                    </div>
                    <div className="flex space-x-4 mt-6">
                        <a href="https://facebook.com" className="text-blue-600 hover:text-blue-800">
                            <FaFacebook size={30} />
                        </a>
                        <a href="https://twitter.com" className="text-blue-400 hover:text-blue-600">
                            <FaTwitter size={30} />
                        </a>
                        <a href="https://linkedin.com" className="text-blue-700 hover:text-blue-900">
                            <FaLinkedin size={30} />
                        </a>
                        <a href="https://instagram.com" className="text-pink-500 hover:text-pink-700">
                            <FaInstagram size={30} />
                        </a>
                    </div>
                </div>

                {/* Formulaire de contact */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-blue-600 mb-4">Envoyez-nous un message</h2>
                    {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        {/* Nom */}
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                                Nom complet
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full p-3 border rounded-lg ${formErrors.name ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring focus:ring-blue-500`}
                            />
                            {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                Adresse e-mail
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full p-3 border rounded-lg ${formErrors.email ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring focus:ring-blue-500`}
                            />
                            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                        </div>

                        {/* Message */}
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                                Votre message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                className={`w-full p-3 border rounded-lg ${formErrors.message ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring focus:ring-blue-500`}
                            ></textarea>
                            {formErrors.message && <p className="text-red-500 text-sm">{formErrors.message}</p>}
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all"
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
