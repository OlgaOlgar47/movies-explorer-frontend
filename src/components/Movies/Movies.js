import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import './Movies.css';

function Movies() {
  return (
    <section Movies className="movies">
    <SearchForm />
    <MoviesCardList />  
    </section>
  )
}

export default Movies;