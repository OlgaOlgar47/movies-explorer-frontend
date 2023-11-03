import React from "react";
import "./AboutMe.css";
import { GITHUB_URL } from "../../../utils/constants";

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__text-container">
          <h3 className="about-me__title">Ольга</h3>
          <p className="about-me__subtitle">
            Фронтенд-разработчик, 31&nbsp;год
          </p>
          <p className="about-me__text">
            Я&nbsp;живу в&nbsp;Латинской Америке, закончила факультет управления
            РАНХиГС в&nbsp;Росиии, Екатеринбург. Я&nbsp;люблю слушать музыку
            и&nbsp;гулять по&nbsp;пляжу со&nbsp;своей собакой. Недавно начала
            кодить. С&nbsp;2015 года работала на&nbsp;кораблях и&nbsp;яхтах.
            После того, как прошла курс по&nbsp;веб-разработке, начала
            заниматься фриланс-заказами и&nbsp;ушла с&nbsp;постоянной
            работы.
          </p>
          <a
            target="_blank"
            rel="noreferrer"
            href={GITHUB_URL}
            className="about-me__github"
          >
            Github
          </a>
        </div>
        <div className="student-foto"></div>
      </div>
    </section>
  );
}

export default AboutMe;
