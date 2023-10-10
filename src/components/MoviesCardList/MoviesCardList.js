import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import image1 from "../../images/image1.png";
import image2 from "../../images/image2.png";
import image3 from "../../images/image3.png";

function MoviesCardList({ isSaved }) {
  return (
    <section className={isSaved ? "cards cards_isSaved" : "cards"}>
      <ul className="cards__list">
        <li className="cards__item"><MoviesCard
          name="В погоне за Бенкси"
          duration="0ч 42м"
          image={image1}
          isSaved={isSaved}
        /></li>
       <li className="cards__item"> <MoviesCard
          name="В погоне за Бенкси"
          duration="0ч 42м"
          image={image2}
          isSaved={isSaved}
        /></li>
        <li className="cards__item"><MoviesCard
          name="В погоне за Бенкси"
          duration="0ч 42м"
          image={image3}
          isSaved={isSaved}
        /></li>
      </ul>
      {isSaved ? "" : <button type="button" className="cards__button-more">Ещё</button>}
    </section>
  );
}

export default MoviesCardList;
