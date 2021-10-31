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
                    {/* <button
                      class="btn noLeftborder"
                      type="button"
                      id="button-addon1"
                      disabled
                    >
                      <h6 style={{ marginTop: '10px' }}>What</h6>
                    </button> */}
                    {/* <input
                      type="text"
                      class="form-control noborder whatSearch"
                      placeholder="Job title, keywords, or company"
                      aria-label="Example text with button addon"
                      aria-describedby="button-addon1"
                    /> */}
                    {/* <button
                      class="btn noRightborder"
                      type="button"
                      id="button-addon1"
                      disabled
                    >
                      <i
                        class="bi bi-search"
                        style={{ width: '32px', height: '32px' }}
                      ></i>
                    </button> */}
                  </div>
                </div>
                <div class="col-4">
                  <div class="input-group mb-3">
                    {/* <button
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
                    /> */}
                    {/* <button
                      class="btn noRightborder"
                      type="button"
                      id="button-addon1"
                      disabled
                    >
                      <i
                        class="bi bi-geo-alt"
                        style={{ width: '32px', height: '32px' }}
                      ></i>
                    </button> */}
                  </div>
                </div>
                <div class="col-4">
                  {/* <div class="input-group mb-3">
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
                  </div> */}
                </div>
                {/* <div class="col-1">
                  
                </div> */}
           
              </div>
            </div>
          </div>

          {/* <div class="row">
            <div class="col-4"></div>
            
            <div class="col-4"></div>
          </div> */}

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

       
      </div>
    )
  }
}

export default Employer


