import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navigation.css";
import profileDark from "../../images/profile-dark.svg";

const setActive = ({ isActive }) =>
  `navigation__button ${isActive ? "navigation__button_active" : ""}`;

function Navigation({ onClose, onClick }) {
  return (
    <section className="navigation">
      <div className="navigation__overlay" onClick={onClick}>
        <div className="navigation__container">
          <div className="navigation__menu">
            <button
              type="button"
              className="navigation__close-button"
              onClick={onClose}
            ></button>
            <nav className="navigation__links">
              <NavLink exact="true" to="/" className={setActive}>
                Главная
              </NavLink>
              <NavLink exact="true" to="/movies" className={setActive}>
                Фильмы
              </NavLink>
              <NavLink exact="true" to="/saved-movies" className={setActive}>
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
