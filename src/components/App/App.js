import React from 'react';
import './App.css';
import Header from '../Header/Header.js';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';


function App() {
  return (
    <div className="page">
      <div className='page__content'>
        <Header />
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
        <Footer />
      </div>
    </div>
  );
}

export default App;
 
