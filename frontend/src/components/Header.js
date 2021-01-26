import React from 'react';
import Logo from '../assets/images/logo.svg';

function Header() {
    return (
        <nav className="navbar navbar-expand-lg wrapper">
            <img className="logo" src={Logo} alt="logo" />
        </nav>
    );
}

export default Header;
