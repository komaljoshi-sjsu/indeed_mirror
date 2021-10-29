import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Login from './pages/Login/Login.js'
import Home from './common/Home'
import Signup from './pages/Signup/Signup.js'
import Employer from './pages/Employer/Employer'
import PostJob from './pages/Employer/PostJob'
import JobSeekerLandingPage from './pages/JobSeeker/JobSeeker.js'
<<<<<<< HEAD
import CompanyTabs from './pages/Company/CompanyTabs.js'
import Header from './pages/Company/Header.js'
=======
import UploadPhotos from './pages/JobSeeker/UploadPhotos.js'
import CompanyPhotos from './pages/JobSeeker/CompanyPhotos'
import AdminPhoto from './pages/Admin/AdminPhoto.js'
import Header from './pages/Company/Header.js';
import EmployerProfile from './pages/Employer/EmployerProfile'
>>>>>>> 1a75148efedf3d2ea5b611ae048c156efbfb1567
//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        {/*Render Different Component based on Route*/}
        <Route path="/login" component={Login} />
<<<<<<< HEAD
        <Route path="/home" component={Home} />
        <Route path="/header" component={Header} />
=======
        <Route path="/header" component={Header}/>
>>>>>>> 1a75148efedf3d2ea5b611ae048c156efbfb1567
        <Route path="/signup" component={Signup} />
        <Route path="/postJob" component={PostJob} />
        <Route path="/employer" component={Employer} />
        <Route path="/employerprofile" component={EmployerProfile} />
        <Route path="/landingPage" component={JobSeekerLandingPage} />
<<<<<<< HEAD
        <Route path="/company" component={CompanyTabs} />
=======
        <Route path="/photos" component={UploadPhotos} />
        <Route path="/companyPhotos" component={CompanyPhotos} />
        <Route path="/adminPhotos" component={AdminPhoto}/>
>>>>>>> 1a75148efedf3d2ea5b611ae048c156efbfb1567
      </div>
    )
  }
}
//Export The Main Component
export default Main
