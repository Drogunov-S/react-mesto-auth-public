import logo from '../images/logo.svg';
import Header from "./Header";
import React from "react";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import {CurrentUserContext} from "../context/CurrentUserContext";
import defaultAvatar from "../images/avatar.jpg"
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import {Route, Routes, useNavigate} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRouteElement from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import auth from "../utils/Auth";
import {LoginUserContext} from "../context/LoginUserContext";

function App() {
    const [currentUser, setCurrentUser] = React.useState({
        _id: '',
        name: 'Name',
        about: 'About',
        avatar: defaultAvatar,
        cohort: ''
    });

    const [loginUser, setLoginUser] = React.useState({
        loggedIn: false,
        _id: '',
        email: ''
    });
    const [cards, setCards] = React.useState([]);
    const [message, setMessage] = React.useState({message: '', isError: false});

    const navigate = useNavigate();

    React.useEffect(() => {
        handleTokenCheck();
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userInfo, cards]) => {
                setCurrentUser({...userInfo})
                setCards(cards);
            })
            .catch(console.log);
    }, [])

    const [isEditAvatarPopup, setActiveEditAvatarPopup] = React.useState(false);
    const [isEditProfilePopup, setActiveEditProfilePopup] = React.useState(false);
    const [isAddPlacePopup, setActiveAddPlacePopup] = React.useState(false);
    const [isImagePopup, setActiveImagePopup] = React.useState(false);
    const [isInfoPopup, setActiveInfoPopup] = React.useState(false);

    const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});

    function handleEditAvatarClick() {
        setActiveEditAvatarPopup(true);
    }

    function handleEditProfileClick() {
        setActiveEditProfilePopup(true);
    }

    function handleAddPlaceClick() {
        setActiveAddPlacePopup(true);
    }

    function handlerInfoMassage(result) {
        setActiveInfoPopup(true);
        setMessage(result);
    }

    function handleImageCardClick({name, link}) {
        setSelectedCard({name: name, link: link});
        if (selectedCard.name && selectedCard.link) {
            setActiveImagePopup(true);
        }
    }

    function handleCloseAllPopup(evt) {
        const isClose = Array.from(evt.target.classList)
            .some(className => className === 'popup__close' || className === 'popup_opened');
        if (isClose) {
            closeAllPopups();
        }
    }

    function closeAllPopups() {
        setActiveEditAvatarPopup(false);
        setActiveEditProfilePopup(false);
        setActiveAddPlacePopup(false);
        setActiveImagePopup(false);
        setActiveInfoPopup(false);
        setSelectedCard({name: '', link: ''});
    }

    function handleCardLikeClick(card) {
        const isLiked = card.likes.some((like) => like._id === currentUser._id);
        const changeLike = isLiked
            ? api.unlikeCard(card._id)
            : api.likeCard(card._id);
        changeLike.then((updatedCard) => {
            setCards((cards) =>
                cards.map((viewCard) =>
                    viewCard._id === updatedCard._id
                        ? updatedCard
                        : viewCard
                ));
        }).catch(console.log);
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                const updatedCards = cards.filter(viewCards => viewCards._id !== card._id)
                setCards(updatedCards);
            })
            .catch(console.log)
    }

    function handleUpdateUser(userData) {
        api.updateUserInfo(userData)
            .then(user => {
                setCurrentUser({...currentUser, ...user});
                closeAllPopups();
            }).catch(console.log)
        ;
    }

    function handleUpdateAvatar(avatar) {
        api.updateAvatar(avatar)
            .then(updatedUser => {
                setCurrentUser({...currentUser, ...updatedUser});
                closeAllPopups();
            })
            .catch(console.log);
    }

    function handleSubmit(card) {
        api.postCard(card)
            .then(cardsUpdated => {
                setCards([cardsUpdated, ...cards]);
                closeAllPopups();
            })
            .catch(console.log);
    }

    function handleLogin(loginUser) {
        setLoginUser({...loginUser, loggedIn: true});
    }

    function handleTokenCheck() {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            auth.checkToken(jwt)
                .then(userLogin => {
                    setLoginUser({...userLogin, loggedIn: true});
                    navigate('/', {replace: true});
                })
        }
    }

    function handleLogoutUser() {
        setLoginUser({
            loggedIn: false,
            _id: '',
            email: ''
        });
    }


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <LoginUserContext.Provider value={loginUser}>
                <div className="page">
                    <Header
                        logo={logo}
                        handleLogoutUser={handleLogoutUser}
                    />
                    <main className="content">
                        <Routes>
                            <Route path='/' element={
                                <ProtectedRouteElement
                                    element={Main}
                                    onEditAvatar={handleEditAvatarClick}
                                    onEditProfile={handleEditProfileClick}
                                    onAddPlace={handleAddPlaceClick}
                                    cards={cards}
                                    onImageCard={handleImageCardClick}
                                    onCardLike={handleCardLikeClick}
                                    onCardDelete={handleCardDelete}
                                />
                            }/>

                            <Route
                                path='/sign-in'
                                element={<Login
                                    title='Вход'
                                    buttonText='Войти'
                                    handleLogin={handleLogin}
                                />}
                            />
                            <Route
                                path='/sign-up'
                                element={
                                    <Register
                                        title='Регистрация'
                                        buttonText='Зарегистрироваться'
                                        onComplete={handlerInfoMassage}
                                    />}
                            />
                        </Routes>
                        <InfoTooltip
                            isOpen={isInfoPopup}
                            onClose={handleCloseAllPopup}
                            result={message}
                        />
                        <EditProfilePopup
                            isOpen={isEditProfilePopup}
                            onClose={handleCloseAllPopup}
                            onUpdateUser={handleUpdateUser}
                        />
                        <EditAvatarPopup
                            isOpen={isEditAvatarPopup}
                            onClose={handleCloseAllPopup}
                            onUpdateAvatar={handleUpdateAvatar}
                        />

                        <AddPlacePopup
                            isOpen={isAddPlacePopup}
                            onClose={handleCloseAllPopup}
                            onSubmit={handleSubmit}
                        />

                        <PopupWithForm
                            title="Вы уверены?"
                            name="popup-confirmation"
                            buttonText="Да"
                            onClose={handleCloseAllPopup}
                        />

                        <ImagePopup
                            card={selectedCard}
                            isOpen={isImagePopup}
                            onClose={handleCloseAllPopup}
                        />
                    </main>
                    {loginUser.loggedIn && <Footer/>}
                </div>
            </LoginUserContext.Provider>
        </CurrentUserContext.Provider>
    )
        ;
}

export default App;
