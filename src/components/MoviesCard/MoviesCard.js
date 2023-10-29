import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MoviesCard.css";
import deleteMovieImage from "../../images/delete-movie-button.svg";
import savedImage from "../../images/saved-image.png"

function MoviesCard({ data, isSaved, savedMovies, addMovie, deleteMovie }) {
  const [cardIsSaved, setCardIsSaved] = useState(false);

  useEffect(() => {
    if (!isSaved) {
      setCardIsSaved(savedMovies.some((movie) => data.id === movie.movieId));
    }
  }, [data.id, savedMovies, isSaved]);

  function onClick() {
    if (savedMovies.some((movie) => data.id === movie.movieId)) {
      setCardIsSaved(true);
      deleteMovie(data);
    } else {
      setCardIsSaved(false);
      addMovie(data);
    }
  }

  function convertDuration(duration) {
    const minutes = duration % 60;
    const hours = Math.floor(duration / 60);
    return hours === 0
      ? `${minutes}m`
      : minutes === 0
      ? `${hours}ч`
      : `${hours}ч ${minutes}м`;
  }

  // useEffect(() => {
  //   console.log("cardIsSaved", cardIsSaved);
  // }, [cardIsSaved]);

  return (
    <div className="card">
      <div className="card__top-container">
        <h3 className="card__name">{data.nameRU}</h3>
        <p className="card__duration">{convertDuration(data.duration)}</p>
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
        <button
          type="button"
          onClick={() => deleteMovie(data)}
          className="card__delete"
        >
          <img
            src={deleteMovieImage}
            alt="кнопка удаления сохраненного фильма"
          ></img>
        </button>
      ) : cardIsSaved ? (
        <button
          type="button"
          onClick={onClick}
          className="card__saved-button"
        ><img
        src={savedImage}
        alt="розовая кнопка с белой галочкой"
      ></img></button>
      ) : (
        <button type="button" onClick={onClick} className="card__save-button">
          Сохранить
        </button>
      )}
    </div>
  );
}

export default MoviesCard;
