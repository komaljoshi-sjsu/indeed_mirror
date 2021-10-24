import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Login from './pages/Login/Login.js'
import Home from './common/Home'
import Signup from './pages/Signup/Signup.js'
import Employer from './pages/Employer/Employer'
import PostJob from './pages/Employer/PostJob'
import JobSeekerLandingPage from './pages/JobSeeker/JobSeeker.js'
import UploadPhotos from './pages/JobSeeker/UploadPhotos.js'
import CompanyPhotos from './pages/JobSeeker/CompanyPhotos'

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
        <Route path="/landingPage" component={JobSeekerLandingPage} />
        <Route path="/photos" component={UploadPhotos} />
        <Route path="/companyPhotos" component={CompanyPhotos} />
      </div>
    )
  }
}
//Export The Main Component
export default Main
