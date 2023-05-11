import React from 'react';

function ImagePopup({isOpen, onClose, card}) {
    return (
        <div className={`popup-image popup page__popup popup_blackout_highly ${isOpen && 'popup_opened'}`}
             onClick={onClose}
        >
            <div className="popup__container">
                <button className="popup__close" type="button"
                        onClick={onClose}/>
                <figure className="preview">
                    <img className="preview__image" src={card.link} alt={card.name}/>
                    <figcaption className="preview__caption">{card.name}</figcaption>
                </figure>
            </div>
        </div>
    );
}

export default ImagePopup;
