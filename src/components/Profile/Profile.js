import React from "react";
import "./Profile.css";

function Profile({ name, email }) {
  return (
    <section className="profile">
      <h3 className="profile__title">Привет, {name}!</h3>
      <form className="profile__form" noValidate>
        <div className="profile__input-container">
        <label className="profile__label">
          Имя
          <input
            name="name"
            id="name"
            type="text"
            className="profile__input"
            placeholder={name}
            minLength="2"
            maxLength="30"
            required
          ></input>
        </label>
        <div className="profile__border"></div>
        <label className="profile__label">
          E-mail
          <input
            name="email"
            id="email"
            type="email"
            className="profile__input"
            placeholder={email}
            required
          ></input>
        </label>
        </div>
        <button type="submit" className="profile__button-save">
          Редактировать
        </button>
        <button type="button" className="profile__button-logout">
          Выйти из аккаунта
        </button>
      </form>
    </section>
  );
}

export default Profile;
