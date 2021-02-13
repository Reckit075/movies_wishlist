import React from "react";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { setCookie, getCookie } from "../../helpers/cookies";
import ImageNotFound from '../../gfx/imageNotFound.png'

const Movie = ({imdbID, title, year, director, awards, image }) => {
  const addToWishlist = (imdbID) => {
    if (!getCookie("wishlist")) {
      const wishlist = [];
      wishlist.push(imdbID);
      setCookie("wishlist", wishlist);
    } else {
      const wishlist = getCookie("wishlist").value;
      if (!wishlist.includes(imdbID)) {
        wishlist.push(imdbID);
        setCookie("wishlist", wishlist);
      }
    }
  };

  const showWishList = () => {
    console.log(document.cookie);
  };

  return (
    <div className="cardWrapper">
      <Card
        style={{ width: "18rem" }}
        bg="secondary"
        border="light"
        text="light"
        className="card"
      >
        {image == "N/A" ? <Card.Img variant="top" src={ImageNotFound} /> : <Card.Img variant="top" src={image} />}
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Button variant="primary" onClick={() => addToWishlist(imdbID)} className="btn">
            add to wishlist
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};
export default Movie;
