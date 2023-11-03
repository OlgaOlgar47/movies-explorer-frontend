import React from "react";
import './Footer.css';
import { GITHUB_URL } from "../../utils/constants";

function Footer() {
    return (
        <footer className="footer">
           <h3 className="footer__title">Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.</h3> 
           <div className="footer__container">
           <div className="footer__copyright">&copy;{new Date().getFullYear()}</div>
           <a className="footer__link" href="https://practicum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
           <a className="footer__link" href={GITHUB_URL} target="_blank" rel="noreferrer">Github</a>
           </div>
        </footer>
    )
}

export default Footer;
