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
