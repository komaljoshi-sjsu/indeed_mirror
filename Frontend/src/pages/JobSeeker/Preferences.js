
import 'bootstrap/dist/css/bootstrap.min.css';
import {useSelector} from 'react-redux';
import JobSeekerNavbar from './JobSeekerNavbar';
import { color } from '@mui/system';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import {Redirect} from 'react-router';

function Preferences(props) {

    const[question, setQuestion] = useState('');
    const[heading, setHeading] = useState('');
    const[modal, showModal] = useState(false);
    const[modalDiv, setModalDiv] = useState(null);
    const[redirectTo, setRedirectTo] = useState(null);
    let initModal = (question, heading) => {
        setQuestion(question);
        setHeading(heading);
        showModal(true);
        switch(heading) {
            case 'Job Types':
                setModalDiv(
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Control type="text" name = "jobtype" required maxLength="45"></Form.Control>
                        </Form.Group>
                        <Button variant="primary"  type="submit">
                            Save
                        </Button>&nbsp;
                        <Button variant="primary" onClick={()=>showModal(false)}>
                            Cancel
                        </Button>
                    </Form>
                );
                break;
            case 'Job Title':
                setModalDiv(
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Control type="text" name = "jobtitle" required maxLength="45"></Form.Control>
                        </Form.Group>
                        <Button variant="primary"  type="submit">
                            Save
                        </Button>&nbsp;
                        <Button variant="primary" onClick={()=>showModal(false)}>
                            Cancel
                        </Button>
                    </Form>
                );
                break;
            case 'Work Schedules':
                setModalDiv(
                    <Form>
                        <Form.Group className="mb-3" >
                            <b>Day ranges</b>
                            <Form.Check type="checkbox" label='Weekend availability' name="drwa"/>
                            <Form.Check type="checkbox" label='Monday to Friday' name="drmf"/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <b>Shifts</b>
                            <Form.Check type="checkbox" label='8 hour shift' name="shift1"/>
                            <Form.Check type="checkbox" label='10 hour shift' name="shift2"/>
                            <Form.Check type="checkbox" label='12 hour shift' name="shift3"/>
                            <Form.Check type="checkbox" label='Day shift' name="shift4"/>
                            <Form.Check type="checkbox" label='Night shift' name="shift5"/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <b>Other</b>
                            <Form.Check type="checkbox" label='On call' name="other1"/>
                            <Form.Check type="checkbox" label='Holidays' name="other2"/>
                            <Form.Check type="checkbox" label='Holidays' name="other3"/>
                        </Form.Group>
                        <Button variant="primary"  type="submit">
                            Save
                        </Button>&nbsp;
                        <Button variant="primary" onClick={()=>showModal(false)}>
                            Cancel
                        </Button>
                    </Form>
                );
                break;
            case 'Remote':
                setModalDiv(
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Check type="checkbox" label='Remote' name="rem1"/>
                            <Form.Check type="checkbox" label='Hybrid remote' name="rem2"/>
                            <Form.Check type="checkbox" label='In person' name="rem3"/>
                            <Form.Check type="checkbox" label='Temporarily remote (COVID-19)' name="rem4"/>
                        </Form.Group>
                        <Button variant="primary"  type="submit">
                            Save
                        </Button>&nbsp;
                        <Button variant="primary" onClick={()=>showModal(false)}>
                            Cancel
                        </Button>
                    </Form>
                );
                break;
            case 'Pay':
                setModalDiv(
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Control type="number" name = "payamount" required min="0"></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control as="select" name='paycat'>
                                <option value="per hour">per hour</option>
                                <option value="per day">per day</option>
                                <option value="per week">per week</option>
                                <option value="per month">per month</option>
                                <option value="per year">per year</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary"  type="submit">
                            Save
                        </Button>&nbsp;
                        <Button variant="primary" onClick={()=>showModal(false)}>
                            Cancel
                        </Button>
                    </Form>
                );
                break;
            case 'Relocation':
                setModalDiv(
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Check type="checkbox" label="Yes, I'm willing to relocate" name="relocate"/>
                        </Form.Group>
                        <Button variant="primary"  type="submit">
                            Save
                        </Button>&nbsp;
                        <Button variant="primary" onClick={()=>showModal(false)}>
                            Cancel
                        </Button>
                    </Form>
                );
                break;
        }
    }
    return (
        <div>
            {redirectTo}
            <JobSeekerNavbar></JobSeekerNavbar>
            <Modal show={modal} onHide={()=> showModal(false)}>
                <Modal.Header>
                    <Modal.Title>{heading}</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <h5><b>{question}</b></h5><p></p>
                    {modalDiv}
                </Modal.Body>
            </Modal>
            <div className="container-fullwidth" style={{marginTop:'5%',marginRight:'auto',marginLeft:'auto',width:'50%'}}>
                <div className="row border-bottom">
                    <h3><img src="/images/left-arrow.png" onClick={()=>setRedirectTo(<Redirect to="/resume"/>)} height='30px' width='30px' style={{cursor:'pointer'}}/><br></br><p></p><b>Job Preferences</b></h3>
                    <span style={{color:'darkgray'}}>Update preferences as needed to get better recommendations across Indeed.</span>
                    <p></p>
                </div>
                <div className="row" style={{marginTop:'5%'}}>
                    <h5><b>Interested</b></h5><p></p>
                    <span style={{color:'darkgray'}}>We’ll show you more jobs that include these details.</span><br></br>
                    <p></p>
                </div><br></br>
                <div className="row">
                    <img src="/images/prefer.png"></img>
                </div>
                <div className="row">
                    <p><b>Add Preferences</b></p>
                    <ul style={{listStyleType:'none',cursor:'pointer'}}>
                        <li onClick={()=>initModal('What is your job title','Job Title')}><img src="/images/plus.png" height='15px' width='15px'style={{cursor:'pointer'}} />  &nbsp;&nbsp;Job title</li><br></br>
                        <li onClick={()=>initModal('What are your desired job types?','Job Types')}><img src="/images/plus.png" height='15px' width='15px'style={{cursor:'pointer'}} />  &nbsp;&nbsp;Job types</li><br></br>
                        <li onClick={()=>initModal('What are your desired work schedules?','Work Schedules')}><img src="/images/plus.png" height='15px' width='15px'/>  &nbsp;&nbsp;Work schedule</li><br></br>
                        <li onClick={()=>initModal('What is your desired minimum pay?','Pay')}><img src="/images/plus.png" height='15px' width='15px'/>  &nbsp;&nbsp;Pay</li><br></br>
                        <li onClick={()=>initModal('Are you willing to relocate?','Relocation')}><img src="/images/plus.png" height='15px' width='15px'/>  &nbsp;&nbsp;Relocation</li><br></br>
                        <li onClick={()=>initModal('What is your desired work setting?','Remote')}><img src="/images/plus.png" height='15px' width='15px'/>  &nbsp;&nbsp;Remote</li><br></br>

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Preferences;