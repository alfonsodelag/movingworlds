import React from 'react';
import Header from './components/Header';
import SearchBox from './components/SearchBox';

import Stats from './components/Stats';

function App() {
  return (
    <div>
      <Header />
      <SearchBox exact path="/" />
      <Stats exact path="/stats" />
    </div>
  );
}

export default App;
