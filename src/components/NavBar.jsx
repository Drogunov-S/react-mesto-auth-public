import React from 'react';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LoginUserContext} from "../context/LoginUserContext";

function NavBar({onLogout, locationClass}) {

    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname === '/sign-in' ? '/sign-up' : '/sign-in';
    const {email: userEmail, loggedIn} = React.useContext(LoginUserContext);

    function signOut() {
        localStorage.removeItem('jwt');
        onLogout();
        navigate('/sign-in');
    }

    return (
        <div className={`nav-bar ${locationClass}`}>
            {loggedIn && <span className={'nav-bar__email'}>{userEmail}</span>}
            <nav className={'menu nav-bar__menu'}>
                {/*<NavLink to={'/'} className={'menu__item'}>Домой</NavLink>*/}
                {!loggedIn && <NavLink to={path} className={'menu__item'}>{path === '/sign-in' ? 'Войти' : 'Регистрация'}</NavLink>}
                {loggedIn && <button onClick={signOut} className='menu__item menu__btn'>Выйти</button>}
            </nav>
        </div>
    )
}

export default NavBar;
