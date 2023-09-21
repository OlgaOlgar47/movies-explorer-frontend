import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from '../../images/logo.svg'

function Header() {
    return (
        <>
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
          </>
    )
}

export default Header;