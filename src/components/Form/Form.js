import React from "react";
import "./Form.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Form({
  isRegister,
  title,
  name,
  email,
  submitText,
  link,
  formText,
  linkText,
  submitButtonForLogin,
}) {
  return (
    <main>
      <form className="form">
        <Link to="/" className="form__logo">
          <img src={logo} alt="логотип сайта"></img>
        </Link>
        <h1 className="form__title">{title}</h1>
        {isRegister ? (
          <label className="form__label">
            Имя
            <input
              type="text"
              className="form__input"
              id="name"
              name="name"
              placeholder="Введите имя"
              value={name}
              required
            />
            <span className="form__input-error">Что-то пошло не так...</span>
          </label>
        ) : (
          ""
        )}
        <label className="form__label">
          E-mail
          <input
            type="email"
            className="form__input"
            id="email"
            name="email"
            placeholder="Введите e-mail"
            value={email}
            required
          />
          <span className="form__input-error">Что-то пошло не так...</span>
        </label>
        <label className="form__label">
          Пароль
          <input
            type="password"
            className="form__input"
            id="password"
            name="password"
            placeholder="Введите пароль"
            required
          ></input>
          <span className="form__input-error form__input-error_active">
            Что-то пошло не так...
          </span>
        </label>
        <button
          type="submit"
          className={`form__submit-button ${submitButtonForLogin}`}
        >
          {submitText}
        </button>
        <div className="form__subtitle">
          <p className="form__subtitle-text">{formText}</p>
          <Link to={link} className="form__subtitle-link">
            {linkText}
          </Link>
        </div>
      </form>
    </main>
  );
}

export default Form;
