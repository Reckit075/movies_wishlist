import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";

const NotFoundPage = () => {
  return (
    <>
      <Link to="/">
        <p className={styles.btnBack}>⬅ back to the home page</p>
      </Link>
      <img src="./gfx/404.png" className={styles.img} alt="404" />
    </>
  );
};

export default NotFoundPage;
