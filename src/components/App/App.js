import { React, useState, useEffect, useCallback } from "react";
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
import * as MainApi from "../../utils/MainApi";
import InfoTooltip from "../InfoToolTip/InfoToolTip";
import success from "../../images/success.svg";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { values, setValues, errors, onChange, isValid } = useValidation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccessPopupOpen, setSuccessPopupOpen] = useState(false);

  const openPopupInfoSuccess = () => {
    setSuccessPopupOpen("popup_opened");
    setTimeout(() => {
      setSuccessPopupOpen(false);
    }, 1500);
  };

  const closeAllPopups = () => {
    setSuccessPopupOpen(false);
  };

  const onRegister = (e) => {
    e.preventDefault();
    MainApi.register(values.email, values.password, values.name)
      .then((res) => {
        openPopupInfoSuccess();
        return MainApi.authorize(values.email, values.password);
      })
      .then((data) => {
        console.log("hura");
        if (data) {
          setValues({ email: "", password: "" });
          setLoggedIn(true);
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(loggedIn); // Этот код выполняется после изменения loggedIn
  }, [loggedIn]);

  const onLogin = (e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    MainApi.authorize(values.email, values.password)
      .then((data) => {
        if (data) {
          console.log("Received token:", data.token);
          setValues({ email: "", password: "" });
          setLoggedIn(true);
          console.log(loggedIn);
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const tokenCheck = useCallback(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      console.log("Stored token:", token);
      if (token) {
        MainApi.getContent(token)
          .then((res) => {
            if (res) {
              setLoggedIn(true);
              navigate("/movies", { replace: true });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [setLoggedIn, navigate]);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

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
              <ProtectedRoute
                element={Movies}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={SavedMovies}
                loggedIn={loggedIn}
              />
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
                isValid={isValid}
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
                isValid={isValid}
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
      </div>
    </div>
  );
}

export default App;
