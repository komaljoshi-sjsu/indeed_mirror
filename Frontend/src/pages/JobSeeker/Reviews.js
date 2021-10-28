//sample employer component
import { React, Component} from 'react';
import axios from 'axios';
import {
    ButtonGroup, Button, Row, Col, Card, Container,
  } from 'react-bootstrap';
  import ReactStars from "react-rating-stars-component";
import backendServer from '../../webConfig';
import '../../style/button-group.css';
import ReviewModal from '../JobSeeker/ReviewModal';

class Reviews extends Component {
    constructor(props) {
      super(props);
      this.state = {
        reviewDetails: [],
        openModal: false,
      };
    }
    
    componentDidMount() {
        // To-DO : Get selected company id
        const companyId = 1;
        let { reviewDetails } = this.state;
        reviewDetails = [];
        axios.get(`${backendServer}/companyReviews`, {
          params: {
            companyId,
          },
        })
          .then((response) => {
            this.setState({
                reviewDetails: reviewDetails.concat(response.data),
              });
          });
      }

      addReview = (e) => {
        e.preventDefault();
        this.setState({ openModal: true });
      }

      closeModal = () => {
        this.setState({ openModal: false });
      }

      handleSubmit = (e, reviewId, type) => {
        const { reviewDetails } = this.state;
        const index = reviewDetails.findIndex((review) => review.reviewId === reviewId);
        const reviews = [...reviewDetails];
        if(type === 'Yes'){
          const { yesReviewHelpfulCount } = reviews[index];
          reviews[index].yesReviewHelpfulCount = yesReviewHelpfulCount+1;
          this.setState({ reviewDetails: reviews });
        }else{
          const { noHelpfulCount } = reviews[index];
          reviews[index].noHelpfulCount = noHelpfulCount+1;
          this.setState({ reviewDetails: reviews });
        }
        const inputData = {
          reviewId: reviews[index].reviewId,
          yesReviewHelpfulCount: reviews[index].yesReviewHelpfulCount,
          noHelpfulCount: reviews[index].noHelpfulCount,
        }
        console.log(inputData);
        axios
          .post(`${backendServer}/updateHelpfulCount`, inputData)
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
        const { reviewDetails, openModal } = this.state;
        const reviews = reviewDetails.map((review) => (
            <div>
              <br />
              <Card style={{ width: '60rem', margin: '0.8em' }}>
                <Card.Body>
                  <Row>
                  <Col xs={2}>
                  <Card.Title>
                    <b>{review.rating}</b>
                    <ReactStars
                      count={5}
                      size={15}
                      value={review.rating}
                      isHalf={true}
                      activeColor="#9d2b6b"
                      edit="false"
                    />
                  </Card.Title>
                  </Col>
                  <Col xs={8}>
                  <Card.Title>
                    <b>{review.reviewTitle}</b>
                  </Card.Title>
                  <Card.Text>
                    <small>{review.reviewerRole}{' - '}{review.city}{', '}{review.state}{' - '}{new Date(review.postedDate).toDateString()}</small>
                  </Card.Text>
                  <Card.Text>
                  {review.reviewComments}
                  </Card.Text>
                  <Card.Text>
                  <b>Pros</b><br />
                  {review.pros}<br />
                  <b>Cons</b><br />
                  {review.cons}<br />
                  </Card.Text>
                  <Card.Text>
                    <small>Was this review helpful?</small><br />
                    <Button variant='light' style={{background:'lightgray'}} onClick={(e) => { this.handleSubmit(e, review.reviewId, 'Yes'); }}>Yes{' '}{review.yesReviewHelpfulCount}</Button>{' '}
                    <Button variant='light' style={{background:'lightgray'}} onClick={(e) => { this.handleSubmit(e, review.reviewId, 'No'); }}>No{' '}{review.noHelpfulCount}</Button>
                  </Card.Text>
                  </Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>
          ));
      return (
        <div>
            
            <br></br>
            <Container style={{ display: 'flex', justifyContent: 'center' }}>
            
            <Card style={{ width: '60rem', margin: '0.8em', background:'whitesmoke' }}>
                <Container>
            <Card.Title>
              <br />
               <Row>
                 <Col> <h4>{' '}Employee Reviews</h4>
                 </Col>
                 <Col>
                 <Button onClick={this.addReview} style={{backgroundColor:'white', color:'#567cbb', border: '1px solid gray'}}><b>Review this company</b></Button>
                 </Col>
                </Row>
            </Card.Title>
            <Card.Body> 
                <b>Sort By</b>{' '} 
            <ButtonGroup>
                <Button className="customButton" variant="light" >Helpfulness</Button>
                <Button className="customButton" variant="light" >Rating</Button>
                <Button className="active" variant="light" >Date</Button>
            </ButtonGroup>
              </Card.Body>
              </Container>
              </Card>
              </Container>
              <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {reviews}
              </Container>
              { openModal
                  ? (
                    <ReviewModal
                      closeModal={this.closeModal}
                      addReview={this.addReview}
                    />
                  )
                  : null}
        </div>
      );
    }
  }
  export default Reviews;