import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import WishListPage from "./pages/WishListPage";
import NotFoundPage from './pages/NotFoundPage/'

const App = function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SearchPage} />
        <Route path="/wishlist" component={WishListPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
