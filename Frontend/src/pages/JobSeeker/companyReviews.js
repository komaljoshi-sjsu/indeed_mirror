//sample employer component
import { React, Component} from 'react';
import axios from 'axios';
import { Button, Row, Col, Card, Container, Form,
  } from 'react-bootstrap';
  import ReactStars from "react-rating-stars-component";
import backendServer from '../../webConfig';
import '../../style/button-group.css';
import { Link } from 'react-router-dom';

class Reviews extends Component {
    constructor(props) {
      super(props);
      this.state = {
        reviewDetails: [],
        successMsg: '',
        companyName: '',
        location: ''
      };
    }
    
    componentDidMount() {
        let { reviewDetails } = this.state;
        axios.get(`${backendServer}/allReviews`)
          .then((response) => {
            this.setState({
                reviewDetails: reviewDetails.concat(response.data),
              });
          });
      }

      handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      }

      handleSubmit = (e, reviewId) => {
        
        const { reviewDetails } = this.state;
        const index = reviewDetails.findIndex((review) => review.reviewId === reviewId);
        const reviews = [...reviewDetails];
        const inputData = {
          reviewId: reviews[index].reviewId,
        }
        reviews[index].isFeatured = 1;
        this.setState({reviewDetails : reviews});
        console.log(inputData);
        axios
          .post(`${backendServer}/updateFeaturedReview`, inputData)
          .then((response) => {
            if (response.status === 200) {
              this.setState({ successMsg: response.data });
            } else {
              this.setState({ errorMsg: response.data });
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }

    render() {
      // To-DO Fetch logged in userid from store
        const { reviewDetails, companyName, location } = this.state;
        console.log(reviewDetails);
       
        const reviewsDisplay = reviewDetails.map((review) => (
          <div>
            <Card style={{ width: '20rem', margin: '0.1em', border: 'none' }}>
                <Card.Body>
                    <Row>
                <Col xs={2}><img src="../../../images/user.png" alt="helo" style={{ maxHeight: '30px', maxWidth: '30px' }} /></Col>
                <Col xs={5}>
                <Link style={{color:'black', textDecoration: 'none'}} to="/snapshot"><h5>{review.companyName}</h5></Link>
                  </Col>
                  <Col xs={4}/>
                  </Row>
                    <Row>  
                    <Col xs={5}>
                <ReactStars
                    count={5}
                    size={20}
                    value={review.companyAvgRating}
                    isHalf={true}
                    activeColor="#9d2b6b"
                    edit={false}
                  />
                  </Col>
                  <Col xs={4}>
                  <Link style={{textDecoration: 'none'}} to="/reviews"><small>{review.noOfReviews}{' '}reviews</small></Link>
                  </Col>
                  </Row>
                  <Row>
                      <Col xs={5}>
                      <Link style={{color:'#7d7d7d', textDecoration: 'none'}} to="/findSalaries">Salaries</Link>
                      </Col>
                      <Col xs={4}>
                      <Link style={{color:'#7d7d7d', textDecoration: 'none'}} to="/findSalaries">Open Jobs</Link>
                      </Col>
                  </Row>
              </Card.Body>
            </Card>
          </div>
        ));
      return (
        <div>
            <br></br>
            <Container style={{ width: '70rem', display:'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start' }}>
            
            <Card style={{ width: '50rem', margin: '0.8em', border: 'none' }}>
            <Card.Title>
            
                 <h1>Find great places to work</h1><br />
                
                  <h4 style={{color:'#7d7d7d'}}>Get access to millions of company reviews</h4><br />
                  <Row>
                      <Col>Company Name
                      </Col>
                      <Col>City, State, or Zip(Optional)
                      </Col>
                      <Col />
                  </Row>
                  <Row>
                  <Col>
                <Form.Group className="mb-3">
                  <Form.Control name="companyName" type="text"
                  className="mr-sm-2" onChange={this.handleChange} value={companyName}/>
                </Form.Group>
              </Col>
                      <Col><Form.Group className="mb-3">
                  <Form.Control name="location" type="text"
                  className="mr-sm-2" onChange={this.handleChange} value={location} />
                </Form.Group>
                      </Col>
                      <Col>
                <Button style={{backgroundColor:'#2457a7'}} type="submit" onClick={this.handleSubmit}>
                  <b>Find Companies</b>
                </Button>
              </Col>
                  </Row>
                  <br /> 
              <h3>Popular companies</h3>
            </Card.Title>
              </Card>  
              <br /> 
            
              {reviewsDisplay}
              </Container>
        </div>
      );
    }
  }
  export default Reviews;