import React, { useState } from "react";
import "./App.css";
import Movie from "./components/Movie";
import {searchMovies} from "./Api/index";

const App = function App() {
  const [state, setState] = useState({
    movieTitle: "",
    loaded: false,
  });
  const [movies, setMovies] = useState([]);

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (state.movieTitle.trim().length < 3) {
      alert("Please type movie title");
      return
    }
    const { movieTitle } = state;
      searchMovies(movieTitle)
      .then((movies) => {
        setMovies(movies);
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
      </form>
      <div className="moviesContainer">
        {movies.length > 0 ? (
                  movies.map((movie, index) =>{
                    return (
                      <Movie
                        key={index}
                        title={movie.Title}
                        year={movie.Year}
                        director={movie.Director}
                        awards={movie.Awards}
                        image={movie.Poster}/>
                        )
                  })
          ) : null}
      </div>
    </div>
  );
};

export default App;
