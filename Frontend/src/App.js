import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import {toast} from 'react-toastify'
import React from 'react'; 
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/Login/Login';
import Employer from './pages/Employer/Employer';
import PostJob from './pages/Employer/PostJob';

toast.configure()

function Routing() {
  return (
    <Switch>
        <Route exact path="/login" component={Login} />  
        <Route exact path="/employer" component={Employer} />   
        <Route exact path="/postJob" component={PostJob} />  
    </Switch>
  );
}


function App() {
  return (
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
  );
}

export default App;
