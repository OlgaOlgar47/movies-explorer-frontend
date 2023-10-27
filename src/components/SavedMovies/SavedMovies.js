import React, { useCallback, useEffect, useState } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ savedMovies, setIsError }) {
  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  const [searchedMovie, setSearchedMovie] = useState("");
  const [isCheck, setIsCheck] = useState(false);

  const filter = useCallback((query, isCheck, movies) => {
    setSearchedMovie(query);
    setFilteredMovies(
      movies.filter((movie) => {
        const searchName = movie.nameRu
          .toLowerCase()
          .includes(query.toLowerCase());
        return isCheck ? searchName && movie.duration <= 40 : searchName;
      })
    );
  }, []);

  function searchOnSavedMovies(query) {
    filter(query, isCheck, savedMovies);
  }

  useEffect(() => {
    filter(searchedMovie, isCheck, savedMovies)
  },[searchedMovie, isCheck, savedMovies, filter])

  function toggleCheckbox() {
    if (isCheck) {
      setIsCheck(false);
      filter(searchedMovie, false, savedMovies);
    } else {
      setIsCheck(true);
      filter(searchedMovie, true, savedMovies);
    }
  }

  return (
    <main className="movies">
      <SearchForm
        toggleCheckbox={toggleCheckbox}
        searchMovies={searchOnSavedMovies}
        searchedMovie={searchedMovie}
        savedMovies={savedMovies}
        setIsError={setIsError}
        isCheck={isCheck}
      />
      <MoviesCardList isSaved={true} filteredMovies={filteredMovies} />
    </main>
  );
}

export default SavedMovies;
