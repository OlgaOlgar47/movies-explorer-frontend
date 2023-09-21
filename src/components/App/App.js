import React from 'react';
import './App.css';
import Header from '../Header/Header.js';
import Promo from '../Promo/Promo';


function App() {
  return (
    <div className="page">
      <div className='page__content'>
        <Header />
        <Promo />
      </div>
    </div>
  );
}

export default App;
 
