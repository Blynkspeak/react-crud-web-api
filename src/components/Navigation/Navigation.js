
/*return (
	
        )

        */


import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../Login/Login";
import OTP from "../Login/OTP";
import Events from "../Dashboard/Events";
import MyEvents from "../Dashboard/MyEvents";


export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	token :localStorage.getItem('token')
    };
  }

 logout =()=>{
 	console.log(this);
 	localStorage.clear();
 	this.props.history.push('/login');
 }
  
  render() {
  	if(!this.state.token){
    return (

      <div><nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/login" className="navbar-brand">
            Seetok
          </a>
          <div className="navbar-nav mr-auto">
           <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/login"]} component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/otp" component={OTP} />
          </Switch>
        </div></div>

    );
	}else{
		return (
		      <div><nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/login" className="navbar-brand">
            Seetok
          </a>
          <div className="navbar-nav mr-auto">
          <li className="nav-item">
              <Link to={"/events"} className="nav-link">
                Events
              </Link>
            </li>
			<li className="nav-item">
              <Link to={"/myevents"} className="nav-link">
                My events
              </Link>
            </li>
           <li className="nav-item">
             <button onClick={this.logout} className="btn btn-success">
              Logout
            </button>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route path="/Events" component={Events} />
            <Route path="/myevents" component={MyEvents} />

          </Switch>
        </div></div>)
	}
  }
}
