import React from 'react';
import {CurrentUserContext} from "../context/CurrentUserContext";

function Card({card, onImageCardClick, onCardLikeClick, onCardDeleteClick}) {

    const currentUser = React.useContext(CurrentUserContext);
    const isOwner = card.owner._id === currentUser._id;
    const isLinked = card.likes.some(like => like._id === currentUser._id);
    const cardLikeButtonClassName = (
        `card__like ${isLinked && 'card__like_active'}`
    );

    return (
        <article className="card">
            <img className="card__image" src={card.link} alt={card.name}
                 onClick={onImageCardClick}
            />
            {isOwner && (<button className="card__btn_type_trash" onClick={onCardDeleteClick} type="button"/>)}
            <div className="card__info">
                <h2 className="card__caption">{card.name}</h2>
                <div className="card__wrapper-like">
                    <button className={cardLikeButtonClassName}
                            type="button"
                            onClick={onCardLikeClick}
                    />
                    <span className="card__like-counter">{card.likes.length}</span>
                </div>
            </div>
        </article>
    )
}

export default Card;
