import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Login from './pages/Login/Login.js'
import Home from './common/Home'
import Signup from './pages/Signup/Signup.js'
import Employer from './pages/Employer/Employer'
import PostJob from './pages/Employer/PostJob'
import EmployerProfile from './pages/Employer/EmployerProfile'
import JobSeekerLandingPage from './pages/JobSeeker/JobSeeker.js'
//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        {/*Render Different Component based on Route*/}
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/postJob" component={PostJob} />
        <Route path="/employer" component={Employer} />
        <Route path="/employerprofile" component={EmployerProfile} />
        <Route path="/landingPage" component={JobSeekerLandingPage} />
      </div>
    )
  }
}
//Export The Main Component
export default Main
