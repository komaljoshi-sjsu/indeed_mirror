// Job Seeker Landing Page
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../../CSS/JobSeekerLanding.css'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@material-ui/styles'
import Autocomplete from '@mui/material/Autocomplete'
import axios from 'axios'
import JobSeekerNavbar from './JobSeekerNavbar'

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)': {
//       // Default transform is "translate(14px, 20px) scale(1)""
//       // This lines up the label with the initial cursor position in the input
//       // after changing its padding-left.
//       transform: 'translate(34px, 20px) scale(1);',
//       width: '',
//     },
//   },
//   inputRoot: {
//     color: 'purple',
//     // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
//     '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
//       // Default left padding is 6px
//       paddingLeft: 26,
//     },
//     '& .MuiOutlinedInput-notchedOutline': {
//       borderColor: 'green',
//     },
//     '&:hover .MuiOutlinedInput-notchedOutline': {
//       borderColor: 'red',
//     },
//     '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//       borderColor: 'purple',
//     },
//   },
// }))

class JobSeekerLandingPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      month: '',
      day: '',
      year: '',
      whatVal: '',
      whereVal: '',
      allJobs: [],
      jobs: [],
      whatSearch: [],
      whereSearch: [],
      roleName: '',
      companyName: '',
      city: '',
      state: '',
      zip: '',
      jobType: '',
      salary: '',
      location: '',
    }
    this.getCurrentDate()
  }

  getCurrentDate() {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    var dateObj = new Date()
    var month = monthNames[dateObj.getMonth()]
    var day = dateObj.getUTCDate()
    var year = dateObj.getUTCFullYear()
    console.log(month + ' ' + day + ' ' + year)

    this.state.month = month
    this.state.day = day
    this.state.year = year
  }

  componentDidMount() {
    axios.get('http://localhost:5000/jobSeeker/home').then(
      (response) => {
        console.log(response.data, response.status)
        //this.state.jobs = response.data

        //console.log(response.data[0].fullJobDesc)

        // let jobDesc = JSON.parse(response.data[0].fullJobDesc)

        // console.log(jobDesc)

        let jobTitles = response.data.map((job) => {
          return job.jobTitle
        })

        console.log('Job Titles: ')
        console.log(jobTitles)

        let companyNames = response.data.map((job) => {
          return job.companyName
        })

        console.log('Company Names: ')
        console.log(companyNames)

        let whatSearch = jobTitles.concat(companyNames)

        whatSearch = whatSearch.filter(
          (job, index, self) => index === self.findIndex((j) => j === job),
        )

        let city = response.data.map((job) => {
          return job.city
        })
        let state = response.data.map((job) => {
          return job.state
        })
        let zip = response.data.map((job) => {
          return job.zip
        })
        let whereSearch = city.concat(state, zip)

        // remove duplicate job titles
        whereSearch = whereSearch.filter(
          (job, index, self) => index === self.findIndex((j) => j === job),
        )

        let job = response.data[0]

        this.setState({
          jobs: this.state.jobs.concat(response.data),
          allJobs: this.state.allJobs.concat(response.data),
          whatSearch: whatSearch,
          whereSearch: whereSearch,
          roleName: job.jobTitle,
          companyName: job.companyName,
          city: job.city,
          state: job.state,
          zip: job.zip,
          jobType: job.jobMode,
          salary: job.salaryDetails,
          location: job.city,
        })
      },
      (error) => {
        console.log(error)
      },
    )
  }

  handleWhatVal = (evt, value) => {
    // console.log(evt.target.value)
    // console.log(value)
    if (value)
      this.setState({
        whatVal: value,
      })
    if (evt.target.value)
      this.setState({
        whatVal: evt.target.value,
      })
  }

  handleWhereVal = (evt, value) => {
    // console.log(evt.target.value)
    // console.log(value)

    if (value)
      this.setState({
        whereVal: value,
      })
    if (evt.target.value)
      this.setState({
        whereVal: evt.target.value,
      })
  }

  handleFindJobs() {
    console.log('In find')
    console.log(this.state.whereVal, this.state.whatVal)
    let job = []
    if (this.state.whereVal.length && this.state.whatVal) {
      console.log('What and where')
      job = this.state.allJobs.filter(
        (job) =>
          (job.city === this.state.whereVal ||
            job.state === this.state.whereVal ||
            job.zip === this.state.whereVal) &&
          (job.jobTitle === this.state.whatVal ||
            job.location === this.state.whatVal ||
            job.companyName === this.state.whatVal),
      )
    } else if (this.state.whereVal.length && !this.state.whatVal) {
      console.log('only where')
      job = this.state.allJobs.filter(
        (job) =>
          job.city === this.state.whereVal ||
          job.state === this.state.whereVal ||
          job.zip === this.state.whereVal,
      )
    } else if (!this.state.whereVal.length && this.state.whatVal) {
      console.log('only what')
      job = this.state.allJobs.filter(
        (job) =>
          job.jobTitle === this.state.whatVal ||
          job.location === this.state.whatVal ||
          job.companyName === this.state.whatVal,
      )
    }

    if (job.length > 0)
      this.setState({
        jobs: job,
        roleName: job[0].jobTitle,
        companyName: job[0].companyName,
        city: job[0].city,
        state: job.state,
        zip: job[0].zip,
        jobType: job[0].jobMode,
        salary: job[0].salaryDetails,
        location: job[0].city,
      })
  }

  handleCardClick = (evt) => {
    console.log(evt.currentTarget.id)
    let jobId = parseInt(evt.currentTarget.id)
    let job = this.state.allJobs.filter((job) => job.jobId === jobId)[0]

    console.log(job.jobTitle)

    this.setState({
      roleName: job.jobTitle,
      companyName: job.companyName,
      city: job.city,
      state: job.state,
      zip: job.zip,
      jobType: job.jobMode,
      salary: job.salaryDetails,
      location: job.city,
    })
  }

  render() {
    return (
      <div>
        <JobSeekerNavbar />
        <div id="Second" class="row searchNav">
          <div class="row">
            <div class="col-2"></div>
            <div class="col-9">
              <div class="row">
                <div class="col-4">
                  <div class="input-group mb-3">
                    <button
                      class="btn noLeftborder"
                      type="button"
                      id="button-addon1"
                      disabled
                    >
                      <h6 style={{ marginTop: '10px' }}>What</h6>
                    </button>
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      sx={{ width: 180, borderBottom: 'none' }}
                      value={this.state.whatVal}
                      onChange={this.handleWhatVal.bind(this)}
                      options={this.state.whatSearch.map((option) => option)}
                      getOptionLabel={(option) => option}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={{ width: 180, borderBottom: 'none' }}
                          //class="whatSearch2"
                          onChange={this.handleWhatVal.bind(this)}
                          value={this.state.whatVal}
                        />
                      )}
                    />
                    <button
                      class="btn noRightborder"
                      type="button"
                      id="button-addon1"
                      disabled
                    >
                      <i
                        class="bi bi-search"
                        style={{ width: '32px', height: '32px' }}
                      ></i>
                    </button>
                  </div>
                </div>
                <div class="col-4">
                  <div class="input-group mb-3">
                    <button
                      class="btn noLeftborder"
                      type="button"
                      id="button-addon1"
                      disabled
                    >
                      <h6 style={{ marginTop: '10px' }}>Where</h6>
                    </button>
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      sx={{ width: 180, borderBottom: 'none' }}
                      value={this.state.whereVal}
                      onChange={this.handleWhereVal}
                      options={this.state.whereSearch.map((option) => option)}
                      getOptionLabel={(option) => option}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={{ width: 180, borderBottom: 'none' }}
                          //class="whatSearch2"
                          value={this.state.whereVal}
                          onChange={this.handleWhereVal}
                        />
                      )}
                    />
                    <button
                      class="btn noRightborder"
                      type="button"
                      id="button-addon1"
                      disabled
                    >
                      <i
                        class="bi bi-geo-alt"
                        style={{ width: '32px', height: '32px' }}
                      ></i>
                    </button>
                  </div>
                </div>
                <div class="col-1">
                  <button
                    type="button"
                    class="btn findbtn"
                    onClick={this.handleFindJobs.bind(this)}
                  >
                    <h5 style={{ marginTop: '4px', color: 'white' }}>
                      Find Jobs
                    </h5>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-4"></div>
            <div class="col-4">
              <h5>
                <span class="hoverUnderline" style={{ color: '#003399' }}>
                  Post your resume
                </span>
                &nbsp;- It only takes a few seconds
              </h5>
            </div>
            <div class="col-4"></div>
          </div>

          <div class="row" style={{ marginTop: '10px' }}>
            <div class="col-4"></div>
            <div class="col-4">
              <h5 style={{ marginLeft: '120px' }}>
                Employers:
                <span class="hoverUnderline" style={{ color: '#003399' }}>
                  Post a Job
                </span>
              </h5>
            </div>
            <div class="col-4"></div>
          </div>
        </div>

        <hr />

        <div id="third" class="row" style={{ marginTop: '10px' }}>
          <div class="row">
            <div class="col-4"></div>
            <div class="col-7">
              <div class="row">
                <div class="col-3">
                  <h3
                    class="headinghoverUnderline"
                    style={{ color: '#003399' }}
                  >
                    <u style={{ color: '#003399' }}>Job feed </u>
                  </h3>
                </div>
                <div class="col-4">
                  <h3 class="headinghoverUnderline">Recent Searches</h3>
                </div>
              </div>
            </div>
            <div class="col-1"></div>
          </div>
        </div>

        <div
          id="third"
          class="row "
          style={{ backgroundColor: '#f7f7f7', marginTop: '20px' }}
        >
          <div class="row">
            <div class="col-2"></div>
            <div class="col-4" style={{ marginLeft: '0px' }}>
              <h4 style={{ marginTop: '10px' }}>
                {this.state.month} {this.state.day}, {this.state.year}
              </h4>
              Job based on your searches
              {this.state.jobs.map((job) => (
                <div
                  class="card cardStyle2"
                  id={job.jobId}
                  onClick={this.handleCardClick}
                >
                  <div class="card-body">
                    <h4 class="card-title">{job.jobTitle}</h4>
                    <h6 class="card-title">{job.companyName}</h6>
                    <h6 class="card-title">{job.city}</h6>
                    <h6 class="card-title">{job.salaryDetails}</h6>
                    <br />
                    <br />
                    <p class="card-text">{job.shortJobDescription}</p>
                  </div>
                </div>
              ))}
            </div>

            <div class="col-5">
              <div class="card cardStyle">
                <div class="card-body">
                  <h4 class="card-title">{this.state.roleName}</h4>
                  <h6 class="card-title">{this.state.companyName}</h6>
                  <h6 class="card-title">Average Rating</h6>
                  <h6 class="card-title">Number of reviews</h6>
                  <h6 class="card-title">
                    {this.state.city}, {this.state.state}
                  </h6>
                  <h6 class="card-title">{this.state.zip}</h6>
                  You must create an Indeed account before continuing to the
                  company website to apply
                  <br />
                  <br />
                  <div class="btn-group" role="group" aria-label="Third group">
                    <button type="button" class="btn applybtn">
                      <h5 style={{ marginTop: '4px', color: 'white' }}>
                        Apply On Company Site
                      </h5>
                    </button>
                  </div>
                  <div class="btn-group" role="group" aria-label="Third group">
                    <button type="button" class="btn savebtn">
                      <h5 style={{ marginTop: '4px', color: 'white' }}>Save</h5>
                    </button>
                  </div>
                  <br />
                  <br />
                  <hr />
                  <br />
                  <h5 class="card-title">Job details</h5>
                  <br />
                  <h6>Job Type:</h6>
                  <h6>{this.state.jobType}</h6> <br />
                  <h6>Salary:</h6>
                  <h6>${this.state.salary}</h6>
                  <br />
                  <hr />
                  <h5 class="card-title">Full Job Description</h5>
                  <br />
                  <h6>Location:</h6>
                  <h6>{this.state.location}</h6>
                  <br />
                  <h6>Job Description:</h6>
                  <br />
                  <h6>What you will do:</h6> <br />
                  <h6>What you will need:</h6> <br />
                  <h6>Why You’ll love working:</h6> <br />
                </div>
              </div>
            </div>
            <div class="col-1"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default JobSeekerLandingPage
