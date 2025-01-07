import React, { useState, useEffect } from "react";
import { FaSave, FaTimes, FaEdit, FaLock, FaEnvelope, FaUser } from "react-icons/fa";
import { MdPhotoCamera } from "react-icons/md";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        profileImage: "",
    });
    const [isEditing, setIsEditing] = useState({
        name: false,
        email: false,
        password: false,
        profileImage: false,
    });
    const [updatedField, setUpdatedField] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [newProfileImage, setNewProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState("");

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get("https://chatbot-task-manager-backend.onrender.com/api/users/me", config);
            setUser(response.data);
        } catch (err) {
            toast.error("Erreur lors de la récupération des informations utilisateur.");
        }
    };

    const handleEdit = (field) => {
        setIsEditing((prevState) => ({ ...prevState, [field]: true }));
    };

    const handleCancel = (field) => {
        setIsEditing((prevState) => ({ ...prevState, [field]: false }));
        setUpdatedField((prev) => ({ ...prev, [field]: user[field] })); // Reset to original value
    };

    const handleSave = async (field, e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const updatedData = {
                [field]: updatedField[field], // Only update the field that was edited
            };

            const response = await axios.put(
                "https://chatbot-task-manager-backend.onrender.com/api/users/update",
                updatedData,
                config
            );

            setUser(response.data);
            toast.success("Informations mises à jour avec succès.");
            setIsEditing((prevState) => ({ ...prevState, [field]: false })); // Close the input after save
        } catch (err) {
            toast.error("Erreur lors de la mise à jour des informations.");
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewProfileImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleCancelImage = () => {
        setNewProfileImage(null);
        setPreviewImage("");
    };

    const handleSaveProfileImage = async () => {
        if (!newProfileImage) return;
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            };

            const formData = new FormData();
            formData.append("profileImage", newProfileImage);

            const response = await axios.put(
                "https://chatbot-task-manager-backend.onrender.com/api/users/update",
                formData,
                config
            );

            setUser(response.data);
            toast.success("Photo de profil mise à jour avec succès !");
            setNewProfileImage(null);
            setPreviewImage("");
        } catch (err) {
            toast.error("Erreur lors de la mise à jour de la photo de profil.");
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className="p-6 pt-32 bg-gradient-to-br from-purple-400 via-indigo-500 to-blue-600 min-h-screen">
            <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-xl p-8">
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />

                {/* Photo de profil */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative">
                            <img
                                src={previewImage || `https://chatbot-task-manager-backend.onrender.com/${user.profileImage}`}
                                alt="Profile"
                                className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-2xl"
                            />
                            <input
                                type="file"
                                id="profileImageInput"
                                className="hidden"
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                            <button
                                onClick={() => document.getElementById("profileImageInput").click()}
                                className="absolute bottom-0 right-0 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-200"
                            >
                                <MdPhotoCamera className="text-2xl" />
                            </button>
                        </div>
                        {newProfileImage && (
                            <div className="flex gap-6 mt-6">
                                <button
                                    type="button"
                                    onClick={handleSaveProfileImage}
                                    className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-all duration-200"
                                >
                                    <FaSave />
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancelImage}
                                    className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-all duration-200"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        )}
                    </div>

                <form className="space-y-6">
                    {/* Informations personnelles */}
                    {[
                        { label: "Nom complet", value: user.name, icon: <FaUser className="text-gray-600" />, field: "name" },
                        { label: "Email", value: user.email, icon: <FaEnvelope className="text-gray-600" />, field: "email" },
                        { label: "Mot de passe", value: "", icon: <FaLock className="text-gray-600" />, field: "password" },
                    ].map((field, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {field.icon}
                                <h2 className="text-xl font-medium text-gray-700">{field.label} :</h2>
                            </div>
                            <div className="flex-1 text-right">
                                {isEditing[field.field] ? (
                                    <input
                                        type={field.field === "password" ? "password" : "text"}
                                        value={updatedField[field.field] || field.value}
                                        onChange={(e) =>
                                            setUpdatedField((prev) => ({
                                                ...prev,
                                                [field.field]: e.target.value,
                                            }))
                                        }
                                        className="mt-2 w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                ) : (
                                    <p className="text-gray-600">{field.value}</p>
                                )}
                            </div>
                            <div className="ml-4">
                                {isEditing[field.field] ? (
                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={(e) => handleSave(field.field, e)}
                                            className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-all duration-200"
                                        >
                                            <FaSave />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleCancel(field.field)}
                                            className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-all duration-200"
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => handleEdit(field.field)}
                                        className="text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
                                    >
                                        <FaEdit />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </form>
            </div>
        </div>
    );
};

export default Profile;
