import React from 'react';
import './App.css';
import Header from '../Header/Header.js';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';


function App() {
  return (
    <div className="page">
      <div className='page__content'>
        <Header />
        <Promo />
        <AboutProject />
      </div>
    </div>
  );
}

export default App;
 
