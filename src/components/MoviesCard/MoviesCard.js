import React from "react";
import "./MoviesCard.css";
import savedMovieImage from '../../images/saved-movie-button.svg'

function MoviesCard({ name, duration, image, isSaved }) {
  return (
    <div className="card">
      <div className="card__top-container">
        <h3 className="card__name">{name}</h3>
        <p className="card__duration">{duration}</p>
      </div>
      <img src={image} className="card__image" alt="картинка фильма"></img>
      {isSaved ? (
        <button className="card__delete">
          <img src={savedMovieImage} alt="кнопка удаления сохраненного фильма"></img>
        </button>
      ) : (
        <button className="card__save-button">Сохранить</button>
      )}
    </div>
  );
}

export default MoviesCard;
