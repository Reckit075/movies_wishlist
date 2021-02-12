const apikey = "af069944";
const FETURED_API = 'http://www.omdbapi.com/?apikey='+apikey
const searchMovieApi = (movieTitle) => {
  const url = FETURED_API + "&t=" + movieTitle;
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
export default searchMovieApi;
