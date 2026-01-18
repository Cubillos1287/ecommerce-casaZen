import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Profile = () => {
    const { user } = useContext(UserContext);

    // Fallback display if user is null (though mock login should prevent this)
    if (!user) return <div className="profile-page">Cargando...</div>;

    return (
        <>
            <NavBar />
            <div className="profile-page">
                <div className="profile-container">
                    <h1 className="profile-header">Mi Perfil</h1>

                    <div className="profile-card-custom">
                        <div className="profile-avatar-container">
                            <img
                                src={user.foto || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"}
                                alt="Avatar"
                                className="profile-avatar"
                            />
                        </div>

                        <div className="profile-field">
                            <span className="profile-field-text">{user.name}</span>
                        </div>

                        <div className="profile-field">
                            <span className="profile-field-text">{user.email}</span>
                        </div>

                        <div className="profile-actions-bottom">
                            <button className="profile-edit-btn">Editar perfil</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Profile;