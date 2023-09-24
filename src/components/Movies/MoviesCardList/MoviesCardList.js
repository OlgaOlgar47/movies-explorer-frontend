import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import image1 from "../../../images/image1.png";
import image2 from "../../../images/image2.png";
import image3 from "../../../images/image3.png";

function MoviesCardList() {
  return (
    <section className="cards">
      <div className="cards__list">
        <MoviesCard
          name="В погоне за Бенкси"
          duration="0ч 42м"
          image={image1}
        />
        <MoviesCard
          name="В погоне за Бенкси"
          duration="0ч 42м"
          image={image2}
        />
        <MoviesCard
          name="В погоне за Бенкси"
          duration="0ч 42м"
          image={image3}
        />
      </div>
      <button className="cards__button-more">Ещё</button>
    </section>
  );
}

export default MoviesCardList;
