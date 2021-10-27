// Job Seeker Navigation bar

import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from '../../images/Indeed_logo.png'
import '../../CSS/JobSeekerNavbar.css'

class JobSeekerNavbar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">
              <img
                src={logo}
                alt=""
                width="120"
                height="30"
                class="d-inline-block align-text-top"
              />
            </a>

            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul
                class="navbar-nav me-auto mb-2 mb-lg-0"
                style={{ marginTop: '15px' }}
              >
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">
                    <h5>Find Jobs</h5>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <h5>Company Reviews</h5>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <h5>Find Salaries</h5>
                  </a>
                </li>
              </ul>
              <form class="d-flex">
                <ul
                  class="navbar-nav me-auto mb-2 mb-lg-0"
                  style={{ marginTop: '15px' }}
                >
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <h5>Upload your Resume</h5>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <h5 style={{ color: 'blue' }}>Sign in</h5>
                    </a>
                  </li>
                  <li class="nav-item">
                    <h3 style={{ color: 'black' }}>|</h3>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <h5>Employers/Post Job</h5>
                    </a>
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default JobSeekerNavbar