import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './pages/Login/Login.js';
import Home from './common/Home';
//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/login" component={Login}/>
                <Route path="/home" component={Home}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;