import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home";
import SearchPage from "./pages/search";
import WishListPage from "./pages/wishlist";
import NotFoundPage from './pages/NotFoundPage/'

const App = function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/wishlist" component={WishListPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
