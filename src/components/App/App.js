import { React, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header.js";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import useValidation from "../../hooks/useValidation";
import * as Auth from "../Auth/Auth";
import InfoTooltip from "../InfoToolTip/InfoToolTip";
import fail from "../../images/fail.svg";
import success from "../../images/success.svg";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { values, setValues, errors, onChange } = useValidation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccessPopupOpen, setSuccessPopupOpen] = useState(false);
  const [isFailPopupOpen, setFailPopupOpen] = useState(false);

  const openPopupInfoSucces = () => {
    setSuccessPopupOpen("popup_opened");
  };

  const openPopupInfoFail = () => {
    setFailPopupOpen("popup__opened");
  };

  const closeAllPopups = () => {
    setSuccessPopupOpen(false);
    setFailPopupOpen(false);
  };

  const onRegister = (e) => {
    e.preventDefault();
    Auth.register(values.email, values.password, values.name)
      .then((res) => {
        console.log('зарегились...')
        openPopupInfoSucces();
        console.log('теперь пора..')
        navigate("/movies", { replace: true });
        console.log('ну и как')
      })
      .catch((err) => {
        openPopupInfoFail();
        console.log(err);
      });
  };

  const onLogin = (e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    Auth.authorize(values.email, values.password)
      .then((data) => {
        if (data) {
          setValues({ email: "", password: "" });
          handleLogin();
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        openPopupInfoFail();
        console.log(err);
      });
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const showHeader = () => {
    const { pathname } = location;
    return (
      pathname === "/" ||
      pathname === "/movies" ||
      pathname === "/saved-movies" ||
      pathname === "/profile"
    );
  };

  const showFooter = () => {
    const { pathname } = location;
    return (
      pathname === "/" || pathname === "/movies" || pathname === "/saved-movies"
    );
  };

  return (
    <div className="page">
      <div className="page__content">
        {showHeader() && <Header />}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute element={<Movies loggedIn={loggedIn} />} />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute element={<SavedMovies loggedIn={loggedIn} />} />
            }
          />
          <Route
            path="/profile"
            element={<Profile name="Виталий" email="pochta@yandex.ru" />}
          />
          <Route
            path="/signup"
            element={
              <Register
                onRegister={onRegister}
                values={values}
                errors={errors}
                onChange={onChange}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                onLogin={onLogin}
                errors={errors}
                values={values}
                onChange={onChange}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {showFooter() && <Footer />}
        <InfoTooltip
          name="infotooltip"
          isOpen={isSuccessPopupOpen}
          onClose={closeAllPopups}
          imagePath={success}
          title="Вы успешно зарегистрировались!"
        />
        <InfoTooltip
          name="infotooltip"
          isOpen={isFailPopupOpen}
          onClose={closeAllPopups}
          imagePath={fail}
          title="Что-то пошло не так!
             Попробуйте ещё раз."
        />
      </div>
    </div>
  );
}

export default App;
