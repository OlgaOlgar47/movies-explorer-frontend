import React, { useContext, useEffect } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import useValidation from "../../hooks/useValidation";
import { useLocation } from "react-router-dom";
import ServerErrorContext from "../../contexts/ServerErrorContext";

function SearchForm({
  savedMovies,
  searchMovies,
  searchedMovie,
  setServerError,
  isCheck,
  toggleCheckbox
}) {
  const { pathname } = useLocation();
  const { values, onChange, setValues } = useValidation();
  const serverError = useContext(ServerErrorContext);

  useEffect(() => {
    if (pathname === "/saved-movies" && savedMovies.length === 0) {
      setValues({ query: "" });
    } else {
      setValues({ query: searchedMovie });
    }
  }, [pathname, savedMovies, setValues, searchedMovie]);

  function handleSearch(e) {
    e.preventDefault();
    searchMovies(e.target.query.value);
    if (e.target.query.value) {
      setServerError("");
    } else {
      setServerError("Нужно ввести ключевое слово");
    }
  }

  return (
    <div className="search-form">
      <form
        className="search-form__form"
        id="form"
        onSubmit={handleSearch}
        noValidate
      >
        <input
          className="search-form__input"
          name="query"
          id="search-form"
          type="text"
          placeholder="Фильм"
          required
          onChange={(e) => {
            onChange(e);
            setServerError("");
          }}
          value={values.query || ""}
        ></input>
        <button className={`search-form__submit ${savedMovies && (pathname === "/saved-movies" && savedMovies.length === 0) ? "search-form__submit_disabled" : ''}`} type="submit">
          Поиск
        </button>
      </form>
      {serverError && (
        <span className="search-form__error">
          {serverError}
        </span>
      )}
      <FilterCheckbox isCheck={isCheck} toggleCheckbox={toggleCheckbox}/>
    </div>
  );
}

export default SearchForm;
