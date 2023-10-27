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
  isFirstEnterance,
  toggleCheckbox
}) {
  console.log('первый раз', isFirstEnterance)
  const { pathname } = useLocation();
  const { values, onChange, setValues } = useValidation();
  const serverError = useContext(ServerErrorContext);

  useEffect(() => {
    if (pathname === "/saved-movies" && savedMovies.length === 0) {
      setValues({ query: "" });
    } else {
      console.log('вот');
      setValues({ query: searchedMovie });
    }
  }, [pathname, savedMovies, setValues, searchedMovie, setServerError]);

  function handleSearch(e) {
    e.preventDefault();
    if (e.target.query.value) {
      searchMovies(e.target.query.value);
      setServerError("");
    } else {
      setServerError("Необходимо ввести название фильма");
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
        <button className="search-form__submit" type="submit">
          Поиск
        </button>
      </form>
      {serverError && (
        <span className="search-form__error">
          {serverError}
        </span>
      )}
      <FilterCheckbox isCheck={isCheck} toggleCheckbox={toggleCheckbox} isFirstEnterance={isFirstEnterance}/>
    </div>
  );
}

export default SearchForm;
