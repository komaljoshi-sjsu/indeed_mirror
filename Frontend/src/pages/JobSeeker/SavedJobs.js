import 'bootstrap/dist/css/bootstrap.min.css'
import {useState, useEffect} from 'react';
import {Redirect} from 'react-router';
import JobSeekerNavbar from './JobSeekerNavbar';
import MyJobs from './MyJobs';
import axios from 'axios';
import Card from "react-bootstrap/Card";
import './css/snapshot.css';
import {backendServer} from '../../webConfig';
import {useSelector} from 'react-redux';
import { userActionCreator } from '../../reduxutils/actions.js'

function SavedJobs(props) {
    const companyid = useSelector((id)=>state.userActionCreator.id);
    const [jobs,setJobs] = useState([]);
    useEffect(()=> {
        axios.get(backendServer+'/api/savedjobs/'+userid)
        .then(res => {
            console.log('snapshot',res);
            if(res.data.code == '200') {
                setJobs(res.data.row);
            } else {
                alert(res.data.msg);
            }
        }).catch(err => {
            alert('Failed to get saved job details. Please check console');
            console.log(err);
        }); 
    },[jobs]);
    return (
        <div>
            <JobSeekerNavbar></JobSeekerNavbar><br></br>
            <div className="container-fullwidth" style={{marginLeft:'20%',marginRight:'20%'}}>
                <MyJobs></MyJobs>
                <div className="row">
                    <h2><b>My Jobs</b></h2>
                </div><br></br><br></br>
                {jobs.map(job=>  {
                    return (
                    <div  style={{float:"right"}}>
                        <div className="row">
                            <b>{job.role}</b>
                        </div>
                        <div className="row">
                            {job.jobTitle}
                        </div>
                        <div className="row">
                            {job.location}
                        </div>
                    </div>)
                })}
            </div>
        </div>
    )
}

export default SavedJobs;