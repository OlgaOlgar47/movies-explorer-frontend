import React, { useEffect, useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import PreloaderButton from "../Preloaders/PreloaderButton";
import { classNames } from "../../utils/className";
import {
  MaxScreen,
  mediumScreen,
  smallScreen,
  initMaxScreeen,
  initMediumScreeen,
  initSmallScreeen,
  stepMaxScreen,
  stepMediumScreen,
  stepSmallScreen,
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
  const [count, setCount] = useState(counterCards().init);
  const moviesToShow = filteredMovies.slice(0, count);
  const firstTime = !localStorage.getItem("allMovies");

  function counterCards() {
    const counter = { init: initMaxScreeen, step: stepMaxScreen };
    if (window.innerWidth < MaxScreen) {
      counter.init = initMaxScreeen;
      counter.step = stepMediumScreen;
    }
    if (window.innerWidth < mediumScreen) {
      counter.init = initMediumScreeen;
      counter.step = stepSmallScreen;
    }
    if (window.innerWidth < smallScreen) {
      counter.init = initSmallScreeen;
      counter.step = stepSmallScreen;
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
    const movieList = (isSaved && filteredMovies.length !== 0) ? filteredMovies : moviesToShow;

    if (isLoading) {
      return <PreloaderButton />;
    }
    if (firstTime) {
      return (
        <div className="cards__no-saved-movies">
          «Чтобы увидеть список фильмов выполните поиск»
        </div>
      );
    }

    if (beatfilmsFailed) {
      return (
        <div className="cards__no-saved-movies">
          «Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз»"
        </div>
      );
    }
    if (isSaved && filteredMovies.length === 0) {
      return (
        <div className="cards__no-saved-movies">«Нет сохраненных фильмов»</div>
      );
    }

    if (!firstTime && filteredMovies.length === 0) {
      return <div className="cards__no-saved-movies">«Ничего не найдено»</div>;
    }

    return  movieList.map((item) => (
      <li className="cards__item" key={!isSaved ? item.id : item._id}>
        <MoviesCard
          data={item}
          isSaved={isSaved}
          savedMovies={savedMovies}
          addMovie={isSaved ? undefined : addMovie }
          deleteMovie={deleteMovie}
        />
      </li>
    ))
  }

  return (
    <section className={classNames({
      'cards': true,
      'cards_isSaved': isSaved,
      'centered': moviesToShow.length === 0 || isLoading,
    })}>
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
