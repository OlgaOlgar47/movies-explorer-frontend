import React from "react";
import "./Portfolio.css";
import arrow from "../../../images/arrow.svg";

function Portfolio() {
  const statitWebSite = "https://github.com/OlgaOlgar47/cars-hw";
  const responsiveWebSite = "https://github.com/OlgaOlgar47/russian-travel";
  const SPA = "https://github.com/OlgaOlgar47/react-mesto-auth";

  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <a
        href={statitWebSite}
        className="portfolio__link"
        target="_blank"
        rel="noreferrer"
      >
        <p className="portfolio__link-name">Статичный сайт</p>
        <img
          src={arrow}
          className="portfolio__link-arrow"
          alt="Стрелочка для ссылки"
        ></img>
      </a>
      <a
        href={responsiveWebSite}
        className="portfolio__link"
        target="_blank"
        rel="noreferrer"
      >
        <p className="portfolio__link-name">Адаптивный сайт</p>
        <img
          src={arrow}
          className="portfolio__link-arrow"
          alt="Стрелочка для ссылки"
        ></img>
      </a>
      <a
        href={SPA}
        className="portfolio__link"
        target="_blank"
        rel="noreferrer"
      >
        <p className="portfolio__link-name">Одностраничное приложение</p>
        <img
          src={arrow}
          className="portfolio__link-arrow"
          alt="Стрелочка для ссылки"
        ></img>
      </a>
    </section>
  );
}

export default Portfolio;
