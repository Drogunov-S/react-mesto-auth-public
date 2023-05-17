import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import auth from "../utils/Auth";

function Register({title, buttonText, onComplete}) {

    const [formValue, setFormValue] = useState(
        {email: '', password: ''}
    );

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!(formValue.email || formValue.password)) {
            return;
        }
        auth.register(formValue.email, formValue.password)
            .then(data => {
                onComplete({message: 'Вы успешно зарегистрировались!', isError: false});
                setFormValue({email: '', password: ''});
                navigate('/sign-in', {replace: true});
            })
            .catch(err => {
                err.then(({error}) => {
                    onComplete({message: error, isError: true});
                })
            })
    }

    return (
        <div className="container">
            <div className="data-form data-form_theme_dark">
                <h2 className="data-form__title data-form__title_theme_dark">{title}</h2>
                <form className="data-form__form"
                      onSubmit={handleSubmit}
                >
                    <input
                        className="data-form__input data-form__input_type_text-fullname data-form__input_theme_dark"
                        id="email"
                        name="email"
                        type="email"
                        aria-label="Email"
                        placeholder="Email"
                        minLength="2"
                        maxLength="40"
                        required
                        value={formValue.email}
                        onChange={handleChange}
                    />
                    <span className="data-form__input-error data-form__input-error_type_email"></span>
                    <input
                        className="data-form__input data-form__input_type_text-position data-form__input_theme_dark"
                        id="password"
                        name="password"
                        type="password"
                        aria-label="Пароль"
                        placeholder="Пароль"
                        minLength="2"
                        maxLength="200"
                        required
                        value={formValue.password}
                        onChange={handleChange}
                    />
                    <span className="data-form__input-error data-form__input-error_type_password"></span>
                    <button className="data-form__btn-save data-form__btn-save_theme_dark"
                            type="submit">{buttonText}
                    </button>
                </form>
                <div className="container__signin">
                    <p>Уже зарегистрированы?
                        <Link to="/sign-in" className="container__login-link">Войти</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register;
