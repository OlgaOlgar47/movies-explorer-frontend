import { React, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.svg";
import profileDark from "../../images/profile-dark.svg";
import Navigation from "../Navigation/Navigation";

function Header() {
  const location = useLocation();

  const [isClicked, setIsClicked] = useState(false);

  function handleOpenBurgerMenu() {
    setIsClicked(true);
  }

  function handleCloseBurgerMenu() {
    setIsClicked(false);
  }

  const headerDeafault = () => {
    const { pathname } = location;
    return pathname === "/";
  };

  const headerLoggedIn = () => {
    const { pathname } = location;
    return (
      pathname === "/movies" ||
      pathname === "/saved-movies" ||
      pathname === "/profile"
    );
  };

  return (
    <>
      {headerDeafault() && (
        <header className="header">
          <Link to="/" className="logo">
            <img src={logo} alt="логотип сайта" />
          </Link>
          <div className="header__buttons-container">
            <Link to="/signup" className="header__button">
              Регистрация
            </Link>
            <Link to="/signin" className="header__button header__button-green">
              Войти
            </Link>
          </div>
        </header>
      )}

      {headerLoggedIn() && (
        <header className="header header_color">
          <Link to="/" className="logo">
            <img src={logo} alt="логотип сайта" />
          </Link>
          <nav className="header__buttons-container header__buttons-container_loggedIn">
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                `header__button header__button_loggedIn ${
                  isActive ? "header__button_active" : ""
                }`
              }
            >
              Фильмы
            </NavLink>
            <NavLink
              to="/saved-movies"
              className={({ isActive }) =>
                `header__button header__button_loggedIn ${
                  isActive ? "header__button_active" : ""
                }`
              }
            >
              Сохранённые фильмы
            </NavLink>
            <Link
              to="/profile"
              className="header__button header__button_loggedIn"
            >
              <img
                src={profileDark}
                className="header__profile-icon"
                alt="Иконка аккаунта"
              ></img>
            </Link>
            <button
              type="button"
              className="header__burger-menu-button"
              onClick={handleOpenBurgerMenu}
            ></button>
          </nav>
          {isClicked ? <Navigation onClose={handleCloseBurgerMenu} /> : ""}
        </header>
      )}
    </>
  );
}

export default Header;
