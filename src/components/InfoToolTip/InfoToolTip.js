import React from "react";
import './InfoToolTip.css';

function InfoTooltip(props) {
  const { name, isOpen, onClose, imagePath, title } = props;
  return (
    <div className={`popup  ${isOpen ? "popup_opened" : ""}`}>
      <div className={`popup__container popup__container_type_${name}`}>
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="popup__authorization__infotooltip-image"
          alt={name}
          src={imagePath}
        ></img>
        <h2 className="popup__title popup__title_type_success">{title}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;