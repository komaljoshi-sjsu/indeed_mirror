// Employeer Navigation bar

import React, { Component } from 'react'
import logo from '../../images/indeedemployers_logo.png'
import {IoMdHelpCircle, IoMdChatboxes} from 'react-icons/io';
import {BsFillBellFill, BsPersonFill} from 'react-icons/bs';


class EmployerNavbar extends Component {
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
                    <h5>Dashboard</h5>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <h5>Reviews</h5>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <h5>Analytics</h5>
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
                      <h5 style={{ color: 'black' }}>Help Center <IoMdHelpCircle/></h5>
                    </a>
                  </li>
                  <li class="nav-item">
                    <h3 style={{ color: 'black' }}>|</h3>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <h5 style={{ color: 'black' }}>test</h5>
                    </a>
                  </li> 
                  <li class="nav-item">
                    <h3 style={{ color: 'black' }}>|</h3>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <h5 style={{ color: 'black' }}><BsFillBellFill/></h5>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <h5 style={{ color: 'black' }}><IoMdChatboxes/></h5>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <h5 style={{ color: 'black' }}><BsPersonFill/></h5>
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

export default EmployerNavbar
