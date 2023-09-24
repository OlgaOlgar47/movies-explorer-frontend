import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navigation.css";
import profileDark from "../../images/profile-dark.svg";

const setActive = ({ isActive }) =>
  `navigation__button ${
    isActive ? "navigation__button_active" : ""
  }`;

function Navigation({ onClose }) {
  return (
    <section className={`navigation ${onClose ? 'open' : ''}`}>
      <button className="navigation__close-button" onClick={onClose}></button>
      <nav className="navigation__menu">
        <div className="navigation__container">
      <NavLink to="/" className={setActive}>
          Главная
        </NavLink>
        <NavLink to="/movies" className={setActive}>
          Фильмы
        </NavLink>
        <NavLink to="/saved-movies" className={setActive}>
          Сохранённые фильмы
        </NavLink>
        </div>
        <Link to="/profile" className='navigation__profile'>
          <img
            src={profileDark}
            alt="Иконка аккаунта"
          ></img>
        </Link>
      </nav>
    </section>
  );
}

export default Navigation;
