export const BASE_URL = "https://api.movies-explorerolga.nomoreparties.co";

const getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();

};

// const getResponseData = async (res) => {
//   const data = await res.json();

//   if (!res.ok) {
//     return Promise.reject(`Ошибка: ${data.message}`);
//   }

//   return data;
// };

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then((res) => {
    return getResponseData(res);
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      return getResponseData(res);
    })
};

export const logout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: "POST",
    credentials: "include",
  })
  .then((res) => {
    return getResponseData(res);
  })
}
  

export const getUserData = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return getResponseData(res);
    })
    .then((data) => data);
};

export const editUserData = (values, token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: values.name,
      email: values.email,
    }),
  })
  .then((res) => {
    return getResponseData(res);
  })
  .then((data) => data);
};

export const getMovies = (token) => {
  return fetch(`${BASE_URL}/movies`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  .then((res) => {
    return getResponseData(res);
  })
};

export const addMovie = (data, token) => {
  return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      country: data.country,
      director: data.director,
      duration: data.duration,
      description: data.description,
      year: data.year,
      image: `https://api.nomoreparties.co/${data.image.url}`,
      trailerLink: data.trailerLink,
      thumbnail: `https://api.nomoreparties.co/${data.image.formats.thumbnail.url}`,
      movieId: data.id,
      nameRU: data.nameRU,
      nameEN: data.nameEN,
    }),
  })
  .then((res) => {
    return getResponseData(res);
  })
};

export const deleteMovie = (cardId, token) => {
  return fetch(`${BASE_URL}/movies/${cardId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  })
  .then((res) => {
    return getResponseData(res);
  })
};
