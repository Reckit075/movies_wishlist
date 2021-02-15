import React from "react";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./index.module.scss";

const MovieCard = ({
  title,
  year,
  director,
  awards,
  image,
  btnClick,
  btnText,
  showType,
}) => {
  return (
    <div className={styles.cardWrapper}>
      <Card text="light" className={styles.card}>
        {showType == "wishlist" ? (
          <div className={styles.movieInfo}>
            <h3>About movie:</h3>
            <p>Director: {director}</p>
            <p>Year: {year}</p>
            <p>Awards: {awards}</p>
          </div>
        ) : null}

        {image == "N/A" ? (
          <div className={styles.cardImgContainer}>
            <Card.Img
              className={styles.cardImg}
              variant="top"
              src="./gfx/imageNotFound.png"
            />
          </div>
        ) : (
          <div className={styles.cardImgContainer}>
            <Card.Img variant="top" src={image} className={styles.cardImg} />
          </div>
        )}
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Button onClick={btnClick} className={styles.btn}>
            {btnText}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};
export default MovieCard;
