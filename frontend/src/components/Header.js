import React from 'react';
import Logo from '../assets/images/logo.svg';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <nav className="navbar navbar-expand-lg wrapper">
            <Link to="/">
                <img className="logo" src={Logo} alt="logo" />
            </Link>
        </nav>
    );
}

export default Header;
