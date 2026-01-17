import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };
    return (
        <div className="profile-page">
            <div className="profile-title">
                <h1>Mi Perfil</h1>

                <div className="profile-card">
                    <img
                        className='profile-foto'
                        src={user?.foto || "/public/user.png"}
                        alt="Foto de perfil"
                    />
                    <p>{user?.email}</p>
                    <div className='profile-actions'>
                        <button className="auth-btn" onClick={handleLogout}>Cerrar Sesión</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Profile;