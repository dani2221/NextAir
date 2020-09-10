import React, { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Prediction from './Containers/Prediction'
import NowAQI from './Components/NowAQI';
import News from './Containers/News';
import HeatMap from './Components/HeatMap';
import LandingPage from './Containers/LandingPage';

function App() {
  useEffect(()=>{document.body.style = 'background: #121212;';})
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={LandingPage}/>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
