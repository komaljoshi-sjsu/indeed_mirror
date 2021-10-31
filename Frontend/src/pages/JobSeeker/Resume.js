
import 'bootstrap/dist/css/bootstrap.min.css';
import {useSelector} from 'react-redux';
import JobSeekerNavbar from './JobSeekerNavbar';
import { color } from '@mui/system';
import { Button } from 'react-bootstrap';
import { useState } from 'react';

function Resume(props) {

    const id = useSelector((state)=>state.userInfo.id);
    const email = useSelector((state)=>state.userInfo.email);
    const[hideSkip,setHideSkip] = useState(false);
    const[hideDiv,setHideDiv] = useState('true');
    const[resumeHeading, setResumeHeading] = useState('Add a resume to Indeed');
    const[resumeTextUpload,setResumeTextUpload]  = useState('Upload your resume');
    const[resumeTextCreate,setResumeTextCreate]  = useState('Create a new resume');
    let hideResumeUpdate = ()  => {
        setResumeTextUpload('Upload a resume');
        setResumeTextCreate('Build a resume');
        setResumeHeading('Get Started');
        setHideSkip(true);
        setHideDiv('false');
    }
    return (
        <div>
            <JobSeekerNavbar></JobSeekerNavbar>
            <div className="container-fullwidth" style={{marginTop:'5%',marginRight:'auto',marginLeft:'auto',width:'50%'}}>
                <div className="row" style={{hidden:{hideDiv}}}>
                    <h3 style={{color:'darkgray'}}><b>Your Name</b></h3>
                </div>
                <div className="row" style={{border:'1px solid darkgray', boxShadow:'1px 1px 1px 1px darkgray',padding:'20px 20px 5px 20px'}}>
                    <h3><b>{resumeHeading}</b></h3><p></p>
                    <div className="col">
                        <Button type='primary' style={{borderRadius: '15px 15px 15px 15px'}}>{resumeTextUpload}</Button>
                    </div>
                    <div className="col">
                        <Button type='primary' style={{borderRadius: '15px 15px 15px 15px'}}>{resumeTextCreate}</Button>
                    </div>
                    <p></p>
                    <p><small style={{color:'darkgray'}}>By continuing, you agree to create a public resume and agree to receiving job opportunities from employers.</small></p>
                </div><br></br>
                <div className="row" style={{hidden:hideDiv, border:'1px solid darkgray', boxShadow:'1px 1px 1px 1px darkgray',padding:'20px 20px 5px 20px'}}>
                    <b>Contact Information <img src="/images/pencil.png" height='15px' width='15px'style={{float:'right'}}/></b><p></p>
                    <p>{email}  <img src="/images/padlock.png" height='15px' width='15px'/></p>

                    <p></p>
                    <p><small><b>Add phone number</b></small></p>
                </div><br></br>
                <div className="row" style={{hidden:hideDiv, border:'1px solid darkgray', boxShadow:'1px 1px 1px 1px darkgray',padding:'20px 20px 5px 20px'}}>
                    <b>Job Preferences <img src="/images/pencil.png" height='15px' width='15px'style={{float:'right'}}/></b><p></p>
                    <p></p>
                    <p><small style={{color:'darkgray'}}>Save specific details like desired pay and schedule that help us match you with better jobs</small></p>
                </div><br></br>
            </div>
            <p></p>
            <p style={{textAlign:'center'}}><b><u style={{color:'blue'}} onClick={hideResumeUpdate} style={{hidden:{hideSkip}}}>Skip for now</u></b></p>
        </div>
    )
}

export default Resume;