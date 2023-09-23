import React from "react";
import landingImage from "../../images/landing-image.svg";
import "./Promo.css";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__text-container">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб&#8209;разработки.
          </h1>
          <p className="promo__subtitle">
            Листайте ниже, чтобы узнать больше про этот проект и&nbsp;его
            создателя.
          </p>
          <a href="#AboutProject">
            <button className="promo__button-learn-more">Узнать больше</button>
          </a>
        </div>
        <img
          className="promo__image"
          src={landingImage}
          alt="изображение планеты Земля из слов WEB"
        />
      </div>
    </section>
  );
}

export default Promo;
