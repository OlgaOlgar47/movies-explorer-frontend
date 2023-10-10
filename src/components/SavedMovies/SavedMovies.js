import React from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies() {
  return (
  <main className="movies">
   <SearchForm />
   <MoviesCardList isSaved/>
  </main>
  )
}

export default SavedMovies;
