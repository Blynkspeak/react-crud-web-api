import React, { Component } from "react";
import DataService from "../../services/DataService";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.newTutorial = this.newTutorial.bind(this);
    this.state = {
      id: null,
      PhoneNumber: 9535461483,
      published: false,
      submitted: false
    };
  }

  onChangePhoneNumber = (e) => {
    console.log(e.target.value);
    this.setState({
      PhoneNumber: e.target.value
    });
  }

  getOtp = () => {
    var phone_number = '+91'+this.state.PhoneNumber
    var body =
    {
      'email': phone_number
    };
    console.log(body);
    DataService.getOtp(body)
      .then(response => {
          response = JSON.parse(window.atob(response));
        /*this.setState({
          id: response.data.id,
          PhoneNumber: response.data.PhoneNumber,
          description: response.data.description,
          published: response.data.published,
          submitted: true
        });*/      
        try{

        if (response.status === 'success') {
          localStorage.setItem('email', phone_number);
          localStorage.setItem('phone_number', phone_number);
          localStorage.setItem('logintype', "custom");
          this.props.history.push('/otp');
          //setUserOTPField(1);
        }
        else {

        }
      }
      catch(e){
         // alert(e);
      }

      })
      .catch(e => {
        console.log(e);
      });
  }

  newTutorial() {
    this.setState({
      id: null,
      PhoneNumber: "",
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
              <label htmlFor="PhoneNumber">Phone Number</label>
              <input
                type="number"
                className="form-control"
                id="PhoneNumber"
                required
                value={this.state.PhoneNumber}
                onChange={this.onChangePhoneNumber}
                name="PhoneNumber"
              />
            </div>

            
            <button onClick={this.getOtp} className="btn btn-success">
              Get OTP
            </button>
          </div>
      </div>
    );
  }
}
