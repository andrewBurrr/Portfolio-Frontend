import React from 'react';
import {useNavigate} from 'react-router-dom';
import { SecureAPI } from "./ApiRequest";


function LogoutButton() {
    const handleLogout = () => {
        SecureAPI.removeAccessToken();
        window.location.replace('/');
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    )
}

function LoginButton() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <button onClick={handleLogin}>Login</button>
    );
}

export { LogoutButton, LoginButton };