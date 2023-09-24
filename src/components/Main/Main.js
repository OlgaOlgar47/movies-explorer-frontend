import React from "react";
import AboutMe from "./AboutMe/AboutMe";
import Promo from "./Promo/Promo";
import Techs from "./Techs/Techs";
import AboutProject from "./AboutProject/AboutProject";
import Portfolio from "./Portfolio/Portfolio";

function Main() {
  return (
    <main>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  )
}

export default Main;
