import React from 'react';
import {LogoutButton, LoginButton} from "../utils/Helpers";
import { Link } from "react-router-dom";
import { SecureAPI } from "../utils/ApiRequest";

function Header() {

    const accessToken = SecureAPI.getAccessToken();

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/projects">Projects</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
                <li>
                    {accessToken ? <LogoutButton /> : <LoginButton />}
                </li>
            </ul>
        </nav>
    )
}

export default Header;