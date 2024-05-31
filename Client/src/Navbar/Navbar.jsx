import React from 'react';
import './Navbar.css';
import {AWS_LOGIN_URL, AWS_REGISTER_URL} from "../constants/index.js";

const Navbar = ({isLoggedIn, onLogout}) => {
    return (
        <div className="nav">
            {isLoggedIn ? (
                <>
                    <a href="/ranking" className="nav-button">Ranking</a>
                    <button onClick={onLogout} className="nav-button">Log out</button>
                </>

            ) : (
                <>
                    <a href={AWS_LOGIN_URL} className="nav-button">Login</a>
                    <a href={AWS_REGISTER_URL} className="nav-button">Register</a>
                </>
            )}
        </div>
    );
};

export default Navbar;