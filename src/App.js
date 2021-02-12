import React, { useEffect, useState } from "react";
import "./App.css";
import Movie from "./components/Movie";
import searchMovieApi from "./Api/index";

const App = function App() {
  const [state, setState] = useState({
    movieTitle: "",
    loaded: false,
  });
  const [movie, setMovie] = useState({
    movieData:''
  });
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (state.movieTitle.trim() === "") {
      alert("Please type movie title");
      return
    }
    const { movieTitle } = state;
    searchMovieApi(movieTitle).then((data) => {
      if (data) {
        setMovie({
          movieData:data
        });
      }
    });
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="write movie's title"
          name="movieTitle"
          value={state.movieTitle}
          onChange={handleChange}
        ></input>
        <button>search movie</button>
        {movie.movieData ? (
          <Movie
            title={movie.movieData.Title}
            year={movie.movieData.Year}
            director={movie.movieData.Director}
            awards={movie.movieData.Awards}
          />
        ) : null}
      </form>
    </div>
  );
};

export default App;
