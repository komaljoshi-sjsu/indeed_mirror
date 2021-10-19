import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form';
import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router';

function Login(props) {

    const[redirectVal,redirectValFn] = useState(null);
    let redirectToSignUp = (e) => {
        redirectValFn(<Redirect to="/signup"/>);
    }

    let signIn = (e) => {
        e.preventDefault();
    }
    return (
        <div className="container-fullwidth" style={{background:'whitesmoke',margin:'auto', marginTop:'10%', width:'30%'}}>
            <div className="row" style={{padding:'5% 5% 5% 5%'}}>
                <div className="row">
                    <p><b>Sign In</b></p>
                </div><br></br>
                <div className="row">
                    <p><small>By signing in to your account, you agree to Indeed's <u style={{color:'blue'}}>Terms of Service </u>and consent to our <u style={{color:'blue'}}>Cookie Policy </u>and <u style={{color:'blue'}}>Privacy Policy</u>.</small></p>
                </div><br></br>
                <div className="row">
                    <Form onSubmit = {signIn}>
                        <Form.Group className="mb-3" >
                            <Form.Label><b>Email Address</b></Form.Label>
                            <Form.Control type="email" placeholder="Enter Email" name = "email" maxLength="45" required></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label><b>Password</b></Form.Label>
                            <Form.Control type="password" placeholder="Password" name = "password" maxLength="8" required></Form.Control>
                        </Form.Group>
                        <Button bsStyle="primary" bsSize="large" block style={{width:'100%'}}>
                            Sign In
                        </Button>
                    </Form>
                </div>
                <div className="row" style={{color:'grey',textAlign:'center'}}>
                    <p>---------------or---------------</p>
                    <p style={{color:'navy'}} onClick={redirectToSignUp}>New to Indeed? Create an account</p>
                </div>
            </div>
        </div>
    )
}

export default Login;