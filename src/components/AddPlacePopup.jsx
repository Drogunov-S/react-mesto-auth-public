import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onSubmit}) {

    const [newCard, setCard] = React.useState({name: '', link: ''});

    function handleChange(evt) {
        setCard({
            ...newCard,
            [evt.target.name]: evt.target.value
        });
    }

    React.useEffect(() => {
        setCard({
            name: '',
            link: ''
        })
    }, [isOpen]);

    function handleAddPlaceSubmit(evt) {
        evt.preventDefault();
        onSubmit(newCard);
    }


    return (
        <PopupWithForm
            title="Новое место"
            name="popup-add-post"
            buttonText="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleAddPlaceSubmit}
        >
            <label className="data-form__field">
                <input className="data-form__input data-form__input_type_post-title"
                       id="title"
                       name="name"
                       type="text"
                       aria-label="Название места"
                       placeholder="Название"
                       minLength="2"
                       maxLength="30"
                       required
                       onChange={handleChange}
                       value={newCard.name}
                />
                <span className="data-form__input-error data-form__input-error_type_name"/>
            </label>
            <label className="data-form__field">
                <input className="data-form__input data-form__input_type_url"
                       id="link"
                       name="link"
                       type="url"
                       aria-label="Ссылка на картинку"
                       placeholder="Ссылка на картинку"
                       required
                       onChange={handleChange}
                       value={newCard.link}
                />
                <span className="data-form__input-error data-form__input-error_type_link"/>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;
