
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
                    <h3><b>Job Preferences</b></h3>
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
                    <ul style={{listStyleType:'none'}}>
                        <li><img src="/images/plus.png" height='15px' width='15px'style={{cursor:'pointer'}}/>  Job title</li><br></br>
                        <li><img src="/images/plus.png" height='15px' width='15px'style={{cursor:'pointer'}}/>  Job types</li><br></br>
                        <li><img src="/images/plus.png" height='15px' width='15px'style={{cursor:'pointer'}}/>  Work schedule</li><br></br>
                        <li><img src="/images/plus.png" height='15px' width='15px'style={{cursor:'pointer'}}/>  Pay</li><br></br>
                        <li><img src="/images/plus.png" height='15px' width='15px'style={{cursor:'pointer'}}/>  Relocation</li><br></br>
                        <li><img src="/images/plus.png" height='15px' width='15px'style={{cursor:'pointer'}}/>  Remote</li><br></br>

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Preferences;