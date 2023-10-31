import { React, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.svg";
import profileDark from "../../images/profile-dark.svg";
import profileGreen from "../../images/profile-green.png";
import Navigation from "../Navigation/Navigation";
import burgerBlack from "../../images/burger-menu-button.svg";
import burgerGreen from "../../images/header-green-burger.svg";

function HeaderLoggedIn({ isMain }) {
  const [isClicked, setIsClicked] = useState(false);

  function handleOpenBurgerMenu() {
    setIsClicked(true);
  }

  function handleCloseBurgerMenu() {
    setIsClicked(false);
  }

  return (
    <header className={isMain ? "header" : "header header_color"}>
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
        <Link to="/profile" className="header__button header__button_loggedIn">
          <img
            src={isMain ? profileGreen : profileDark}
            className="header__profile-icon"
            alt="Иконка аккаунта"
          ></img>
        </Link>
        <button
          type="button"
          className="header__burger-menu-button"
          onClick={handleOpenBurgerMenu}
        >
          <img
            src={isMain ? burgerGreen : burgerBlack}
            alt="меню открытия навигации"
          ></img>
        </button>
      </nav>
      {isClicked ? <Navigation onClose={handleCloseBurgerMenu} /> : ""}
    </header>
  );
}

function HeaderDefault() {
  return (
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
  );
}

function Header({ loggedIn }) {
  const { pathname } = useLocation();

  if (loggedIn) {
    if (
      pathname === "/movies" ||
      pathname === "/saved-movies" ||
      pathname === "/profile"
    ) {
      return <HeaderLoggedIn isMain={false} />;
    } else if (pathname === "/") {
      return <HeaderLoggedIn isMain={true} />;
    }
  } else {
    if (pathname === "/signin" || pathname === "/signup") {
      return null;
    }
  }

  // Проверка на несуществующий путь
  if (
    pathname !== "/movies" &&
    pathname !== "/saved-movies" &&
    pathname !== "/profile" &&
    pathname !== "/" &&
    pathname !== "/signin" &&
    pathname !== "/signup"
  ) {
    return null;
  }

  return <HeaderDefault />;
}

export default Header;
