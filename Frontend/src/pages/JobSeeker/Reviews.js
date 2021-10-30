//sample employer component
import { React, Component} from 'react';
import axios from 'axios';
import {
    ButtonGroup, Button, Row, Col, Card, Container,
  } from 'react-bootstrap';
import { FaLongArrowAltDown } from 'react-icons/fa';
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
        rateSortFlag: false,
        dateSortFlag: false,
        helpfulSortFlag: false,
      };
    }
    
    componentDidMount() {
        // To-DO : Get selected company id
        const companyId = 1;
        const jobSeekerId = 1;
        let { reviewDetails } = this.state;
        reviewDetails = [];
        axios.get(`${backendServer}/companyReviews`, {
          params: {
            companyId,
            jobSeekerId,
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

      ratingSort = () => {
        this.setState({ rateSortFlag: true, dateSortFlag: false, helpfulSortFlag: false });
      }

      dateSort = () => {
        this.setState({ rateSortFlag: false, dateSortFlag: true, helpfulSortFlag: false });
      }

      helpfulSort= () => {
        this.setState({ rateSortFlag: false, dateSortFlag: false, helpfulSortFlag: true });
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
      // To-DO Fetch logged in userid from store
        const jobSeekerId = 1;
        const { reviewDetails, openModal, dateSortFlag, rateSortFlag, helpfulSortFlag } = this.state;
        const loggedInUserReviews =  reviewDetails.filter((review) => review.jobSeekerId === jobSeekerId);
        const otherUserReviews = reviewDetails.filter((review) => review.jobSeekerId !== jobSeekerId);
        const companies = reviewDetails.map(review => review.companyName);
        const companyName = companies[0];
        let sortedReviews =[];
        if(rateSortFlag){
          sortedReviews = reviewDetails.sort((a,b) => b.rating - a.rating);
        }
        if(dateSortFlag){
          sortedReviews = reviewDetails.sort((a,b) => b.postedDate - a.postedDate);
        }
        if(helpfulSortFlag){
          sortedReviews = reviewDetails.sort((a,b) => b.yesReviewHelpfulCount - a.yesReviewHelpfulCount);
        }
        const sortedReviewsDisplay = sortedReviews.map((review) => (
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
        const userReviews = loggedInUserReviews.map((review) => (
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
          const OtherReviews = otherUserReviews.map((review) => (
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
                 <Col> <h4>{companyName}{' '}Employee Reviews</h4>
                 </Col>
                 <Col />
                 <Col>
                 <Button onClick={this.addReview} style={{backgroundColor:'white', color:'#567cbb', border: '1px solid gray'}}><b>Review this company</b></Button>
                 </Col>
                </Row>
            </Card.Title>
            <Card.Body> 
                <b>Sort By</b>{' '} 
            <ButtonGroup>
                <Button className={helpfulSortFlag ? 'active' : 'customButton'} variant="light" onClick={this.helpfulSort}>Helpfulness<FaLongArrowAltDown /></Button>
                <Button className={rateSortFlag ? 'active' : 'customButton'} variant="light" onClick={this.ratingSort}>Rating<FaLongArrowAltDown /></Button>
                <Button className={dateSortFlag ? 'active' : 'customButton'} variant="light" onClick={this.dateSort}>Date<FaLongArrowAltDown /></Button>
            </ButtonGroup>
              </Card.Body>
              </Container>
              </Card>
              </Container>
              <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {(rateSortFlag || dateSortFlag || helpfulSortFlag) && sortedReviewsDisplay}
              {(!rateSortFlag && !dateSortFlag && !helpfulSortFlag) && userReviews}
              {(!rateSortFlag && !dateSortFlag && !helpfulSortFlag) && OtherReviews}
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