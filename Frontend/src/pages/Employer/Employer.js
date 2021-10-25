// Employer Landing Page
import React, { Component } from 'react'
import EmployerNavbar from './EmployerNavbar'
import {BiSearch} from 'react-icons/bi';
import {IoList} from 'react-icons/io5';
import {Button} from 'react-bootstrap';
import '../../CSS/EmployerLanding.css'

class Employer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      month: '',
      day: '',
      year: '',
    }
    //this.getCurrentDate()
  }

  handleSubmit = (e) => {
            e.preventDefault();
            const { history } = this.props;
            history.push('/postJob');
        }
  render() {
    return (
      <div>
        <EmployerNavbar/>
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
                    <input
                      type="text"
                      class="form-control noborder whatSearch"
                      placeholder="Job title, keywords, or company"
                      aria-label="Example text with button addon"
                      aria-describedby="button-addon1"
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
                    <input
                      type="text"
                      class="form-control noborder whatSearch"
                      placeholder="City, state, zip code or 'remote'"
                      aria-label="Example text with button addon"
                      aria-describedby="button-addon1"
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
                <div class="col-4">
                  <div class="input-group mb-3">
                  <button  class="btn findbtn1 ">
                    <h5 style={{color: 'white' }}>
                     <BiSearch/>
                    </h5>
                  </button>
                 &nbsp;
                  <button  class="filterbtn btn">
                    <h5 style={{color: 'black'}}>
                     <IoList/>
                    </h5>
                  </button>
                  </div>
                </div>
                {/* <div class="col-1">
                  
                </div> */}
           
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-4"></div>
            
            <div class="col-4"></div>
          </div>

          <div class="row" style={{ marginTop: '10px' }}>
            <div class="col-4"></div>
            <div class="col-4">
              <h5 style={{ marginLeft: '120px' }}>
                Employers:
                <span class="hoverUnderline" style={{ color: '#003399' }}>
                 <Button onClick={this.handleSubmit}>Post a Job</Button>
                </span>
              </h5>
            </div>
            <div class="col-4"></div>
          </div>
        </div>

        <hr />

        {/* <div id="third" class="row" style={{ marginTop: '10px' }}>
          <div class="row">
            <div class="col-4"></div>
            <div class="col-7">
              <div class="row">
                <div class="col-3">
                  <h3
                    class="headinghoverUnderline"
                    style={{ color: '#003399' }}
                  >
                    <u style={{ color: '#003399' }}>Candidates</u>
                  </h3>
                </div>
                <div class="col-4">
                  <h3 class="headinghoverUnderline">Recent Searches</h3>
                </div>
              </div>
            </div>
            <div class="col-1"></div>
          </div>
        </div> */}

        {/* <div
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
              <div class="card cardStyle">
                <div class="card-body">
                  <h4 class="card-title">Role Name</h4>
                  <h6 class="card-title">Company Name and Rating</h6>
                  <h6 class="card-title">Company Location</h6>
                  <h6 class="card-title">Salary details</h6>
                  <br />
                  <br />
                  <p class="card-text">Short Job Description</p>
                </div>
              </div>
              <div class="card cardStyle">
                <div class="card-body">
                  <h4 class="card-title">Role Name</h4>
                  <h6 class="card-title">Company Name and Rating</h6>
                  <h6 class="card-title">Company Location</h6>
                  <h6 class="card-title">Salary details</h6>
                  <br />
                  <br />
                  <p class="card-text">Short Job Description</p>
                </div>
              </div>
            </div>

            <div class="col-6">
              <div class="card cardStyle">
                <div class="card-body">
                  <h4 class="card-title">Role Name</h4>
                  <h6 class="card-title">Company Name and Rating</h6>
                  <h6 class="card-title">Number of reviews</h6>
                  <h6 class="card-title">City, state, zip code</h6>
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
                  <h6>Job Type</h6>
                  <br />
                  <hr />
                  <h5 class="card-title">Full Job Description</h5>
                  <br />
                  <h6>Location</h6>
                  <h6>Job Description</h6>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    )
  }
}

export default Employer


// //sample employer component
// import { React, Component} from 'react';
// import Button from "@mui/material/Button";

// class Employer extends Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//       };
//     }
//     handleSubmit = (e) => {
//         e.preventDefault();
//         const { history } = this.props;
//         history.push('/postJob');
//     }
  
//     render() {
//       return (
//         <div>
//             <br></br>
//           <Button variant="contained" color="primary" onClick={this.handleSubmit}>Post Job</Button>
//         </div>
//       );
//     }
//   }
//   export default Employer;