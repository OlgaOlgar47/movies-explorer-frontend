import React, { useEffect, useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import PreloaderBlock from "../Preloaders/PreloaderBlock";
import { classNames } from "../../utils/classNames";
import {
  MAX_SCREEN,
  MEDIUM_SCREEN,
  SMALL_SCREEN,
  INIT_MAX_SCREEN,
  INIT_MEDIUM_SCREEN,
  INIT_SMALL_SCREEN,
  STEP_MAX_SCREEN,
  STEP_MEDIUM_SCREEN,
  STEP_SMALL_SCREEN,
} from "../../utils/constants";

function MoviesCardList({
  isSaved,
  addMovie,
  deleteMovie,
  isLoading,
  beatfilmsFailed,
  filteredMovies,
  savedMovies,
}) {
  const [count, setCount] = useState(INIT_MAX_SCREEN);
  const moviesToShow = filteredMovies.slice(0, count);
  const firstTime = !localStorage.getItem("allMovies");

  function counterCards() {
    const counter = { init: INIT_MAX_SCREEN, step: STEP_MAX_SCREEN };
    if (window.innerWidth < MAX_SCREEN) {
      counter.init = INIT_MAX_SCREEN;
      counter.step = STEP_MEDIUM_SCREEN;
    }
    if (window.innerWidth < MEDIUM_SCREEN) {
      counter.init = INIT_MEDIUM_SCREEN;
      counter.step = STEP_SMALL_SCREEN;
    }
    if (window.innerWidth < SMALL_SCREEN) {
      counter.init = INIT_SMALL_SCREEN;
      counter.step = STEP_SMALL_SCREEN;
    }
    return counter;
  }

  function clickMoreButton() {
    setCount(count + counterCards().step);
  }

  useEffect(() => {
    if (!isSaved) {
      function counterCardsForResize() {
        setCount(counterCards().init);
      }
      window.addEventListener("resize", counterCardsForResize);
      return () => {
        window.removeEventListener("resize", counterCardsForResize);
      };
    }
  }, [isSaved]);

  function MoviesCardListContent() {
    const movieList =
      isSaved && filteredMovies.length !== 0 ? filteredMovies : moviesToShow;

    if (isLoading) {
      return <PreloaderBlock />;
    }
    if (firstTime) {
      return (
        <p className="cards__no-saved-movies">
          «Чтобы увидеть список фильмов выполните поиск»
        </p>
      );
    }

    if (beatfilmsFailed) {
      return (
        <p className="cards__no-saved-movies">
          «Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз»"
        </p>
      );
    }
    if (isSaved && filteredMovies.length === 0) {
      return (
        <p className="cards__no-saved-movies">«Нет сохраненных фильмов»</p>
      );
    }

    if (!firstTime && filteredMovies.length === 0) {
      return <p className="cards__no-saved-movies">«Ничего не найдено»</p>;
    }

    return movieList.map((item) => (
      <li className="cards__item" key={!isSaved ? item.id : item._id}>
        <MoviesCard
          data={item}
          isSaved={isSaved}
          savedMovies={savedMovies}
          addMovie={isSaved ? undefined : addMovie}
          deleteMovie={deleteMovie}
        />
      </li>
    ));
  }

  return (
    <section
      className={classNames({
        cards: true,
        cards_isSaved: isSaved,
        centered: moviesToShow.length === 0 || isLoading,
      })}
    >
      <ul className="cards__list">
        <MoviesCardListContent />
      </ul>
      {isSaved ? null : (
        <button
          type="button"
          onClick={clickMoreButton}
          className={`cards__button-more ${
            count >= filteredMovies.length && "cards__button-more_hidden"
          }`}
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
