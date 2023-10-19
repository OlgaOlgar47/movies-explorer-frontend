import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
// import image1 from "../../images/image1.png";
// import image2 from "../../images/image2.png";
// import image3 from "../../images/image3.png";

function MoviesCardList({ isSaved, searchData }) {
  if (!searchData) {
    return null;
  }

  return (
    <section className={isSaved ? "cards cards_isSaved" : "cards"}>
      <ul className="cards__list">
        {searchData.map((card) => {
          return (
            <li className="cards__item">
              <MoviesCard
                key={card._id}
                name={card.nameRU}
                duration={card.duration}
                image={card.image}
                isSaved={isSaved}
              />
            </li>
          );
        })}
      </ul>
      {isSaved ? (
        ""
      ) : (
        <button type="button" className="cards__button-more">
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
