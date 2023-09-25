import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <section className="search-form">
      <form className="search-form__form" id="form">
          <input
            className="search-form__input"
            name="query"
            id="search-form"
            type="text"
            placeholder="Фильм"
            required
          ></input>
        
        <button className="search-form__submit" type="submit">
          Поиск
        </button>
      </form>
      <FilterCheckbox />
      <span className="search-form__error">Введите название фильма</span>
    </section>
  );
}

export default SearchForm;
