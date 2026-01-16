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
        <div className='profile'>
            <h2>Bienvenido a tu Perfil</h2>
            <p>{user?.email}</p>
            <button className="btn btn-primary p-6 m-4" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
};
export default Profile;