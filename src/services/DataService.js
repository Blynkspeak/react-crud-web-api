//import URL  from '../constants/Constants'
//import axios from 'axios'
class DataService {

  encode(data){
    let body = window.btoa(JSON.stringify(data));
    body = {
      'body': body
    }
    body = JSON.stringify(body);
    return body;
  }

 async getOtp(data){
 	var url = 'https://r7hvl6uiue.execute-api.ap-south-1.amazonaws.com/dev/loginemail'
 	  return fetch(url, {
      method: 'POST',
      body: this.encode(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => response.json())
  }


 async sendOtp(data){
 	var url = 'https://r7hvl6uiue.execute-api.ap-south-1.amazonaws.com/dev/loginotp'
 	  return fetch(url, {
      method: 'POST',
      body: this.encode(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => response.json())
  }

 async selectAccount(data){
 	var url = 'https://r7hvl6uiue.execute-api.ap-south-1.amazonaws.com/dev/chooseactiveaccount'
 	  return fetch(url, {
      method: 'POST',
      body: this.encode(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : localStorage.getItem('token')

      },
    }).then(response => response.json())
  }

 async listEvents(){
 	var url = 'https://r7hvl6uiue.execute-api.ap-south-1.amazonaws.com/dev/listevents'
 	  return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : localStorage.getItem('token')

      },
    }).then(response => response.json())
  }

 async enrolEvent(data){
 	var url = 'https://r7hvl6uiue.execute-api.ap-south-1.amazonaws.com/dev/enroll'
 	  return fetch(url, {
      method: 'POST',
      body: this.encode(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : localStorage.getItem('token')

      },
    }).then(response => response.json())
  }

 async startEvent(data){
 	var url = 'https://r7hvl6uiue.execute-api.ap-south-1.amazonaws.com/dev/createroomzoom'
 	  return fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : localStorage.getItem('token')

      },
    }).then(response => response.json())
  }

 async joinEvent(data){
 	var url = 'https://r7hvl6uiue.execute-api.ap-south-1.amazonaws.com/dev/joineventzoom'
 	  return fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : localStorage.getItem('token')

      },
    }).then(response => response.json())
  }



}

export default new DataService();