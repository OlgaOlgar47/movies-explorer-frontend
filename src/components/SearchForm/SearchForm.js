import React, { useState } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSearch = (e) => {
    console.log('сабмит формы')
    e.preventDefault();

    if (query.trim() === "") {
      setError("Нужно ввести ключевое слово");
    } else {
      setError("");
      onSearch(query);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Очищаем ошибку, если поле не пустое
    if (value.trim() !== '') {
      setError('');
    }
  };

  return (
    <div className="search-form">
      <form className="search-form__form" id="form" onSubmit={handleSearch} noValidate>
        <input
          className="search-form__input"
          name="query"
          id="search-form"
          type="text"
          placeholder="Фильм"
          required
          onChange={handleInputChange}
        ></input>
        <button className="search-form__submit" type="submit">
          Поиск
        </button>
      </form>
      <FilterCheckbox />
      {error && <span className="search-form__error">{error}</span>}
    </div>
  );
}

export default SearchForm;
