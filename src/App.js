import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import Restaurants from './containers/Restaurants';

function App() {

    return (
      <Router>
      <Switch>
        <Route path='/' component={Restaurants}/>
      </Switch>
    </Router>
    );
}

export default App;
