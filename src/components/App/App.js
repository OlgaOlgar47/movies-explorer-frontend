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
import Preloader from "../Preloaders/Preloader";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import useValidation from "../../hooks/useValidation";
import * as MainApi from "../../utils/MainApi";
import InfoTooltip from "../InfoToolTip/InfoToolTip";
import success from "../../images/success.svg";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ServerErrorContext from "../../contexts/ServerErrorContext";
import IsSentContext from "../../contexts/IsSentContext";

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isSuccessEditPopupOpen, setisSuccessEditPopupOpen] = useState(false);
  const [isSuccessRegisterPopupOpen, setSuccessRegisterPopupOpen] =
    useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isCheckToken, setIsCheckToken] = useState(true);
  const { values, setValues, errors, onChange, isValid } = useValidation();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      Promise.all([MainApi.getUserData(token), MainApi.getMovies(token)])
        .then(([userData, moviesData]) => {
          setCurrentUser(userData);
          setSavedMovies(moviesData.reverse());
          setLoggedIn(true);
          setIsCheckToken(false);
        })
        .catch((err) => {
          console.log(err);
          setIsCheckToken(false);
        });
    } else {
      setLoggedIn(false);
      setIsCheckToken(false);
    }
  }, [loggedIn]);

  const openPopupRegisterSuccess = () => {
    setSuccessRegisterPopupOpen("popup_opened");
    setTimeout(() => {
      setSuccessRegisterPopupOpen(false);
    }, 1200);
  };

  const openPopupEditSuccess = () => {
    setisSuccessEditPopupOpen("popup_opened");
    setTimeout(() => {
      setisSuccessEditPopupOpen(false);
    }, 1200);
  };

  const closeAllPopups = () => {
    setSuccessRegisterPopupOpen(false);
    setisSuccessEditPopupOpen(false);
  };

  function onRegister(e) {
    e.preventDefault();
    setIsSent(true);
    MainApi.register(values.name, values.email, values.password)
      .then((res) => {
        openPopupRegisterSuccess();
        MainApi.authorize(values.email, values.password)
          .then((data) => {
            localStorage.setItem("jwt", data.token);
            setValues({ email: "", password: "" });
            setLoggedIn(true);
            navigate("/movies", { replace: true });
          })
          .catch((err) => {
            setServerError("Произошла ошибка при авторизации");
            console.log(err);
          })
          .finally(() => setIsSent(false));
      })
      .catch((err) => {
        setServerError("Произошла ошибка при регистрации");
        console.log(err);
      })
      .finally(() => setIsSent(false));
  }

  function onLogin(e) {
    e.preventDefault();
    setIsSent(true);
    MainApi.authorize(values.email, values.password)
      .then((data) => {
        if (data) {
          localStorage.setItem("jwt", data.token);
          setValues({ email: "", password: "" });
          setLoggedIn(true);
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        setServerError("Неправильный логин или пароль");
        console.log(err);
      })
      .finally(() => setIsSent(false));
  }

  function onLogout() {
    MainApi.logout()
      .then(() => {
        localStorage.clear();
        setLoggedIn(false);
        navigate("/");
      })
      .catch((error) => {
        console.error("Ошибка при выходе из профиля:", error);
      });
  }

  const tokenCheck = useCallback(() => {
    const token = localStorage.getItem("jwt");
    if (token && !loggedIn) {
      MainApi.getUserData(token)
        .then((res) => {
          if (res) {
            setCurrentUser(res);
            setLoggedIn(true);
            isCheckToken(false);
            navigate("/movies", { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [setLoggedIn, navigate, loggedIn, isCheckToken]);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  const showFooter = () => {
    return (
      pathname === "/" || pathname === "/movies" || pathname === "/saved-movies"
    );
  };

  function onEditProfile(data) {
    setIsSent(true);
    MainApi.editUserData(data, localStorage.token)
      .then((res) => {
        setCurrentUser(res);
        openPopupEditSuccess();
        setIsEdit(false);
      })
      .catch((error) => {
        setServerError("Ошибка при редактировании профиля");
        console.log(error);
      })
      .finally(() => setIsSent(false));
  }

  function handleAddMovie(data) {
    const token = localStorage.getItem("jwt");
    MainApi.addMovie(data, token)
      .then((res) => setSavedMovies([res, ...savedMovies]))
      .catch((err) => console.error("Ошибка при нажитии на кнопку", err));
  }

  function handleDeleteMovie(data) {
    const token = localStorage.getItem("jwt");
    let movieToDelete;
    if (pathname === "/movies") {
      movieToDelete = savedMovies.filter((item) => item.movieId === data.id);
    } else {
      movieToDelete = savedMovies.filter(
        (item) => item.movieId === data.movieId
      );
    }
    MainApi.deleteMovie(movieToDelete[0]._id, token)
      .then(() => {
        console.log("savedMovies", savedMovies);
        console.log("data._id", data.id);
        if (pathname === "/movies") {
          setSavedMovies(
            savedMovies.filter((movie) => {
              return movie.movieId !== data.id;
            })
          );
        } else {
          console.log("пришли сюда");

          setSavedMovies(
            savedMovies.filter((movie) => {
              return movie._id !== data._id;
            })
          );
        }
      })
      .catch((err) =>
        console.error("При удалении фильма произошла ошибка", err)
      );
  }

  const ProtectedMovies = () => {
    return (
      <Movies
        isSaved={false}
        savedMovies={savedMovies}
        addMovie={handleAddMovie}
        deleteMovie={handleDeleteMovie}
        setServerError={setServerError}
      />
    );
  };

  const ProtectedSavedMovies = () => {
    return (
      <SavedMovies
        isSaved={true}
        savedMovies={savedMovies}
        deleteMovie={handleDeleteMovie}
        setServerError={setServerError}
      />
    );
  };

  return (
    <>
      {isCheckToken ? (
        <Preloader />
      ) : (
        <CurrentUserContext.Provider value={currentUser}>
          <ServerErrorContext.Provider value={serverError}>
            <IsSentContext.Provider value={isSent}>
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
                        <ProtectedRoute
                          element={ProtectedSavedMovies}
                          loggedIn={loggedIn}
                        />
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <Profile
                          isEdit={isEdit}
                          onLogout={onLogout}
                          setIsEdit={setIsEdit}
                          onEditProfile={onEditProfile}
                          setServerError={setServerError}
                        />
                      }
                    />
                    <Route
                      path="/signup"
                      element={
                        <Register
                          isSent={isSent}
                          values={values}
                          errors={errors}
                          isValid={isValid}
                          onChange={onChange}
                          onRegister={onRegister}
                          setServerError={setServerError}
                        />
                      }
                    />
                    <Route
                      path="/signin"
                      element={
                        <Login
                          isSent={isSent}
                          errors={errors}
                          values={values}
                          isValid={isValid}
                          onLogin={onLogin}
                          onChange={onChange}
                          setServerError={setServerError}
                        />
                      }
                    />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                  {showFooter() && <Footer />}
                  <InfoTooltip
                    name="infotooltip"
                    isOpen={isSuccessRegisterPopupOpen}
                    onClose={closeAllPopups}
                    imagePath={success}
                    title="Вы успешно зарегистрировались!"
                  />
                  <InfoTooltip
                    name="infotooltip"
                    isOpen={isSuccessEditPopupOpen}
                    onClose={closeAllPopups}
                    imagePath={success}
                    title="Редактирование успешно!"
                  />
                </div>
              </div>
            </IsSentContext.Provider>
          </ServerErrorContext.Provider>
        </CurrentUserContext.Provider>
      )}
    </>
  );
}

export default App;
