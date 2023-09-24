import React from "react";
import "./MoviesCard.css";

function MoviesCard({ name, duration, image }) {
  return (
    <div className="card">
      <div className="card__top-container">
        <h3 className="card__name">{name}</h3>
        <p className="card__duration">{duration}</p>
      </div>
      <img src={image} className="card__image" alt="картинка фильма"></img>
      <button className="card__save-button">Сохранить</button>
    </div>
  );
}

export default MoviesCard;
