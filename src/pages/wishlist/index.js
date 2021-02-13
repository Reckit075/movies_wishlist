import React, { useState, useEffect } from "react";
import { getMoviesToWishList } from "../../Api/index";
import "./index.css";
import { getCookie } from "../../helpers/cookies";
import Movie from "../../components/Movie";

const WishListPage = () => {
  const [movies, setMovies] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const moviesOnWishList = getCookie("wishlist").value;
 let getData = () =>{ getMoviesToWishList(moviesOnWishList).then(a=>{
     setMovies(a)
  })
  setLoaded(true)
}
  useEffect(() => {
    getData(moviesOnWishList);
  }, []);
  if (!loaded) {
    return <p className="info">loading...</p>;
  } else if (loaded) {
      console.log(movies)
    return (
      <div className="moviesContainer">
        {
          movies.map((movie, index) => {
            return <Movie
              key={index}
              imdbID={movie.imdbID}
              title={movie.Title}
              year={movie.Year}
              director={movie.Director}
              awards={movie.Awards}
              image={movie.Poster}
            />;
          })}
      </div>
    );
  }
};

export default WishListPage;
