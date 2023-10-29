import React, { useEffect, useState } from "react";
import "./MoviesCardList.css";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
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
  isfirstEnterance,
  isSaved,
  addMovie,
  deleteMovie,
  isLoading,
  beatfilmsFailed,
  filteredMovies,
  savedMovies,
}) {
  const { pathname } = useLocation();
  const [count, setCount] = useState(counterCards().init);
  // const [showMore, setShowMore] = useState(false);
  const moviesToShow = filteredMovies.slice(0, count);

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
    // setShowMore(true);
  }

  useEffect(() => {
    if (!isSaved) {
      setCount(counterCards().init);
      function counterCardsForResize() {
        if (window.innerWidth >= stepMaxScreen) {
          setCount(counterCards().init);
        }
        if (window.innerWidth < stepMaxScreen) {
          setCount(counterCards().init);
        }
        if (window.innerWidth < mediumScreen) {
          setCount(counterCards().init);
        }
        if (window.innerWidth < smallScreen) {
          setCount(counterCards().init);
        }
      }

      window.addEventListener("resize", counterCardsForResize);

      return () => {
        window.removeEventListener("resize", counterCardsForResize);
      };
    }
  }, [isSaved]);

  const cards = document.querySelector(".cards");
  if (moviesToShow.length < 3) {
    cards?.classList.add("centered");
  } else {
    cards?.classList.remove("centered");
  }

  return (
    <section className={isSaved ? "cards cards_isSaved" : "cards"}>
      <ul className="cards__list">
        {isLoading ? (
          <Preloader />
        ) : (pathname === "/movies") && moviesToShow.length !== 0 ? (
          moviesToShow.map((card) => (
            <li className="cards__item" key={card.id}>
              {/* <li className={`cards__item ${showMore ? 'cards__item_show' : ''}`} key={card.id}></li> */}
              <MoviesCard
                data={card}
                isSaved={isSaved}
                savedMovies={savedMovies}
                addMovie={addMovie}
                deleteMovie={deleteMovie}
              />
            </li>
          ))
        ) : (pathname === "/saved-movies") && filteredMovies.length !== 0 ? (
          filteredMovies.map((card) => (
            <li className="cards__item" key={card._id}>
              <MoviesCard
                data={card}
                isSaved={isSaved}
                deleteMovie={deleteMovie}
                savedMovies={savedMovies}
              />
            </li>
          ))
        ) : beatfilmsFailed ? (
          <span className="cards__no-saved-movies">
            «Во время запроса произошла ошибка. Возможно, проблема с соединением
            или сервер недоступен. Подождите немного и попробуйте ещё раз»"
          </span>
        ) : (pathname === "/saved-movies") && filteredMovies.length === 0 ? (
          <span className="cards__no-saved-movies">
            «Нет сохраненных фильмов»
          </span>
        ) : !isfirstEnterance ? (
          <span className="cards__no-saved-movies">
            «Ничего не найдено»
          </span>
        ) : (
          <span className="cards__no-saved-movies">
            «Чтобы увидеть список фильмов выполните поиск»
          </span>
        )}
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
