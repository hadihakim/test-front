import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import ScrollToTop from './shared/util/scroll';
import Home from './Home/pages/home';
import Product from './Product/pages/product';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  let routes = (
    <Switch>
      <Route path="/" exact><Home /></Route>
      <Route path="/product" exact><Product /></Route>
      <Redirect to="/" />
    </Switch>
  );
  return (
    <React.Fragment>
      <Router>
        <ScrollToTop />
        <MainNavigation />
        <main className='main-container'>
          {
            routes
          }
        </main>
      </Router>
    </React.Fragment>
  );
}

export default App;
