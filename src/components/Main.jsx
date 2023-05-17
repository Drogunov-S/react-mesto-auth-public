import React from "react";
import Card from "./Card";
import {CurrentUserContext} from "../context/CurrentUserContext";

function Main({onEditAvatar, onEditProfile, onAddPlace, onImageCard, onCardLike, cards, onCardDelete}) {

    const {name: userName, avatar: userAvatar, about: userDescription} = React.useContext(CurrentUserContext);

    return (
        <>
            <section className="profile page__profile" aria-label="Профиль">
                <div className="profile__avatar-overlay"
                     onClick={onEditAvatar}
                >
                    <img src={userAvatar} alt="Аватар" className="profile__avatar-image"/>
                </div>
                <div className="profile__info">
                    <div className="profile__edit">
                        <h1 className="profile__full-name">{userName}</h1>
                        <button className="profile__edit-btn" type="button"
                                onClick={onEditProfile}
                        ></button>
                    </div>
                    <p className="profile__position">{userDescription}</p>
                </div>
                <button className="profile__add-btm" type="button"
                        onClick={onAddPlace}
                ></button>
            </section>
            <section className="cards content__cards" aria-label="Карточки мест">
                {
                    cards.map(card => (
                        <Card
                            key={card._id}
                            card={card}
                            onImageCardClick={() => onImageCard(card)}
                            onCardLikeClick={() => onCardLike(card)}
                            onCardDeleteClick={() => onCardDelete(card)}
                        />
                    ))
                }
            </section>
        </>
    );
}

export default Main;
