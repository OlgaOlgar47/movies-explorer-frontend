import React from "react";
import './NotFoundPage.css';
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
 const navigate = useNavigate();
 const goBack = () => navigate(-1);

  return (
    <main>
    <section className="not-found-page">
      <h1 className="not-found-page__error-status">404</h1>
      <p className="not-found-page__text">Страница не найдена</p>
      <button type="button" className="not-found-page__go-back-button" onClick={goBack}>Назад</button>
      </section>
    </main>
  );
}

export default NotFoundPage;