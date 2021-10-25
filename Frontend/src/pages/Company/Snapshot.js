import 'bootstrap/dist/css/bootstrap.min.css'
import {useState, useEffect} from 'react';
import {Redirect} from 'react-router';
import Header from './Header';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import Card from "react-bootstrap/Card";
import './css/snapshot.css';

import {userActionCreator} from '../../reduxutils/actions.js';

function Snapshot(props) {
    let companyid = 'sdfsf';
    const[whScore, setWHScore] = useState(0);
    const[apScore, setApScore] = useState(0);
    const[lScore, setLScore] = useState(0);
    const[size, setSize] = useState(0);
    const[ceo, setCeo] = useState('');
    const[founded, setFounded] = useState('');
    const[revenue, setRevenue] = useState('');
    const[industry, setIndustry] = useState('');
    const[survey, setSurvey] = useState(0);

    const[description, setDescription] = useState(0);
    const[mission, setMission] = useState('');
    const[reviews, setReviews] = useState([]);
    const[about, setAbout] = useState('');


    useEffect(()=> {
        // axios.get('http://localhost:5000/api/snapshot/'+companyid)
        // .then(res => {
        //     if(res.status == 200) {
        //         setWHScore(res.whScore);
        //         setApScore(res.apScore);
        //         setLScore(res.lScore);
        //     }
        // });
        setWHScore(60);
        setApScore(62);
        setLScore(65);
        setCeo('Jensen');
        setFounded('1969');
        setRevenue('100M');
        setSize(10000);
        setAbout("This is the ABOUT details of the company");
        setDescription('This is the description');
        setMission('This is tthe Mission if thee compmany.');
        const rvw = [{
            city:'San Jose',
            state: 'California',
            date: '23 July 2020',
            reviewerRole: 'Software Developer',
            title: 'Good place to work',
            reviewComments: "Overall Wendy's is an excellent, exciting an extremely rewarding place to be employed by, The Customer Service, Guest and Team is first rate in delivering impeccable and amazing Customer Service, Customer Satisfaction and all items Hot, Fresh and with passion as well as all frosties and Drinks with are cold and refreshing to the taste.",
            pros: 'Amazing',
            cons: 'Manageement needs to improve',
            rating: 5.0
        },{
            city:'San Mateo',
            state: 'California',
            date: '23 March 2020',
            reviewerRole: 'Software Tester',
            title: 'Bad place to work',
            reviewComments: "Overall Wendy's is an excellent, exciting an extremely rewarding place to be employed by, The Customer Service, Guest and Team is first rate in delivering impeccable and amazing Customer Service, Customer Satisfaction and all items Hot, Fresh and with passion as well as all frosties and Drinks with are cold and refreshing to the taste.",
            pros: 'Nothing',
            cons: 'Bad needs to improve',
            rating: 2.5
        }];
        setReviews(rvw);
    },[]);
    return (
        <div className="container-fullwidth" style={{marginLeft:'20%',marginRight:'20%'}}>
            <div className="row">
                <h2><b>Work Happiness</b></h2>
                <p><small style={{color:'gray'}}>Scores based on about {survey} responses to Indeed's survey on work happiness.</small></p>
                <div className="col">
                    <div>
                    {whScore} Work Happiness Score
                    </div><br></br>
                    <div className="infobox infobox1">
                        Do people feel happy at work most of the time?
                    </div>
                    
                </div>
                <div className="col">
                    <div>
                    {lScore} Learning
                    </div><br></br>
                    <div className="infobox infobox1">
                    Do people feel they often learn something at work?
                    </div>
                </div>
                <div className="col">
                    <div>
                    {apScore} Appreciation
                    </div><br></br>
                    <div className="infobox infobox1">
                    Do people feel they are appreciated as a person at work?
                    </div>
                </div>
            </div><br></br><br></br>
            <div className="row">
                <h2><b>About the Company</b></h2>
                <div className="col">
                    <Card>
                        <Card.Body>
                            <Card.Title>CEO</Card.Title>
                            <Card.Text>
                            {ceo}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col">
                    <Card>
                        <Card.Body>
                            <Card.Title>Founded</Card.Title>
                            <Card.Text>
                            {founded}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col">
                    <Card>
                        <Card.Body>
                            <Card.Title>Company Size</Card.Title>
                            <Card.Text>
                            More than {size}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col">
                    <Card>
                        <Card.Body>
                            <Card.Title>Revenue</Card.Title>
                            <Card.Text>
                            {revenue}(USD)
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col">
                    <Card>
                        <Card.Body>
                            <Card.Title>Industry</Card.Title>
                            <Card.Text>
                            {industry}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div><br></br>
            <div className="row">
                <p style={{color:"darkgray"}}>About Us</p>{about}<br></br>
                <p>Description:</p>{description}
                <p>Mission:</p>{mission}
            </div><br></br><br></br>
            <div className="row">
                <h2><b>Featured Reviews</b></h2>
                {reviews.map(review=> {
                    return (
                        <div>
                            <div>
                                <p><img src="/images/user.png" height='24px' width='24px'/><small style={{color:"gray"}}> {review.reviewerRole} in {review.city},{review.state}</small></p>
                                <b>{review.rating} </b><img src="/images/star.png" height='19px' width='19px'/><span style={{color:"gray"}}> on {review.date}</span>
                                <p><b>{review.title}</b><br></br></p>
                                <p>{review.reviewComments}</p><br></br>
                                <p><b>Pros:</b></p>
                                <p>{review.pros}</p><br></br>
                                <p><b>Cons:</b></p>
                                <p>{review.cons}</p>

                            </div><br></br>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Snapshot;