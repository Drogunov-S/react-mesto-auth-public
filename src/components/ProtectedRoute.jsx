import React from 'react';
import {Navigate} from "react-router-dom";
import {LoginUserContext} from "../context/LoginUserContext";

const ProtectedRouteElement = ({element: Component, ...props}) => {
    const loggedUser = React.useContext(LoginUserContext);

    return (
        loggedUser.loggedIn
            ? <Component {...props} />
            : <Navigate to={'/sign-in'} replace/>
    )
}

export default ProtectedRouteElement;
