import React, { useCallback, useContext, useEffect, useState } from "react";
import "./Profile.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useValidation from "../../hooks/useValidation";
import IsSentContext from "../../contexts/IsSentContext";
import PreloaderButton from "../Preloaders/PreloaderButton";
import { REGEXP_EMAIL } from "../../utils/constants";
import ServerErrorContext from "../../contexts/ServerErrorContext";

function Profile({ onLogout, onEditProfile, setServerError, isEdit, setIsEdit }) {
  const currentUser = useContext(CurrentUserContext);
  const serverError = useContext(ServerErrorContext)
  const isSent = useContext(IsSentContext);
  const [formDataChanged, setFormDataChanged] = useState(false);
  const { values, errors, isValid, onChange, setValues } = useValidation();

  useEffect(() => {
    setServerError("");
  }, [setServerError]);

  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser, setValues]);

  const checkFormDataChanged = useCallback(() => {
    const isNameChanged = values.name !== currentUser.name;
    const isEmailChanged = values.email !== currentUser.email;
    return isNameChanged || isEmailChanged;
  },[currentUser.email, currentUser.name, values.email, values.name]);

  useEffect(() => {
    // Обновление состояния formDataChanged при изменении значений формы
    setFormDataChanged(checkFormDataChanged());
  }, [values, currentUser, checkFormDataChanged]);

  function onSubmit(e) {
    e.preventDefault();
    onEditProfile(values);
  }

  return (
    <main>
      <section className="profile">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form className="profile__form" noValidate onSubmit={onSubmit}>
          <div className="profile__input-container">
            <label className="profile__label">
              Имя
              <input
                disabled={isSent || !isEdit}
                name="name"
                id="name"
                type="text"
                className="profile__input"
                minLength="2"
                maxLength="30"
                required
                value={values.name || ""}
                onChange={(e) => {
                  onChange(e);
                  setServerError("");
                }}
              ></input>
            </label>
            <span className="profile__error" id="name-error">
              {errors.name || ""}
            </span>
            <div className="profile__border"></div>
            <label className="profile__label">
              E-mail
              <input
                disabled={isSent || !isEdit}
                name="email"
                id="email"
                type="email"
                className="profile__input"
                required
                value={values.email || ""}
                pattern={REGEXP_EMAIL}
                onChange={(e) => {
                  onChange(e);
                  setServerError("");
                }}
              ></input>
            </label>
            <span className="profile__error" id="email-error">
              {errors.email || ""}
            </span>
          </div>
          <span className="profile__server-error">{serverError || ""}</span>
          {isEdit ? (
            <button
              className={
                !isValid || isSent || !formDataChanged
                  ? "profile__button-save profile__button-save_inactive"
                  : "profile__button-save"
              }
              type="submit"
              disabled={!isValid || isSent || !formDataChanged}
            >
              {isSent ? <PreloaderButton /> : "Сохранить"}
              {/* <PreloaderButton /> */}
            </button>
          ) : (
            <div className="profile__buttons-container">
              <button
                type="button"
                onClick={() => setIsEdit(true)}
                className="profile__button-edit"
              >
                Редактировать
              </button>
              <button
                type="button"
                onClick={onLogout}
                className="profile__button-logout"
              >
                Выйти из аккаунта
              </button>
            </div>
          )}
        </form>
      </section>
    </main>
  );
}

export default Profile;
