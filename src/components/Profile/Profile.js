import React, { useContext, useEffect } from "react";
import "./Profile.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useValidation from "../../hooks/useValidation";
import IsSentContext from "../../contexts/IsSentContext";
import Preloader from "../Preloader/Preloader";
import { regExpEmail } from "../../utils/constants";
import ServerErrorContext from "../../contexts/ServerErrorContext";

function Profile({ onLogout, onEditProfile, setServerError, isEdit, setIsEdit }) {
  const currentUser = useContext(CurrentUserContext);
  const serverError = useContext(ServerErrorContext)
  const isSent = useContext(IsSentContext);
  const { values, errors, isValid, onChange, setValues } = useValidation();


  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser, setValues]);

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
                placeholder={currentUser.name}
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
                placeholder={currentUser.email}
                required
                value={values.email || ""}
                pattern={regExpEmail}
                onChange={(e) => {
                  onChange(e);
                  setServerError("");
                }}
              ></input>
            </label>
            <span className="profile__error" id="name-error">
              {errors.email || ""}
            </span>
          </div>
          <span className="profile__server-error">{serverError || ""}</span>
          {isEdit ? (
            <button
              className={
                !isValid || isSent
                  ? "profile__button-save profile__button-save_inactive"
                  : "profile__button-save"
              }
              type="submit"
              disabled={!isValid || isSent}
            >
              {isSent ? <Preloader /> : "Сохранить"}
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
