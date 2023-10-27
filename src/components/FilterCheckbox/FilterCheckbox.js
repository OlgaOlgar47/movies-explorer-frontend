import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ isCheck, toggleCheckbox, isFirstEnterance }) {
  return (
    <form className="filter">
      <input
        className="filter__checkbox"
        onChange={toggleCheckbox}
        checked={isCheck}
        disabled={isFirstEnterance}
        type="checkbox"
      ></input>
      <span className="filter__name">Короткометражки</span>
    </form>
  );
}

export default FilterCheckbox;