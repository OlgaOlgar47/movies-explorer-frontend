import React from "react";
import './NotFoundPage.css';
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
 const navigate = useNavigate();
 const goBack = () => navigate(-1);

  return (
    <div className="not-found-page">
      <div className="not-found-page__error-status">404</div>
      <p className="not-found-page__text">Страница не найдена</p>
      <button className="not-found-page__go-back-button" onClick={goBack}>Назад</button>
    </div>
  );
}

export default NotFoundPage;