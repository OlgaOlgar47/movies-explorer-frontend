import React, { useContext } from "react";
import "./Form.css";
import logo from "../../images/logo.svg";
import { REGEXP_EMAIL } from "../../utils/constants";
import { Link } from "react-router-dom";
import ServerErrorContext from "../../contexts/ServerErrorContext";
import IsSentContext from "../../contexts/IsSentContext";
import PreloaderButton from "../Preloaders/PreloaderButton";

function Form({
  isRegister,
  title,
  values,
  errors,
  submitText,
  link,
  formText,
  linkText,
  submitButtonForLogin,
  onSubmit,
  onChange,
  isValid,
  setServerError
}) {
  const serverError = useContext(ServerErrorContext);
  const isSent = useContext(IsSentContext)
  return (
    <form className="form" onSubmit={onSubmit} noValidate>
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
            disabled={isSent}
            onChange={(e) => {
              onChange(e);
              setServerError("");
            }}
            value={values.name || ""}
            required
          />
          <span className="form__input-error">{errors.name || ""}</span>
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
          required
          disabled={isSent}
          onChange={(e) => {
            onChange(e);
            setServerError("");
          }}
          value={values.email || ""}
          pattern={REGEXP_EMAIL}
        />
        <span className="form__input-error">{errors.email || ""}</span>
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
          disabled={isSent}
          onChange={(e) => {
            onChange(e);
            setServerError("");
          }}
          value={values.password || ""}
        ></input>
        <span className="form__input-error form__input-error_active">
          {errors.password || ""}
        </span>
      </label>
      <span className={`form__server-error ${submitButtonForLogin}`}>{serverError || ""}</span>
      <button
        type="submit"
        disabled={!isValid || isSent}
        className={`form__submit-button ${
          !isValid || isSent ? "form__submit-button-inactive" : ""
        }`}
      >
        {isSent ? <PreloaderButton /> : submitText}
      </button>
      <div className="form__subtitle">
        <p className="form__subtitle-text">{formText}</p>
        <Link to={link} className="form__subtitle-link">
          {linkText}
        </Link>
      </div>
    </form>
  );
}

export default Form;
