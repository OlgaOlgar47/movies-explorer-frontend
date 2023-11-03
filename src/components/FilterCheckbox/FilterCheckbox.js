import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ isCheck, toggleCheckbox }) {
  const firstTime = !localStorage.getItem("allMovies");
  return (
    <form className="filter">
      <input
        className="filter__checkbox"
        onChange={toggleCheckbox}
        checked={isCheck}
        disabled={firstTime}
        type="checkbox"
      ></input>
      <span className="filter__name">Короткометражки</span>
    </form>
  );
}

export default FilterCheckbox;