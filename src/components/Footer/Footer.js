import React from "react";
import './Footer.css';
import gitHubURL from "../../constants";

function Footer() {
    return (
        <footer className="footer">
           <h3 className="footer__title">Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.</h3> 
           <div className="footer__container">
           <div className="footer__copyright">&copy;{new Date().getFullYear()}</div>
           <a className="footer__link" href="https://practicum.yandex.ru" target="_blanc" rel="noreferrer">Яндекс.Практикум</a>
           <a className="footer__link" href={gitHubURL} target="_blanc" rel="noreferrer">Github</a>
           </div>
        </footer>
    )
}

export default Footer;
