
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
        //document.getElementById('zmmtg-root').style.display = "none";
  }
componentDidMount(){
	  this.setState({
	  	token :localStorage.getItem('token')
	  });
	document.getElementById('zmmtg-root').style.display = "none";
	//if(this.state.token){
		//window.location = '/events'};

}

 logout =()=>{
 	console.log(this);
 	localStorage.clear();
 	//this.props.history.push('/login');
 	window.location = "/login";
 }

  
  render() {
  	if(!this.state.token){
    return (
      <div><nav style={{borderBottom :'1px solid red'}} className="navbar navbar-expand ">
          <img style={{width:'100px'}} src="https://seetok-dev.web.app/assets/logo.png" alt="Seetok"/>
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
		      <div><nav style={{borderBottom :'1px solid pink'}} className="navbar navbar-expand ">
                    <img style={{width:'100px'}} src="https://seetok-dev.web.app/assets/logo.png" alt="Seetok"/>

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
             <span style={{backgroundColor:'pink',color:'white'}} onClick={this.logout} className="btn">
              Logout
            </span>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/events"]} component={Events} />
            <Route path="/events" component={Events} />
            <Route path="/myevents" component={MyEvents} />

          </Switch>
        </div></div>)
	}
  }
}
