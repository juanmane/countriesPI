import './App.css';
import React from 'react';
import { Route } from "react-router-dom";
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import ActivityCreate from './components/ActivityCreate/ActivityCreate';

function App() {
  return ( 
    <div className="App">
    <Route exact path="/" component={Landing} />
    <Route path="/home" component={Home} />
    <Route path="/country/:name" component={Detail} />
    <Route path="/activity" component={ActivityCreate} />
    </div> 
  );
}

export default App;
