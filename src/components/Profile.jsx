import React, { useState, useEffect } from "react";
import { FaSave, FaTimes, FaEdit, FaLock, FaEnvelope, FaUser } from "react-icons/fa";
import { MdPhotoCamera } from "react-icons/md"; // Icône appareil photo
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
    const [newPassword, setNewPassword] = useState("");
    const [updatedField, setUpdatedField] = useState({});
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
            const response = await axios.get("http://localhost:5050/api/users/me", config);
            setUser(response.data);
        } catch (err) {
            toast.error("Erreur lors de la récupération des informations utilisateur.");
        }
    };

    const handleEdit = (field) => {
        setIsEditing({ ...isEditing, [field]: true });
    };

    const handleCancel = (field) => {
        setIsEditing({ ...isEditing, [field]: false });
        setUpdatedField({});
        setNewPassword("");
        setNewProfileImage(null);
    };

    const handleSave = async (field) => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            let updatedData;
            if (field === "password") {
                updatedData = { password: newPassword };
            } else if (field === "profileImage") {
                const formData = new FormData();
                formData.append("profileImage", newProfileImage);
                updatedData = formData;
                config.headers["Content-Type"] = "multipart/form-data";
            } else {
                updatedData = { [field]: updatedField[field] };
            }

            const response = await axios.put(
                "http://localhost:5050/api/users/update",
                updatedData,
                config
            );

            setUser(response.data);
            toast.success(`${field === "password" ? "Mot de passe" : field} mis à jour avec succès.`);
            setIsEditing({ ...isEditing, [field]: false });
            setUpdatedField({});
            setNewPassword("");
            setNewProfileImage(null);
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

    const handleSaveProfileImage = async () => {
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
                "http://localhost:5050/api/users/update",
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

    const handleCancelImage = () => {
        setNewProfileImage(null);
        setPreviewImage("");
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className="p-6 pt-32 bg-gradient-to-r from-blue-700 via-blue-500 to-indigo-600 min-h-screen">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
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
                <div className="flex flex-col items-center mb-10">
                    <div className="relative">
                        <img
                            src={previewImage || `http://localhost:5050${user.profileImage}`}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow-xl"
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
                            className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-lg"
                        >
                            <MdPhotoCamera className="text-xl" />
                        </button>
                    </div>
                    {newProfileImage && (
                        <div className="flex gap-4 mt-4">
                            <button
                                onClick={handleSaveProfileImage}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-200"
                            >
                                <FaSave />
                            </button>
                            <button
                                onClick={handleCancelImage}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
                            >
                                <FaTimes />
                            </button>
                        </div>
                    )}
                </div>

                {/* Nom complet */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <FaUser className="text-gray-500 text-xl" />
                        <h2 className="text-xl font-semibold text-gray-700">Nom complet :</h2>
                    </div>
                    <div className="flex-1 text-right">
                        {isEditing.name ? (
                            <input
                                type="text"
                                value={updatedField.name || user.name}
                                onChange={(e) =>
                                    setUpdatedField({ ...updatedField, name: e.target.value })
                                }
                                className="mt-2 w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        ) : (
                            <p className="text-gray-700">{user.name}</p>
                        )}
                    </div>
                    <div className="ml-4">
                        {isEditing.name ? (
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleSave("name")}
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-200"
                                >
                                    <FaSave />
                                </button>
                                <button
                                    onClick={() => handleCancel("name")}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => handleEdit("name")}
                                className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                            >
                                <FaEdit />
                            </button>
                        )}
                    </div>
                </div>

                {/* Email */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <FaEnvelope className="text-gray-500 text-xl" />
                        <h2 className="text-xl font-semibold text-gray-700">Email :</h2>
                    </div>
                    <div className="flex-1 text-right">
                        {isEditing.email ? (
                            <input
                                type="email"
                                value={updatedField.email || user.email}
                                onChange={(e) =>
                                    setUpdatedField({ ...updatedField, email: e.target.value })
                                }
                                className="mt-2 w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        ) : (
                            <p className="text-gray-700">{user.email}</p>
                        )}
                    </div>
                    <div className="ml-4">
                        {isEditing.email ? (
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleSave("email")}
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-200"
                                >
                                    <FaSave />
                                </button>
                                <button
                                    onClick={() => handleCancel("email")}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => handleEdit("email")}
                                className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                            >
                                <FaEdit />
                            </button>
                        )}
                    </div>
                </div>

                {/* Mot de passe */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <FaLock className="text-gray-500 text-xl" />
                        <h2 className="text-xl font-semibold text-gray-700">Mot de passe :</h2>
                    </div>
                    <div className="flex-1 text-right">
                        {isEditing.password ? (
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Nouveau mot de passe"
                                className="mt-2 w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        ) : (
                            <p className="text-gray-700">********</p>
                        )}
                    </div>
                    <div className="ml-4">
                        {isEditing.password ? (
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleSave("password")}
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-200"
                                >
                                    <FaSave />
                                </button>
                                <button
                                    onClick={() => handleCancel("password")}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => handleEdit("password")}
                                className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                            >
                                <FaEdit />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
