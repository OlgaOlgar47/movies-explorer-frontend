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
import Preloader from "../Preloader/Preloader";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import useValidation from "../../hooks/useValidation";
import * as MainApi from "../../utils/MainApi";
import InfoTooltip from "../InfoToolTip/InfoToolTip";
import success from "../../images/success.svg";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  //   const [savedMovies, setSavedMovies] = useState([]);
  const [isError, setIsError] = useState(false);
  const [serverError, setServerError] = useState("");
  //   const [isEditedSuccessfull, setisEditedSuccessfull]
  //  = useState(false);
  const [isSuccessPopupOpen, setSuccessPopupOpen] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const [isCheckToken, setIsCheckToken] = useState(false);
  const { values, setValues, errors, onChange, isValid, setIsValid } =
    useValidation();

  useEffect(() => {
    if (localStorage.token) {
      Promise.all([
        MainApi.getUserData(localStorage.token),
        MainApi.getMovies(localStorage.token),
      ])
        .then(([userData, moviesData]) => {
          setCurrentUser(userData);
          setLoggedIn(true);
          setIsCheckToken(false);
        })
        .catch((err) => {
          console.log(err);
          setIsCheckToken(false);
          localStorage.clear();
        });
    } else {
      setLoggedIn(false);
      setIsCheckToken(false);
      localStorage.clear();
    }
  }, [loggedIn]);

  const openPopupInfoSuccess = () => {
    setSuccessPopupOpen("popup_opened");
    setTimeout(() => {
      setSuccessPopupOpen(false);
    }, 1500);
  };

  const closeAllPopups = () => {
    setSuccessPopupOpen(false);
  };

  function onRegister(e) {
    e.preventDefault();
    MainApi.register(values.name, values.email, values.password)
      .then((res) => {
        openPopupInfoSuccess();
        setCurrentUser(res);
        return MainApi.authorize(values.email, values.password);
      })
      .then((data) => {
        if (data) {
          window.scrollTo(0, 0);
        }
      })
      .catch((err) => {
        setIsError(true);
        setServerError("Произошла ошибка при авторизации");
        console.log(err);
      });
  }

  useEffect(() => {
    console.log(loggedIn); // Этот код выполняется после изменения loggedIn
  }, [loggedIn]);

  function onLogin(e) {
    e.preventDefault();
    setIsSent(true);
    MainApi.authorize(values.email, values.password)
      .then((data) => {
        if (data) {
          localStorage.setItem("token", data.token);
          console.log("Received token:", data.token);
          setValues({ email: "", password: "" });
          setLoggedIn(true);
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        setIsError(true);
        setServerError("Неправильный логин или пароль");
        console.log(err);
      })
      .finally(() => setIsSent(false));
  }

  function onLogout() {
    localStorage.clear();
    setLoggedIn(false);
    navigate("/");
  }

  const tokenCheck = useCallback(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      console.log("Stored token:", token);
      if (token && !loggedIn) {
        MainApi.getUserData(token)
          .then((res) => {
            if (res) {
              setCurrentUser(res);
              setLoggedIn(true);
              setIsCheckToken(false)
              navigate("/movies", { replace: true });
            }
          })
          .catch((err) => {
            setIsCheckToken(false)
            console.log(err);
          });
      }
    }
  }, [setLoggedIn, navigate, loggedIn]);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  const showFooter = () => {
    const { pathname } = location;
    return (
      pathname === "/" || pathname === "/movies" || pathname === "/saved-movies"
    );
  };

  function onSearch() {}

  function onEditProfile(data) {
    MainApi.editUserData(data, localStorage.token)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((error) => {
        setServerError("Ошибка при редактировании профиля");
        console.log(error);
      });
  }

  const ProtectedMovies = () => {
    return <Movies onSearch={onSearch} searchData={searchData} />;
  };

  return (
    <>
      {isCheckToken ? (
        <Preloader />
      ) : (
        <CurrentUserContext.Provider value={currentUser}>
          <div className="page">
            <div className="page__content">
              <Header loggedIn={loggedIn} />
              <Routes>
                <Route path="/" element={<Main />} />
                <Route
                  path="/movies"
                  element={
                    <ProtectedRoute
                      element={ProtectedMovies}
                      loggedIn={loggedIn}
                    />
                  }
                />
                <Route
                  path="/saved-movies"
                  element={
                    <ProtectedRoute element={SavedMovies} loggedIn={loggedIn} />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <Profile
                      isEdit={false}
                      onEditProfile={onEditProfile}
                      onLogout={onLogout}
                      serverError={serverError}
                    />
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <Register
                      onRegister={onRegister}
                      values={values}
                      errors={errors}
                      setIsError={setIsError}
                      serverError={serverError}
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
                      setIsError={setIsError}
                      serverError={serverError}
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
        </CurrentUserContext.Provider>
      )}
    </>
  );
}

export default App;
