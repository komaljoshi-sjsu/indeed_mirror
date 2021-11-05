// Employer Landing Page
import React, { Component } from 'react'
import EmployerNavbar from './EmployerNavbar'
import {Button,Card,ListGroup,ListGroupItem,Modal,Row,Col} from 'react-bootstrap';
import axios from "axios";
import backendServer from '../../webConfig';
import '../../CSS/EmployerLanding.css'

class Employer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      month: '',
      day: '',
      year: '',
      companyId:null,
      postedJobs: [],
      statusmsg:null,
      show:false,
      applicantsName : [],
      liststatus:null,
      applicantProfile:[],
      jobPreference:[],
      showprofile:false
    }
    //this.getCurrentDate()
  }
  componentDidMount() {
      console.log("here")
      const companyId = 1;
      const compId = {
        companyId:companyId
      }
      
      axios.post(`${backendServer}/getPostedJobs`,compId).then((response) => {
        //console.log(response.status)
        if(response.status === 200){
          
          this.setState({
            postedJobs: this.state.postedJobs.concat(response.data),
          });
          this.setState({
            statusmsg: "Jobs Found"
          });
        }
      });
}
handleModalClose(){
  this.setState({applicantsName : []})
  this.setState({show:false}) 
}
handleModalCloseProfile(){
  this.setState({applicantsName : []})
  this.setState({showprofile:false}) 
  this.setState({applicantProfile : []})
  this.setState({jobPreference : []})
  
  
}
  handleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    history.push('/postJob');
  }
  viewJobSeekerProfile = (id) => {
    const jobSeekerId = {
      id : id
    }
    axios.post(`${backendServer}/getJobSeekerProfile`,jobSeekerId).then((response) => {
      
      if(response.status === 200){
        console.log(response.data)
        this.setState({
          applicantProfile: this.state.applicantProfile.concat(response.data[0]),
        });
        this.setState({
          jobPreference: this.state.jobPreference.concat(response.data[1]),
        });
        this.setState({show:false})
        this.setState({showprofile:true})
        
      }
    });
  }
  viewUsersList = (val) => {
   const JobId = {
     jobId : val
   }
    axios.post(`${backendServer}/getApplicantsName`,JobId).then((response) => {
      if(response.status === 200){
        console.log(response.data)
        if(response.data.length >=1) {
          this.setState({liststatus : "Applicants List"})
        }else{
          this.setState({liststatus : null})
        }
        this.setState({
          applicantsName: this.state.applicantsName.concat(response.data),
        });
      }
      
    });
    this.setState({
      show:true
    })
  }

  render() {
    const {postedJobs,applicantsName,statusmsg,liststatus,applicantProfile,jobPreference} = this.state;
    console.log("*****")
    console.log(applicantProfile)
    console.log(jobPreference)
    console.log("*****")
    var jobsList = null; var applicantsList = null; var profile = null;
    if(liststatus === "Applicants List"){
      applicantsList = (
        <div>
          {applicantsName.map(applicant=>
          <div>
            <Row>
              <Col>
              <Button
              onClick={() => {
                this.viewJobSeekerProfile(applicant.id);
              }}
               
               variant="Link">{applicant.name}</Button>
              
              </Col>
              <Col>
              <Button variant="link">Resume</Button>
              </Col>
            </Row></div>
          )}
        </div>
      )
    }else{
      applicantsList = (
        <div>
          Zero Applicants for this job.
        </div>
      )
    }
    if(applicantProfile){
      profile = (
        <div>
          {applicantProfile.map(applicant=>
            <div>
               
                <h5>Profile Details</h5>
              <Row>
                <Col>
                <h6>Email :</h6>{applicant.email}
                </Col>
                </Row>
                <Row>
                <Col>
                <h6>Phone :</h6> {applicant.jobSeekerContact}
                </Col>
              </Row>

            </div>
          )}
            <br/>
        {jobPreference.map(job=>
            <div>
               <h5>Job Preferences</h5>
              <Row>
                <Col>
               Job Title : {job.JobTitle}
                </Col>
                </Row>
                <Row>
                <Col>
                Job Types : {job.JobTypes}
                </Col>
              </Row>
              <h6>Work Schedules :</h6>
               
              <Row>
                <Col>
                <h6>Range:</h6>
                {job.WorkSchedules.range.map(range=>
                <div>
                  {range}
                </div>
                )}
                <br/>
                <h6>Shifts:</h6>
                {job.WorkSchedules.shifts.map(other=>
                <div>
                  {other}
                </div>
                )}
                <br/>
                <h6>Other:</h6>
                {job.WorkSchedules.other.map(other=>
                <div>
                  {other}
                </div>
                )}
                </Col>
              </Row> 
              <h6>Pay:</h6>
              <Row>
                <Col>
               Category : {job.pay.category}
               &nbsp;&nbsp;
               Amount : {job.pay.amount}
                </Col>
                </Row>
               
              <Row>
                <Col>
                <h6>Relocation:</h6>{job.relocation}
                </Col>
                </Row>
                <h6>Remote:</h6>
                <Row>
                <Col>
                {job.remote.map(other=>
                <div>
                  {other}
                </div>
                )}
                </Col>
                </Row>
            </div>
          )}
        </div>
      )

    }
    if(statusmsg === "Jobs Found"){
      
      jobsList = (
      <div className='card-list'>
      {postedJobs.map(job=>
        
        <div className="container">
        <Card style={{ width: "18rem" }}>
        <Card.Body>
        <Card.Title><Button  variant="link" 
        onClick={() => {
          this.viewUsersList(job.jobId);
        }}
        >
          <h5>{job.jobTitle}</h5>
          </Button>
          </Card.Title>
        <ListGroup className="list-group-flush">
          <ListGroupItem>{job.jobType}</ListGroupItem>
          <ListGroupItem>{new Date(job.jobPostedDate).toDateString()}</ListGroupItem>
          <ListGroupItem>Total Applicants : {job.applicantsNo}</ListGroupItem>
        </ListGroup> 
        </Card.Body> 
        </Card>                           
      </div>
      
      )
    }
    </div>
      )
      }

    return (
      <div >
        <EmployerNavbar/>
        <div id="Second" class="row searchNav">
          <div class="row">
            <div class="col-2"></div>
            <div class="col-9">
              <div class="row">
                <div class="col-4">
                  <div class="input-group mb-3">
                  </div>
                </div>
                <div class="col-4">
                  <div class="input-group mb-3">
                  </div>
                </div>
                <div class="col-4">
                </div>
              </div>
            </div>
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
           
          </div>
        </div>
        <hr />
        <div>  <h5 style={{ marginLeft: '120px' }}>Jobs Posted</h5></div>
        {jobsList}
        <div>
         <Modal size="md-down"
          aria-labelledby="contained-modal-title-vcenter"
          centered
           show={this.state.show} onHide={()=>this.handleModalClose()}>
             <Modal.Header closeButton><h4>Applicants List </h4>
             
             </Modal.Header>
             
             
             <Modal.Body>
              
             {applicantsList}
             
             </Modal.Body>
             
           </Modal>
          </div>
          <div>
         <Modal size="md-down"
          aria-labelledby="contained-modal-title-vcenter"
          centered
           show={this.state.showprofile} onHide={()=>this.handleModalCloseProfile()}>
             <Modal.Header closeButton><h4>Profile </h4>
             </Modal.Header>
             
             
             <Modal.Body>
             
             {profile}
             
             </Modal.Body>
             
           </Modal>
          </div>
      </div>
    )
  }
}

export default Employer


