
import 'bootstrap/dist/css/bootstrap.min.css';
import {useSelector} from 'react-redux';
import JobSeekerNavbar from './JobSeekerNavbar';
import { color } from '@mui/system';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';

function Preferences(props) {
    let fullname = useSelector((state)=>state.userInfo.name);
    const id = useSelector((state)=>state.userInfo.id);
    const phone = useSelector((state)=>state.userInfo.phone);
    const email = useSelector((state)=>state.userInfo.email);
    const[hideSkip,setHideSkip] = useState(false);
    const[hideDiv,setHideDiv] = useState(true);
    const[resumeHeading, setResumeHeading] = useState('Add a resume to Indeed');
    const[resumeTextUpload,setResumeTextUpload]  = useState('Upload your resume');
    const[resumeTextCreate,setResumeTextCreate]  = useState('Create a new resume');
    const[hideContactDiv, setHideContactDiv] = useState(true);
    //const[showContactDiv, setShowContactDiv] = useState(true);

    fullname = fullname.split(/\s+/);
    const [fname,...lnames] = fullname;
    let lname = '';
    for(let ln of lnames) {
        lname += ln;
    }
    let hideResumeUpdate = ()  => {
        setResumeTextUpload('Upload a resume');
        setResumeTextCreate('Build a resume');
        setResumeHeading('Get Started');
        setHideSkip(true);
        setHideDiv(false);
    }
    let collapseContactInfo = () => {
        setHideContactDiv(true);
    }
    let expandContactInfo = () => {
        setHideContactDiv(false);
    }
    return (
        <div>
            <JobSeekerNavbar></JobSeekerNavbar>
            <div className="container-fullwidth" style={{marginTop:'5%',marginRight:'auto',marginLeft:'auto',width:'50%'}}>
                <div className="row border-bottom">
                    <h3 style={{color:'darkgray'}}><b>Job Preferences</b></h3>
                    <span style={{color:'darkgray'}}>Update preferences as needed to get better recommendations across Indeed.</span>
                </div>
                <div className="row" style={{border:'1px solid darkgray', boxShadow:'1px 1px 1px 1px darkgray',padding:'20px 20px 5px 20px'}}>
                    <h5><b>Interested</b></h5><p></p>
                    <span style={{color:'darkgray'}}>We’ll show you more jobs that include these details.</span><br></br>
                    <img src="/images/prefer.png" width='80px' height='40px'></img>
                    
                    <p><b>Add Preferences</b></p>
                    <p><small style={{color:'darkgray'}}>By continuing, you agree to create a public resume and agree to receiving job opportunities from employers.</small></p>
                </div><br></br>
                <div className="row" hidden={hideDiv} style={{border:'1px solid darkgray', boxShadow:'1px 1px 1px 1px darkgray',padding:'20px 20px 5px 20px'}}>
                    <b>Contact Information <img src="/images/pencil.png" height='15px' width='15px'style={{float:'right',cursor:'pointer'}} onClick={expandContactInfo}/></b><p></p>
                    <div hidden={hideContactDiv}>
                        <p><span style={{color:'red'}}>* </span><small style={{color:'darkgray'}}>Required Fields</small></p>
                        <Form>
                            <Form.Group className="mb-3" >
                                <Form.Label><b>First Name </b><span style={{color:'red'}}>* </span></Form.Label>
                                <Form.Control type="text" name = "fname" defaultValue={fname} required maxLength="45"></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label><b>Last Name </b><span style={{color:'red'}}>* </span></Form.Label>
                                <Form.Control type="text" name = "lname" defaultValue={lname} required maxLength="45"></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label><b>Email Address </b><img src="/images/padlock.png" height='15px' width='15px'/><span style={{color:'darkgray',fontSize:'12px'}}>only provided to employers you apply or respond to.</span></Form.Label>
                                <Form.Control type="email" name = "email" defaultValue={email} required maxLength="45"></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label><b>Phone Number (optional)</b><img src="/images/padlock.png" height='15px' width='15px'/><span style={{color:'darkgray',fontSize:'12px'}}>only provided to employers you apply or respond to.</span></Form.Label>
                                <Form.Control type="text" name = "phone" defaultValue={phone} pattern="[0-9]{10}" title="Please enter a 10 digit phone number"></Form.Control>
                            </Form.Group>
                            <Button variant="primary"  type="submit">
                            Save 
                            </Button>&nbsp; 
                            <Button variant="primary" onClick={collapseContactInfo}>
                            Cancel 
                            </Button>
                        </Form>
                    </div>
                    <div hidden={!hideContactDiv}>
                        <p>{email}  <img src="/images/padlock.png" height='15px' width='15px'/></p>
                        {phone!=null && phone.length>0 && <p>{phone}  <img src="/images/padlock.png" height='15px' width='15px'/></p>}
                        {(phone == null || phone.length==0) && <p><small><b>Add phone number</b></small></p>}
                    </div>
                    <p></p>
                </div><br></br>
                <div className="row" hidden={hideDiv} style={{border:'1px solid darkgray', boxShadow:'1px 1px 1px 1px darkgray',padding:'20px 20px 5px 20px'}}>
                    <b>Job Preferences <img src="/images/pencil.png" height='15px' width='15px'style={{float:'right'}}/></b><p></p>
                    <p></p>
                    <p><small style={{color:'darkgray'}}>Save specific details like desired pay and schedule that help us match you with better jobs</small></p>
                </div><br></br>
            </div>
            <p></p>
            <p style={{textAlign:'center'}}><b><u style={{color:'blue',cursor:'pointer'}} onClick={hideResumeUpdate} hidden={hideSkip}>Skip for now</u></b></p>
        </div>
    )
}

export default Preferences;