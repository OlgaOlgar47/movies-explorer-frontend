class MoviesApi {
  constructor({ baseURL, headers }) {
    this.baseURL = baseURL;
    this.headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getInitialCards = () => {
    return fetch(this.baseURL, {
      method: "GET",
      headers: this.headers,
      credentials: "include",
    }).then((res) => {
      return this._getResponseData(res);
    });
  };
}

const moviesApi = new MoviesApi({
  baseURL: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-Type": "application/json",
  },
});

export default moviesApi;
