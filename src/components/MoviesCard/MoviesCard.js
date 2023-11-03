import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { convertDuration } from "../../utils/ConvertDuration";
import deleteMovieImage from "../../images/delete-movie-button.svg";
import "./MoviesCard.css";

function MoviesCard({ data, isSaved, savedMovies, addMovie, deleteMovie }) {
  const [cardIsSaved, setCardIsSaved] = useState(false);

  useEffect(() => {
    if (!isSaved) {
      setCardIsSaved(savedMovies.some((movie) => data.id === movie.movieId));
    }
  }, [data.id, savedMovies, isSaved]);

  const handleToggleSave = (e) => {
    e.preventDefault();
    if (savedMovies.some((movie) => data.id === movie.movieId)) {
      setCardIsSaved(true);
      deleteMovie(data);
    } else {
      setCardIsSaved(false);
      addMovie(data);
    }
  };

  return (
    <div className="card">
      <div className="card__top-container">
        <h3 className="card__name">{data.nameRU}</h3>
        <p className="card__duration">{convertDuration(data.duration)}</p>
      </div>
      <Link to={data.trailerLink} target="_blank">
        <div
          className={`card__image ${isSaved ? "card__image--saved" : ""}`}
          style={{
            backgroundImage: `url(${
              isSaved
                ? data.image
                : `https://api.nomoreparties.co${data.image.url}`
            })`,
          }}
        />
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
      ) : (
        <button
          type="button"
          onClick={handleToggleSave}
          className={`card__save-button ${
            cardIsSaved ? "card__save-button_saved" : ""
          }`}
        >
          {cardIsSaved ? (
            <span role="img" aria-label="Галочка">
              &#10003;
            </span>
          ) : (
            "Сохранить"
          )}
        </button>
      )}
    </div>
  );
}

export default MoviesCard;
