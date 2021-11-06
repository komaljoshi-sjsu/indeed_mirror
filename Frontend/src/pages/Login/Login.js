import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import jwt_decode from 'jwt-decode'
import backendServer from '../../webConfig'
import { userActionCreator } from '../../reduxutils/actions.js'
import logo from '../../images/Indeed_logo.png'

function Login(props) {
  const [redirectVal, redirectValFn] = useState(null)
  const dispatch = useDispatch()

  const setEmail = bindActionCreators(userActionCreator.setEmail, dispatch)
  const setId = bindActionCreators(userActionCreator.setId, dispatch)
  const setAccountType = bindActionCreators(
    userActionCreator.setAccountType,
    dispatch,
  )
  const setName = bindActionCreators(userActionCreator.setName, dispatch)
  const setPhone = bindActionCreators(userActionCreator.setPhone, dispatch)
  const setResumeUrl = bindActionCreators(
    userActionCreator.setResumeUrl,
    dispatch,
  )
  const setToken = bindActionCreators(userActionCreator.setToken, dispatch)

  let redirectToSignUp = (e) => {
    redirectValFn(<Redirect to="/signup" />)
  }

  let signIn = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const email = formData.get('email')
    const password = formData.get('password')
    const accountType =
      formData.get('accountType') == 'Employer' ? 'Employer' : 'JobSeeker'

    axios
      .post(`${backendServer}/api/login`, {
        email: email,
        password: password,
        accountType: accountType,
      })
      .then(
        (res) => {
          if (res.status != 200) {
            alert(res.data)
          } else {
            alert('Successfully logged in')
            //const jwt_decode = require('jwt-decode');
            setToken(res.data)
            var decoded = jwt_decode(res.data.split(' ')[1])
            const user = decoded.user
            console.log(decoded)
            setEmail(user.email)
            setName(user.name)
            setAccountType(accountType)
            setId(user.id)
            setPhone(user.jobSeekerContact)
            if (accountType == 'JobSeeker') {
              setResumeUrl(decoded.resumeUrl)
              redirectValFn(<Redirect to="/resume" />)
            } else if (accountType == 'Employer') {
              redirectValFn(<Redirect to="/employerprofile" />)
            } else if (accountType == 'Admin') {
              //redirectValFn(<Redirect to="/employerprofile"/>);
            }
          }
        },
        (error) => {
          alert('Failed to Login. Please refer console for more details.')
          console.log(error)
        },
      )
  }
  return (
    <div
      className="container-fullwidth"
      style={{ margin: 'auto', marginTop: '5%', width: '30%' }}
    >
      {redirectVal}
      <div className="row">
        <a class="navbar-brand" href="/landingPage">
          <img
            src={logo}
            alt=""
            width="120"
            height="30"
            class="d-inline-block align-text-top"
          />
        </a>
      </div>
      <br></br>
      <br></br>
      <div
        className="row"
        style={{ background: 'whitesmoke', padding: '10% 5% 5% 5%' }}
      >
        <div className="row">
          <p>
            <b>Sign In</b>
          </p>
        </div>
        <br></br>
        <div className="row">
          <p>
            <small>
              By signing in to your account, you agree to Indeed's{' '}
              <u style={{ color: 'blue' }}>Terms of Service </u>and consent to
              our <u style={{ color: 'blue' }}>Cookie Policy </u>and{' '}
              <u style={{ color: 'blue' }}>Privacy Policy</u>.
            </small>
          </p>
        </div>
        <br></br>
        <div className="row">
          <Form onSubmit={signIn}>
            <Form.Group className="mb-3">
              <Form.Label>
                <b>Email Address</b>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                maxLength="45"
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <b>Password</b>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                maxLength="8"
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="radio"
                label="Job Seeker"
                name="accountType"
                value="Job Seeker"
                required
              />
              <Form.Check
                type="radio"
                label="Employer"
                name="accountType"
                value="Employer"
              />
            </Form.Group>
            <Button
              bsStyle="primary"
              bsSize="large"
              block
              style={{ width: '100%' }}
              type="submit"
            >
              Sign In
            </Button>
          </Form>
        </div>
        <div className="row" style={{ color: 'grey', textAlign: 'center' }}>
          <p>---------------or---------------</p>
          <p style={{ color: 'navy' }} onClick={redirectToSignUp}>
            New to Indeed? Create an account
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
