import React, { Component } from "react";
import DataService from "../../services/DataService";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.newTutorial = this.newTutorial.bind(this);
    this.state = {
      id: null,
      OTP: '',
      published: false,
      submitted: false
    };
  }

  onChangeOTP = (e) => {
    console.log(e.target.value);
    this.setState({
      OTP: e.target.value
    });
  }

  sendOTP = () => {
    var body =
    {
      'email': localStorage.getItem('phone_number'),
      'otp' : this.state.OTP
    };
    console.log(body);
    DataService.sendOtp(body)
      .then(response => {    
        try{
          response = JSON.parse(window.atob(response));
        if (response.previouslogin === 'no') {
          if (response.status === 'success') {
            localStorage.setItem('logintype', "custom");
            localStorage.setItem('token', response.token);
            localStorage.setItem('username', response.username);
            localStorage.setItem('email', response.email);
            this.props.history.push('/events');
           
          } else if (response.status === 'falure') {
            if (response.Msg === 'password doesnot match') {
             alert("Otp doesn't match, please enter correct otp");
            }
          }
        } else {
          if (response.Msg === 'password doesnot match' || response.status !== 'success') {
            this.presentToast("Otp doesn't match, please enter correct otp");
          } else {
            localStorage.setItem('logintype', "custom");
            localStorage.setItem('token', response.token);
            localStorage.setItem('username', response.username);
            //this.singlesignin(value);
            let body = {
              'account': "current",
            };
            DataService.selectAccount(body)
            .then(response => { 
           response = JSON.parse(window.atob(response));
           if (response.status === 'success') {
                this.props.history.push('/events');

          } else if (response.status === 'failure') {
            localStorage.clear();
            }
             }); 

          }
      
      }

      }catch(e){

      }})
      .catch(e => {
        console.log(e);
      });
  }

  newTutorial() {
    this.setState({
      id: null,
      OTP: "",
      description: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        
          <div>
            <div className="form-group">
              <label htmlFor="OTP">Enter OTP</label>
              <input
                type="number"
                className="form-control"
                id="OTP"
                required
                value={this.state.OTP}
                onChange={this.onChangeOTP}
                name="OTP"
              />
            </div>

            
            <button onClick={this.sendOTP} className="btn btn-success">
              Login
            </button>
          </div>
      </div>
    );
  }
}
