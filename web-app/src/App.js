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

function App() {
  useEffect(()=>{document.body.style = 'background: #121212;';})
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
