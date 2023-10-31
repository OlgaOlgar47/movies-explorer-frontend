import React from 'react';
import './PreloaderButton.css';

const PreloaderButton = () => {
    return (
        <div className="preloader-button">
          <div className="preloader__container">
            <span className="preloader__round"></span>
          </div>
        </div>
    );
};

export default PreloaderButton;

