import React, { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { getMoviesPage } from "../../Api/index";
import MovieCard from "../../components/MovieCard/index";
import { Alert, Button } from 'react-bootstrap'
import { addMovieToWishlist } from './service'
import styles from "./index.module.scss";

const SearchPage = () => {
  const [state, setState] = useState({
    movieTitle: "",
    page: 1,
    loaded: false,
  });
  const [alertInfo, setAlertInfo] = useState({
    tooShort: false,
    movieNotFound: false,
  });
  const [movies, setMovies] = useState([]);
  const [spinner, setSpinner] = useState(false);

  const handleClickLoadMore = () => {
    getMoviesPage(state.movieTitle, state.page)
      .then((res) => {
        if (res.Response == "False")
          return

        if (res.Search.length == 0) {
          setAlertInfo({
            ...alertInfo,
            movieNotFound: true
          })
          return;
        }

        setMovies([...movies, ...res.Search]);
        setState({
          ...state,
          page: state.page + 1
        })
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setMovies([])
    setSpinner(true);

    if (state.movieTitle.trim().length < 3) {
      setSpinner(false);
      setAlertInfo({
        ...state,
        tooShort: true
      })
      return;
    }

    const { movieTitle } = state;
    getMoviesPage(movieTitle, 1)
      .then((res) => {
        setSpinner(false);
        if (res.Response == "False" || res.Search.length == 0) {
          setAlertInfo({
            ...alertInfo,
            movieNotFound: true
          })
          return;
        }

        setMovies(res.Search);
        setAlertInfo({
          tooShort: false,
          movieNotFound: false
        })
        setState({
          ...state,
          page: state.page + 1
        })
      });
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className={styles.app}>
      <Link to="/wishlist">
        <button className={styles.btnWishlist}>wishlist ⭐</button>
      </Link>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="write movie's title"
          name="movieTitle"
          className={styles.searchBar}
          value={state.movieTitle}
          onChange={handleChange}
        ></input>
        <button>🔎</button>
      </form>
      {spinner ? (
        <div className={styles.spinnerContainer}>
          <Spinner animation="border" variant="light" />
        </div>
      ) : null}

      {movies.length > 0 ?
        <>
          <div className={styles.moviesContainer}>
            {movies.map((movie, index) => {
              return (
                <MovieCard
                  key={index}
                  showType="search"
                  title={movie.Title}
                  year={movie.Year}
                  director={movie.Director}
                  awards={movie.Awards}
                  image={movie.Poster}
                  btnClick={() => addMovieToWishlist(movie.imdbID)}
                  btnText="add to wishlist"
                />
              );
            })}
          </div>
          <div>
            <Button className={styles.btnLoadMore} onClick={handleClickLoadMore} >Load more</Button>
          </div>
        </>
        : null}
      <div className={styles.alertsContainer}>
        {alertInfo.tooShort ?
          <Alert variant="danger" onClose={() => setAlertInfo({ ...alertInfo, tooShort: false })} dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>please type movie title (min. 3 chars 😊)</p>
          </Alert> : null
        }
        {alertInfo.movieNotFound ?
          <Alert variant="danger" onClose={() => setAlertInfo({ ...alertInfo, movieNotFound: false })} dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>Not found any movie</p>
          </Alert> : null}
      </div>
    </div>
  );
};

export default SearchPage;