const apikey = "af069944";
const FETURED_API = "https://www.omdbapi.com/?apikey=" + apikey;

export const getMovieByTitle = (title) => {
  const url = `${FETURED_API}&s=${title}`;
  return apiGet(url)
};

export const getMoviesPage = (searchString, page) => {
  const url = `${FETURED_API}&s=${searchString}&page=${page}`;
  return apiGet(url)
};

export const getMovieById = (imdbID) => {
  const url = `${FETURED_API}&i=${imdbID}`;
  return apiGet(url)
};

export const getMoviesToWishList = async (moviesArrR) => {
  const request = moviesArrR.map((movie) => {
    return getMovieById(movie).then((movieResponse) => {
      return movieResponse;
    });
  });
  return Promise.all(request);
};

export const apiGet = (url) => {
  return fetch(url, {
    method: "GET",
  })
    .then((res) => {
      if (res.ok)
        return res.json();
      else
        throw new Error("request error: " + res.status)
    })
}
