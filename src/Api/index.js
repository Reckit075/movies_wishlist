const apikey = "af069944";
const FETURED_API = "http://www.omdbapi.com/?apikey=" + apikey;

export const searchMovies = async (searchString) => {
  const movies = [];
  let data = await getMoviesPage(searchString, 1);
  if (data.Response == "True") {
    movies.push(...data.Search);
    const numOfPages = Math.ceil(data.totalResults / 10);
    for (let page = 2; page <= numOfPages; page++) {
      data = await getMoviesPage(searchString, page);
      movies.push(...data.Search);
    }
  }
  return movies;
};

export const getMovieByTitle = (title) => {
  const url = `${FETURED_API}&s=${title}`;
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          reject({ message: "error" });
        }
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject({ message: error.toString() });
      });
  });
};

export const getMoviesPage = (searchString, page) => {
  const url = `${FETURED_API}&s=${searchString}&page=${page}`;
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          reject({ message: "error" });
        }
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject({ message: error.toString() });
      });
  });
};
export const getMoviesById = (imdbID) => {
  const movies = [];
  const url = `${FETURED_API}&i=${imdbID}`;
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          reject({ message: "error" });
        }
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject({ message: error.toString() });
      });
  });
};
export const getMoviesToWishList = async (moviesArrR) => {
  let moviesArr = moviesArrR
  const request = moviesArr.map((oneMovie)=>{
    return getMoviesById(oneMovie)
    .then((a)=>{
      return a
    })
  })
   return Promise.all(request)
};
