import 'bootstrap/dist/css/bootstrap.min.css';
import { ToggleButtonGroup, ToggleButton, Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import backendServer from '../../webConfig';
import CompanyTabs from './CompanyTabs';
import Card from "react-bootstrap/Card";
import '../../CSS/FindSalary.css'

const AddSalaryReview = (props) => {
  const [show, setShow] = useState(false);
  const [salary, setSalary] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleVisible = () => setVisible(true);
  const handleCloseVisible = () => setVisible(false);
  console.log('visible' ,visible);

  
  useEffect(() => {
    axios.get(`${backendServer}/jobSeeker/getSalaryReview`)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setSalary(response.data);
          console.log(response.data);
      }
      }).catch((err) => {
        console.log(err);
      });
  }, []);


  const formValidation =() =>{

  }

  const addSalaryReview = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    
    const formData = new FormData(e.target);
    const currentlyWorking = formData.get('currentlyWorking');
    const companyName = formData.get('companyName');
    const endDate = formData.get('endDate');
    const jobTitle = formData.get('jobTitle');
    const jobLocation = formData.get('jobLocation');
    const annualPay = formData.get('annualPay');
    const yrsOfExp = formData.get('yrsOfExp');
    // const benefitsObject = {};
    const benefitsObject = [];
    if(document.getElementById("paidTimeOff").checked) {
      benefitsObject.push("paidTimeOff");
    }
    if(document.getElementById("healthInsurance").checked) {
      benefitsObject.push("healthInsurance");
    }
    if(document.getElementById("lifeInsurance").checked) {
      benefitsObject.push("lifeInsurance");
    }
    if(document.getElementById("dentalVision").checked) {
      benefitsObject.push("dentalVision");
    }
    if(document.getElementById("retirement").checked) {
      benefitsObject.push("retirement");
    }
    if(document.getElementById("otherBenefits").checked) {
      benefitsObject.push(formData.get("otherBenefitsText"));
    }

    const benefits = JSON.stringify(benefitsObject);
 

    axios.post(`${backendServer}/jobSeeker/postSalaryReview`,{
        currentlyWorking: currentlyWorking,
        companyName:  companyName,
        endDate:  endDate,
        jobTitle: jobTitle,
        jobLocation:  jobLocation,
        annualPay:  annualPay,
        yrsOfExp: yrsOfExp,
        benefits: benefits
      })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            console.log("returned");
            console.log(response.data);
            window.location = '/addSalaryReview';
          }
        }).catch((err) => {
          console.log("caught an error");
          console.log(err.response);
          setErrorMessage(err.response.data);
        });
    };

  return (
    <div>
       <CompanyTabs />

    <div class="row">
            <div class="col-1"></div>
            <div class="col-10">
              <div class="row">
                <div class="col-3">  
                {salary.map((salaryDetails, index) => {
                  return (
                    <Card  key={index} style={{marginTop:'20px'}}>
                    <Card.Body>
                  <Card.Title>{salaryDetails.jobTitle}</Card.Title>
                  <Card.Text> ${salaryDetails.annualPay} per year</Card.Text>
                  </Card.Body>
                  </Card>
                  );
                        })}
              </div>

              <div class="col-3"> 
          <button type="button" class="btn btn-outline-primary btn-lg" style={{width:'100%'}} onClick={handleShow}>
          Add Salary Review
           </button>
             
           {/* <button type="button" class="btn btn-outline-info" style={{width:'100%'}} onClick={handleVisible}>
           Claimed Profile
             <i class="bi bi-check-circle-fill" style={{color:'green', marginLeft:'4px'}}></i>
           </button> */}

          <Card  style={{marginTop:'20px'}}>
           <Card.Body>
            <Card.Title onClick={handleVisible}>Claimed Profile
             <i class="bi bi-check-circle-fill" style={{color:'green', marginLeft:'4px'}}></i>
             </Card.Title>
             </Card.Body>
          </Card>

          <Card style={{marginTop:'20px'}}>
           <Card.Body>
            <Card.Title>Salary satisfaction</Card.Title>
            <Card.Text> <a href='/reviews'>Add your rating</a> </Card.Text>
             </Card.Body>
          </Card>
     </div>
     </div>
 </div>
 </div>     

      <Modal
        visible={visible}
        onHide={handleCloseVisible}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
      <Modal.Header closeButton>
          <Modal.Title>Can you tell us about yourself?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      An individual from this business has claimed this profile. However,
                Indeed does not verify the accuracy of this information, and not all information found on this profile has been provided by 
                or verified by the business.
        </Modal.Body>
      </Modal> 

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
      <Modal.Header closeButton>
          <Modal.Title>Can you tell us about yourself?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form onSubmit={addSalaryReview}>
              <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>What’s your company name?</Form.Label>
                  <Form.Control type="text" placeholder="Company Name" name="companyName" required/><br/>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Are you currently working at this company?</Form.Label>
                  <br/>
                  <ToggleButtonGroup type="radio" name="currentlyWorking">
                    <ToggleButton id="tbg-btn-1" value="Yes">
                      Yes
                    </ToggleButton>
                    <ToggleButton id="tbg-btn-2" value="No" onChange={()=>handleVisible} >
                      No
                    </ToggleButton>
                  </ToggleButtonGroup>
                  <br/>
                  <br/>
              </Form.Group>
              <Form.Group visible={visible}>
                  <Form.Label >End date</Form.Label>
                  <Form.Control type="text" placeholder="End Date" name="endDate" required/><br/>
              </Form.Group>
              <Form.Group>
                  <Form.Label>What’s your job title?</Form.Label>
                  <Form.Control type="text" placeholder="Job Title"  name="jobTitle" required/><br/>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Where’s your job location?</Form.Label>
                  <Form.Control type="text" placeholder="Job Location" name="jobLocation" required/><br/>
              </Form.Group>
              <Form.Group>
                  <Form.Label>What’s your annual pay at the company?</Form.Label>
                  <Form.Control type="number" placeholder="Annual Pay" name="annualPay" required/><br/>
              </Form.Group>
              <Form.Group>
                  <Form.Label>How many years of relevant experience do you have?</Form.Label>
                  <Form.Control type="number" placeholder="Experience"  name="yrsOfExp" required/><br/>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Which benefits do you receive at the company? </Form.Label> 
                  <Form.Check type="checkbox" label="Paid time off" id="paidTimeOff"/>
                  <Form.Check type="checkbox" label="Health Insurance" id="healthInsurance"/>
                  <Form.Check type="checkbox" label="Life insurance" id="lifeInsurance"/>
                  <Form.Check type="checkbox" label="Dental / Vision insurance" id="dentalVision"/>
                  <Form.Check type="checkbox" label="Retirement / 401(k)" id="retirement"/>
                  <Form.Check type="checkbox" label="Other benefits" id="otherBenefits"/><br/>
                  <Form.Label>Other Benefits</Form.Label>
                  <Form.Control as="textarea" rows={3} id="otherBenefitsText" name="otherBenefitsText"/>
              </Form.Group>   
              <br/>              
            <Button variant="primary" size="sm" type="submit">
              Add
            </Button>
            <h6 style={{ color: "red" }}>{errorMessage} </h6> 
            <Button variant="primary" size="sm" onClick={handleClose}>
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal> 


    </div>
  );
};

export default AddSalaryReview;