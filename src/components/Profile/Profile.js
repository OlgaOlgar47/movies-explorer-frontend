import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile({ name, email }) {
  return (
    <main>
    <section className="profile">
      <h1 className="profile__title">Привет, {name}!</h1>
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
        <Link to='/signin' className="profile__button-logout">
          Выйти из аккаунта
        </Link>
      </form>
      </section>
    </main>
  );
}

export default Profile;
