import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="title">О&nbsp;проекте</h2>
      <div className="about-project__text-container">
        <div className="about-project__paragraph-container">
          <h3 className="about-project__paragraph-title">
            Дипломный проект включал 5&nbsp;этапов
          </h3>
          <p className="about-project__paragraph">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и&nbsp;финальные доработки.
          </p>
        </div>
        <div className="about-project__paragraph-container">
          <h3 className="about-project__paragraph-title">
            На&nbsp;выполнение диплома ушло 5&nbsp;недель
          </h3>
          <p className="about-project__paragraph">
            У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые
            нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__timeline">
        <div className="about-project__timeline-title about-project__timeline-title_green">1&nbsp;неделя</div>
        <div className="about-project__timeline-title">4&nbsp;недели</div>
        <div className="about-project__timeline-subtitle">Back-end</div>
        <div className="about-project__timeline-subtitle">Front-end</div>
      </div>
    </section>
  );
}

export default AboutProject;
