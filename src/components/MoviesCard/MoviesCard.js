import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MoviesCard.css";
import savedMovieImage from "../../images/saved-movie-button.svg";
import { addMovie } from "../../utils/MainApi";

function MoviesCard({ data, isSaved, savedMovies }) {
  const [cardIsSaved, setCardIsSaved] = useState(false);

  useEffect(() => {
    if (!isSaved) {
      setCardIsSaved(savedMovies.some((movie) => data.id === movie.movieId));
    }
  }, [data.id, savedMovies, isSaved]);

  function onClick() {
    if (savedMovies.some((movie) => data.id === movie.movieId)) {
      setCardIsSaved(true);
      addMovie(data);
    } else {
      setCardIsSaved(false);
      addMovie(data);
    }
  }

  return (
    <div className="card">
      <div className="card__top-container">
        <h3 className="card__name">{data.nameRU}</h3>
        <p className="card__duration">{data.duration}</p>
      </div>
      <Link to={data.trailerLink} target="_blank">
        <img
          src={
            isSaved
              ? data.image
              : `https://api.nomoreparties.co${data.image.url}`
          }
          className="card__image"
          alt={data.name}
        ></img>
      </Link>
      {isSaved ? (
        <button type="button" className="card__delete">
          <img
            src={savedMovieImage}
            alt="кнопка удаления сохраненного фильма"
          ></img>
        </button>
      ) : cardIsSaved ? (
        <button type="button" onClick={onClick} className="card__saved-button">
        </button>
      ) : (
        <button type="button" onClick={onClick} className="card__save-button">
          Сохранить
        </button>
      )}
    </div>
  );
}

export default MoviesCard;
