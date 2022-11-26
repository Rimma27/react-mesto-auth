import React from 'react';
import logo from '../images/Vector.svg';
import NavBar from './NavBar';

function Header({email, isLoggedIn, onLogOut}) {
    return (
        <header className="header">
            <img src={logo} className="header__logo" alt="Место" />
            <NavBar email={email} isLoggedIn={isLoggedIn} onLogOut={onLogOut}/>
        </header>
    )
};

export default Header;