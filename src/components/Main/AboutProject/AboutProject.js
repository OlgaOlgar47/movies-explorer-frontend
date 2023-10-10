import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project" id="AboutProject">
      <h2 className="title">О&nbsp;проекте</h2>
      <div className="about-project__text-container">
        <div className="about-project__paragraph-container">
          <h3 className="about-project__paragraph-title">
            Дипломный проект включал&nbsp;5 этапов
          </h3>
          <p className="about-project__paragraph">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и&nbsp;финальные доработки.
          </p>
        </div>
        <div className="about-project__paragraph-container">
          <h3 className="about-project__paragraph-title">
            На&nbsp;выполнение диплома ушло&nbsp;5 недель
          </h3>
          <p className="about-project__paragraph">
            У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые
            нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__timeline">
        <p className="about-project__timeline-title about-project__timeline-title_green">1&nbsp;неделя</p>
        <p className="about-project__timeline-title">4&nbsp;недели</p>
        <p className="about-project__timeline-subtitle">Back-end</p>
        <p className="about-project__timeline-subtitle">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
