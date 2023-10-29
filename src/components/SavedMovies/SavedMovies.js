import React, { useCallback, useEffect, useState } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ savedMovies, setServerError, deleteMovie }) {
  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  const [searchedMovie, setSearchedMovie] = useState("");
  const [isFirstEnterance, setIsFirstEnterance] = useState(true);
  const [isCheck, setIsCheck] = useState(false);

  const filter = useCallback((query, isCheck, movies) => {
    setSearchedMovie(query);
    setFilteredMovies(
      movies.filter((movie) => {
        const searchName = movie.nameRU
          .toLowerCase()
          .includes(query.toLowerCase());
        return isCheck ? searchName && movie.duration <= 40 : searchName;
      })
    );
  }, []);

  function searchOnSavedMovies(query) {
    setIsFirstEnterance(false);
    filter(query, isCheck, savedMovies);
  }

  useEffect(() => {
    if (savedMovies.length === 0) {
      setIsFirstEnterance(true);
    } else {
      setIsFirstEnterance(false);
    }
    filter(searchedMovie, isCheck, savedMovies);
  }, [searchedMovie, isCheck, savedMovies, filter]);

  function toggleCheckbox() {
    if (isCheck) {
      setIsCheck(false);
      setIsFirstEnterance(false);
      filter(searchedMovie, false, savedMovies);
    } else {
      setIsCheck(true);
      setIsFirstEnterance(false);
      filter(searchedMovie, true, savedMovies);
    }
  }

  useEffect(() => {
    console.log("moviesToShow", filteredMovies);
    console.log("savedMovies", savedMovies);
  }, [savedMovies, filteredMovies]);

  return (
    <main className="movies">
      <SearchForm
        toggleCheckbox={toggleCheckbox}
        searchMovies={searchOnSavedMovies}
        searchedMovie={searchedMovie}
        savedMovies={savedMovies}
        setServerError={setServerError}
        isCheck={isCheck}
        isFirstEnterance={isFirstEnterance}
      />
      <MoviesCardList
        savedMovies={savedMovies}
        isSaved={true}
        filteredMovies={filteredMovies}
        deleteMovie={deleteMovie}
        isFirstEnterance={isFirstEnterance}
      />
    </main>
  );
}

export default SavedMovies;
