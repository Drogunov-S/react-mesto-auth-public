import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../context/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

    const userContext = React.useContext(CurrentUserContext);

    const [userName, setUserName] = React.useState('');
    const [userDescription, setDescription] = React.useState('');


    function handleChangeName(event) {
        setUserName(event.target.value);
    }

    function handleChangeDescription(event) {
        setDescription(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        onUpdateUser({
            name: userName,
            about: userDescription
        });
    }


    React.useEffect(() => {
        setUserName(userContext.name);
        setDescription(userContext.about)
    }, [userContext, isOpen]);

    return (
        <PopupWithForm
            title="Редактировать профиль"
            name="popup-edit-profile"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input className="data-form__input data-form__input_type_text-fullname"
                   id="name"
                   name="name"
                   type="text"
                   aria-label="Изменить имя"
                   placeholder="Имя"
                   minLength="2"
                   maxLength="40"
                   required
                   onChange={handleChangeName}
                   value={userName}
            />
            <span className="data-form__input-error data-form__input-error_type_name"></span>
            <input className="data-form__input data-form__input_type_text-position"
                   id="about"
                   name="about"
                   type="text"
                   aria-label="Изменить о себе"
                   placeholder="О себе"
                   minLength="2"
                   maxLength="200"
                   required
                   onChange={handleChangeDescription}
                   value={userDescription}
            />
            <span className="data-form__input-error data-form__input-error_type_about"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;
