import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({onClose, isOpen, onUpdateAvatar}) {
    const refInputUrl = React.useRef();

    function handleSubmit(event) {
        event.preventDefault();
        onUpdateAvatar({
            avatar: refInputUrl.current.value
        });
    }

    return (
        <PopupWithForm
            title="Обновить аватар"
            name="popup-edit-avatar"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className="data-form__field">
                <input className="data-form__input data-form__input_type_url"
                       id="avatar"
                       name="avatar"
                       type="url"
                       aria-label="Ссылка на картинку"
                       placeholder="Ссылка на картинку"
                       required
                       ref={refInputUrl}
                />
                <span className="data-form__input-error data-form__input-error_type_avatar"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;
