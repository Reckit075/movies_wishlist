import React, { useState } from "react";
import "./index.css";
import {searchMovies} from '../../Api/index'
import Movie from '../../components/Movie/index'

const SearchPage = () => {
  const [state, setState] = useState({
    movieTitle: "",
    loaded: false,
  });
  const [movies, setMovies] = useState([]);
  const [formStyle, setFormStyle] = useState("form");

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    setFormStyle("formAfter")
    event.preventDefault();
    if (state.movieTitle.trim().length < 3) {
      alert("Please type movie title");
      return;
    }
    const { movieTitle } = state;
    searchMovies(movieTitle).then((movies) => {
      setMovies(movies);
    });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit} className={formStyle}>
        <input
          type="text"
          placeholder="write movie's title"
          name="movieTitle"
          className="searchBar"
          value={state.movieTitle}
          onChange={handleChange}
        ></input>
        <button>🔎</button>
      </form>
      <div className="moviesContainer">
        {movies.length > 0
          ? movies.map((movie, index) => {
              return (
                <Movie
                  key={index}
                  imdbID={movie.imdbID}
                  title={movie.Title}
                  year={movie.Year}
                  director={movie.Director}
                  awards={movie.Awards}
                  image={movie.Poster}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default SearchPage;
