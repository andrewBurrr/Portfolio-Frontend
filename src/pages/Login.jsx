import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import { PublicAPI } from "../utils/ApiRequest";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleUsernameChange = event => setUsername(event.target.value);
    const handlePasswordChange = event => setPassword(event.target.value);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await PublicAPI.login(username, password);
            navigate('/')
        } catch (error) {
            setErrorMessage('Invalid username or password');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            {errorMessage && <p>{errorMessage}</p>}
            <form onSubmit={handleLogin}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={handleUsernameChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;