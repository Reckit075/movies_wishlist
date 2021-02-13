import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const HomePage = () => {
  return (
    <main>
      <Link to="/search">
        <div className="left">
          <h1>search</h1>
        </div>
      </Link>
      <Link to="/wishlist">
        <div className="right">
          <h1>wishlist</h1>
        </div>
      </Link>
    </main>
  );
};

export default HomePage;
