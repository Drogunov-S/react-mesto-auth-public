import React from "react";
function Header({logo}) {
    return (
        <header className="header page__header">
            <img src={logo} alt="Логотип" className="header__logo"/>
        </header>
    );
}

export default Header;
