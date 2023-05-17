import React from 'react';
import accessImage from '../images/access.png'
import forbiddenImage from '../images/forbidden.png'

function InfoTooltip({isOpen, onClose, result: {message, isError}}) {

    return (
        <div className={`popup-image popup page__popup popup_blackout_highly ${isOpen && 'popup_opened'}`}
             onClick={onClose}
        >
            <div className="popup__container">
                <button className="popup__close" type="button"
                        onClick={onClose}
                ></button>
                <figure className="data-form data-form_type_message">
                    {isError
                        ? <img className="data-form__image" src={forbiddenImage} alt='Авторизация не пройдена'/>
                        : <img className="data-form__image" src={accessImage} alt='Успешная авторизация'/>
                    }
                    <figcaption className="data-form__caption">{message}</figcaption>
                </figure>
            </div>
        </div>
    )
}

export default InfoTooltip;
