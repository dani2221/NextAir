import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Prediction from './Containers/Prediction'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Prediction}/>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
