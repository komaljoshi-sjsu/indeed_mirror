
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form';
import {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import jwt_decode from "jwt-decode";

import {userActionCreator} from '../../reduxutils/actions.js';
import Snapshot from './Snapshot.js';
import Card from "react-bootstrap/Card";

function JoinUs(props) {

    const[size, setSize] = useState(0);
    const[ceo, setCeo] = useState('');
    const[founded, setFounded] = useState('');
    const[revenue, setRevenue] = useState('');
    const[industry, setIndustry] = useState('');
    const[survey, setSurvey] = useState(0);

    const[description, setDescription] = useState(0);
    const[mission, setMission] = useState('');
    const[about, setAbout] = useState('');
    const[values,setValues] = useState([]);
    const[culture,setCulture] = useState('');
    useEffect(() => {
        setCeo('Jensen');
        setFounded('1969');
        setRevenue('100M');
        setSize(10000);
        setAbout("This is the ABOUT details of the company");
        setDescription('This is the description');
        setMission('This is tthe Mission if thee compmany.');
        setValues(["Give something back","Local Giving","Foster care Adoption"]);
        setCulture("Wendy’s Restaurant Support Center (RSC) is in Dublin, Ohio, a suburb of Columbus. Employees at the RSC support restaurant teams across the globe, and we’re looking for individuals with a track record of achievement who share our core values.  When you join Wendy’s, it’s like joining a family – a family with a rich heritage and culture established by our founder, Dave Thomas. Like Dave, we believe in celebrating unique qualities and talents, supporting one another, and going the extra mile to support our vision of becoming the world’s most thriving and beloved restaurant brand.");
    },[]);
    return (
        <div className="container-fullwidth" style={{marginLeft:'20%',marginRight:'20%'}}>
            <div className="row">
                <h2><b>About Us</b></h2>
                <p>{about}</p>
            </div><br></br>
            <div className="row">
                <h2><b>Work Culture</b></h2>
                <p>{culture}</p>
            </div><br></br>
            <div className="row">
                <h2><b>Company Values</b></h2>
                {values.map(value=> {
                    return (
                        <p>{value}</p>
                    )
                })}
                
            </div><br></br>
        </div>
    )
}

export default JoinUs;