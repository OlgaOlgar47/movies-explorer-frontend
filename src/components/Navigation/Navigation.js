import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navigation.css";
import profileDark from "../../images/profile-dark.svg";

const setActive = ({ isActive }) =>
  `navigation__button ${isActive ? "navigation__button_active" : ""}`;

function Navigation({ onClose }) {
  return (
    <section className="navigation">
      <div className="navigation__overlay">
        <div className="navigation__container">
          <div className={`navigation__menu ${onClose ? "open" : ""}`}>
            <button
              className="navigation__close-button"
              onClick={onClose}
            ></button>
            <nav className="navigation__links">
              <NavLink to="/" className={setActive}>
                Главная
              </NavLink>
              <NavLink to="/movies" className={setActive}>
                Фильмы
              </NavLink>
              <NavLink to="/saved-movies" className={setActive}>
                Сохранённые фильмы
              </NavLink>
              <Link to="/profile" className="navigation__profile">
                <img src={profileDark} alt="Иконка аккаунта"></img>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Navigation;
