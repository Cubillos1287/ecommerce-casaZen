import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

const Profile = () => {
    const { user, updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    useEffect(() => {
        if (!user) {
            navigate("/");
        } else {
            // Inicializar formulario con datos de usuario
            setFormData({
                name: user.name || "",
                email: user.email || "",
                password: ""
            });
        }
    }, [user, navigate]);

    if (!user) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        const success = await updateUser(formData);
        if (success) {
            Swal.fire({
                icon: "success",
                title: "Perfil Actualizado",
                text: "Tus datos se han guardado correctamente.",
                timer: 2000,
                showConfirmButton: false
            });
            setIsEditing(false);
            setFormData(prev => ({ ...prev, password: "" })); // Limpiar password tras actualizar
        }
    };

    return (
        <div className="profile-page">
            <div className="profile-container">
                <h1 className="profile-header">Mi Perfil</h1>

                <div className="profile-card-custom">
                    <div className="profile-avatar-container">
                        <img
                            src={(!user.foto || user.foto === "/user.png")
                                ? "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                                : user.foto
                            }
                            alt="Avatar"
                            className="profile-avatar"
                        />
                    </div>

                    {/* Botón para crear producto (Solo Admin) */}
                    {user && (user.rol === 'admin' || user.email === 'admin@casazen.com') && (
                        <button
                            onClick={() => navigate("/productos/crear")}
                            className="profile-edit-btn"
                            style={{ marginBottom: "20px", width: "100%", background: "#ffeded", border: "2px solid #a8dcab" }}
                        >
                            ➕ Publicar Nuevo Producto
                        </button>
                    )}

                    {isEditing ? (
                        <>
                            <div className="profile-field" style={{ flexDirection: "column", alignItems: "start", gap: "5px" }}>
                                <label style={{ fontSize: "12px", color: "#666" }}>Nombre</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="auth-input"
                                    style={{ background: "#fff", padding: "8px", width: "100%" }}
                                />
                            </div>
                            <div className="profile-field" style={{ flexDirection: "column", alignItems: "start", gap: "5px" }}>
                                <label style={{ fontSize: "12px", color: "#666" }}>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="auth-input"
                                    style={{ background: "#fff", padding: "8px", width: "100%" }}
                                />
                            </div>
                            <div className="profile-field" style={{ flexDirection: "column", alignItems: "start", gap: "5px" }}>
                                <label style={{ fontSize: "12px", color: "#666" }}>Nueva Contraseña (opcional)</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Dejar en blanco para mantener la actual"
                                    className="auth-input"
                                    style={{ background: "#fff", padding: "8px", width: "100%" }}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="profile-field">
                                <span className="profile-field-text"><strong>Nombre:</strong> {user.name}</span>
                            </div>
                            <div className="profile-field">
                                <span className="profile-field-text"><strong>Email:</strong> {user.email}</span>
                            </div>
                        </>
                    )}

                    <div className="profile-actions-bottom" style={{ gap: "10px" }}>
                        {isEditing ? (
                            <>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="profile-edit-btn"
                                    style={{ background: "#ccc", color: "#333" }}
                                >
                                    Cancelar
                                </button>
                                <button onClick={handleSave} className="profile-edit-btn">
                                    Guardar Cambios
                                </button>
                            </>
                        ) : (
                            <button onClick={() => setIsEditing(true)} className="profile-edit-btn">
                                Editar perfil
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;