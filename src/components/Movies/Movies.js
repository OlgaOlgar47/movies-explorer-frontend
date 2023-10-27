import React, { useCallback, useContext, useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";
import moviesApi from "../../utils/MoviesApi";
import ServerErrorContext from "../../contexts/ServerErrorContext";
import { shortsDuration } from "../../utils/constants";

function Movies({ setServerError, addMovie, savedMovies }) {
  const serverError = useContext(ServerErrorContext);
  const [isCheck, setIsCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchedMovie, setSearchedMovie] = useState("");
  const [isFirstEnterance, setIsFirstEnterance] = useState(true);

  const filter = useCallback((query, isCheck, movies) => {
    localStorage.setItem("query", JSON.stringify(query));
    localStorage.setItem("shorts", JSON.stringify(isCheck));
    localStorage.setItem("allMovies", JSON.stringify(movies));

    setSearchedMovie(query);
    const filtered = movies.filter((movie) => {
      const searchName = movie.nameRU
        ?.toLowerCase()
        .includes(query.toLowerCase());
      return isCheck
        ? searchName && movie.duration <= shortsDuration
        : searchName;
    });
    setFilteredMovies(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function searchMovies(query) {
    if (allMovies.length === 0) {
      setIsLoading(true);
      moviesApi
        .getInitialMovies()
        .then((res) => {
          setAllMovies(res);
          setIsCheck(false);
          setIsFirstEnterance(false);
          setServerError("");
          filter(query, isCheck, res);
        })
        .catch((err) => {
          setServerError(
            "«Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз»"
          );
          console.error("Произошла ошибка на сервере: ", err);
        })
        .finally(() => setIsLoading(false));
    } else {
      filter(query, isCheck, allMovies);
    }
  }

  useEffect(() => {
    if (localStorage.query && localStorage.shorts && localStorage.allMovies) {
      const query = JSON.parse(localStorage.query);
      const isCheck = JSON.parse(localStorage.shorts);
      const movies = JSON.parse(localStorage.allMovies);
      setSearchedMovie(query);
      setIsFirstEnterance(false);
      setServerError("");
      setIsCheck(isCheck);
      setAllMovies(movies);
      filter(query, isCheck, movies);
    }
  }, [filter, setServerError]);

  function toggleCheckbox() {
    if (isCheck) {
      setIsCheck(false);
      filter(searchedMovie, false, allMovies);
    } else {
      setIsCheck(true);
      filter(searchedMovie, true, allMovies);
    }
  }

  return (
    <main className="movies">
      <SearchForm
        savedMovies={savedMovies}
        searchMovies={searchMovies}
        searchedMovie={searchedMovie}
        setServerError={setServerError}
        isCheck={isCheck}
        toggleCheckbox={toggleCheckbox}
        isFirstEnterance={isFirstEnterance}
      />
      <MoviesCardList
        addMovie={addMovie}
        isLoading={isLoading}
        filteredMovies={filteredMovies}
        savedMovies={savedMovies}
        isSaved={false}
        serverError={serverError}
        isFirstEnterance={isFirstEnterance}
      />
    </main>
  );
}

export default Movies;
