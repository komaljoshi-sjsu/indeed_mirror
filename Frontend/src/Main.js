import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Login from './pages/Login/Login.js'
import Home from './common/Home'
import Signup from './pages/Signup/Signup.js'
import Employer from './pages/Employer/Employer'
import PostJob from './pages/Employer/PostJob'
import JobSeekerLandingPage from './pages/JobSeeker/JobSeeker.js'
import CompanyTabs from './pages/Company/CompanyTabs.js'
import JoinUs from './pages/Company/JoinUs'
import Snapshot from './pages/Company/Snapshot'
import UploadPhotos from './pages/JobSeeker/UploadPhotos.js'
import CompanyPhotos from './pages/JobSeeker/CompanyPhotos'
import AdminPhoto from './pages/Admin/AdminPhoto.js'
import EmployerProfile from './pages/Employer/EmployerProfile'
import EmployerUpdateProfile from './pages/Employer/EmployerUpdateProfile'
import Reviews from './pages/JobSeeker/Reviews';
import AdminReview from './pages/Admin/AdminReview.js'
import AddSalaryReview from './pages/Company/AddSalaryReview'
import Resume from './pages/JobSeeker/Resume.js'
import FindSalaries from './pages/JobSeeker/FindSalaries'

//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        {/*Render Different Component based on Route*/}
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/snapshot" component={Snapshot}/>
        <Route path="/whyJoinUs" component={JoinUs}/>
        <Route path="/signup" component={Signup} />
        <Route path="/postJob" component={PostJob} />
        <Route path="/employer" component={Employer} />
        <Route path="/employerprofile" component={EmployerProfile} />
        <Route path="/employerupdateprofile" component={EmployerUpdateProfile} />
        <Route path="/landingPage" component={JobSeekerLandingPage} />
        <Route path="/company" component={CompanyTabs} />
        <Route path="/photos" component={UploadPhotos} />
        <Route path="/companyPhotos" component={CompanyPhotos} />
        <Route path="/adminPhotos" component={AdminPhoto}/>
        <Route path="/reviews" component={Reviews}/>
        <Route path="/adminReviews" component={AdminReview}/>
        <Route path="/addSalaryReview" component={AddSalaryReview} />
        <Route path="/resume" component={Resume}/>
        <Route path="/findSalaries" component={FindSalaries}/>
      </div>
    )
  }
}
//Export The Main Component
export default Main
