import React from "react";
import "./Techs.css";

function Techs() {
  return (
    <section className="techs">
      <h2 className="title title_techs-mobile">Технологии</h2>
      <h3 className="techs__title">7&nbsp;технологий</h3>
      <p className="techs__subtitle">
        На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые
        применили&nbsp;в дипломном проекте.
      </p>
      <ul className="techs__list">
        <li className="techs__list-item">HTML</li>
        <li className="techs__list-item">CSS</li>
        <li className="techs__list-item">JS</li>
        <li className="techs__list-item">React</li>
        <li className="techs__list-item">Git</li>
        <li className="techs__list-item">Express.js</li>
        <li className="techs__list-item">mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;
