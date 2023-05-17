import React from "react";
import NavBar from "./NavBar";
import {Link} from "react-router-dom";

function Header({logo, handleLogoutUser}) {
    return (
        <header className="header page__header">
            <Link to={'/'}>
                <img src={logo} alt="Логотип" className="header__logo"/>
            </Link>
            <NavBar
                onLogout={handleLogoutUser}
                locationClass={'header__nav-bar'}
            />
        </header>
    );
}

export default Header;
