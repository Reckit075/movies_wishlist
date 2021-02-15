import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import styles from "./index.module.scss";
import { getWishListMovies, removeMovieFromWishlist } from './service'

import Movie from "../../components/MovieCard";

const WishListPage = () => {
  const [movies, setMovies] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getWishListMovies()
      .then(movies => {
        setMovies(movies)
        setLoaded(true)
      })
  }, []);

  const handleClickRemoveMovie = (imdbID) => {
    const updatedMovies = movies.filter(m => m.imdbID != imdbID)
    setMovies([...updatedMovies])
    removeMovieFromWishlist(imdbID)
  }

  return (
    <>
      {
        loaded ?
          <>
            <Link to="/"><p className={styles.btnBack}>⬅ back to search</p></Link>
            <h1 className={styles.header}>MY WISHLIST</h1>
            <div className={styles.moviesContainer}>
              {movies.length > 0 ?
                movies.map((movie, index) => {
                  return <Movie
                    key={index}
                    showType="wishlist"
                    title={movie.Title}
                    year={movie.Year}
                    director={movie.Director}
                    awards={movie.Awards}
                    image={movie.Poster}
                    btnClick={() => handleClickRemoveMovie(movie.imdbID)}
                    btnText="Remove"
                  />
                }) : <p className={styles.infoText}>wishlist is empty 😥</p>
              }
            </div>
          </>
          :
          <p className={styles.infoText}>loading...</p>
      }
    </>
  );
};

export default WishListPage;