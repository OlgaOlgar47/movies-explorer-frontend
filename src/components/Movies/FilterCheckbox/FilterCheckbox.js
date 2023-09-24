import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ onFilter, isShortMovies }) {
  return (
    <form className="filter">
      <input
        className="filter__checkbox"
        onChange={onFilter}
        checked={isShortMovies}
        type="checkbox"
      ></input>
      <span className="filter__name">Короткометражки</span>
    </form>
  );
}

export default FilterCheckbox;