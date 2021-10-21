<<<<<<< HEAD
import './App.css'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import { toast } from 'react-toastify'
import React from 'react'
import 'react-toastify/dist/ReactToastify.css'

import Login from './pages/Login/Login'
import JobSeekerLandingPage from './pages/JobSeeker/JobSeeker'

toast.configure()

function Routing() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/landingPage" component={JobSeekerLandingPage} />
    </Switch>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  )
}

export default App
=======
import React, { Component } from 'react';
import './App.css';
import Main from './Main';
import {BrowserRouter} from 'react-router-dom';

//App Component
class App extends Component {
  render() {
    return (
      //Use Browser Router to route to different pages
      <BrowserRouter>
        <div>
          {/* App Component Has a Child Component called Main*/}
          <Main/>
        </div>
      </BrowserRouter>
    );
  }
}
//Export the App component so that it can be used in index.js
export default App;
>>>>>>> 7d87a50483170026962afe494a02b8fe1c940f5c
