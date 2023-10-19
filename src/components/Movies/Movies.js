import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";

function Movies({ searchData, onSearch }) {
  return (
    <main className="movies">
      <SearchForm onSearch={onSearch}/>
      <MoviesCardList searchData={searchData} />
    </main>
  );
}

export default Movies;
