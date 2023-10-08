import React from "react";
import "./AboutMe.css";
import gitHubURL from "../../../constants";

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__text-container">
          <h2 className="about-me__title">Виталий</h2>
          <p className="about-me__subtitle">
            Фронтенд-разработчик, 30&nbsp;лет
          </p>
          <p className="about-me__text">
            Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет
            экономики СГУ. У&nbsp;меня есть жена и&nbsp;дочь. Я&nbsp;люблю
            слушать музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить.
            С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;.
            После того, как прошёл курс по&nbsp;веб-разработке, начал заниматься
            фриланс-заказами и&nbsp;ушёл с&nbsp;постоянной работы.
          </p>
          <a target="_blank" rel="noreferrer" href={gitHubURL} className="about-me__github">Github</a>
        </div>
        <div className="student-foto"></div>
      </div>
    </section>
  );
}

export default AboutMe;
