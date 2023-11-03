import React from 'react';
import './PreloaderButton.css';

const PreloaderButton = () => {
    return (
        <div className="preloader-button">
          <div className="preloader__container-button">
            <span className="preloader__round-button"></span>
          </div>
        </div>
    );
};

export default PreloaderButton;
