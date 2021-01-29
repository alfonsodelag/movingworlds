import React from 'react';
import Header from './components/Header';
import SearchBox from './components/SearchBox';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Stats from './components/Stats';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <SearchBox exact path="/" />
        <Route path="/:shortCode/stats" component={Stats} />
      </Switch>
    </Router>
  );
}

export default App;
