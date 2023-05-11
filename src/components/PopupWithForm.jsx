import React from 'react';

function PopupWithForm({title, name, buttonText, isOpen, onClose, children, onSubmit}) {

    return (
        <div className={`${name} popup page__popup ${isOpen && 'popup_opened'}`}
            onClick={onClose}
        >
            <div className="popup__container">
                <button className="popup__close" type="button"
                    onClick={onClose}
                ></button>
                <div className="data-form popup__item">
                    <h2 className="data-form__title">{title}</h2>
                    <form className="data-form__form" name={name} onSubmit={onSubmit}>
                        {children}
                        <button className="data-form__btn-save" type="submit">{buttonText}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PopupWithForm;
