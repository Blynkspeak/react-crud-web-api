import React, { Component } from "react";
import DataService from "../../services/DataService";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { ZoomMtg } from "@zoomus/websdk";

const API_KEY = 'ZINaR7MpQxKqrj27uOlWgQ';
// Add this, never use it client side in production
const API_SECRET = 'FXkp7KBRhgjm3NwgChAAi0MEl8ViZZPXVpK7';
export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      PhoneNumber: 9535461483,
      published: false,
      submitted: false,
      list :[]
    };
    document.body.style.overflow ="auto";
    document.getElementById('zmmtg-root').style.display = "none";

  }
  componentDidMount(){
        ZoomMtg.setZoomJSLib("https://source.zoom.us/1.8.0/lib", "/av");
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareJssdk();
        this.EventList();
  }

  onChangePhoneNumber = (e) => {
    console.log(e.target.value);
    this.setState({
      PhoneNumber: e.target.value
    });
  }


 Enrol= async(item) =>{
  var body = {
    username: item.username,
    eventid : item.eventid
  };
    DataService.enrolEvent(body)
      .then(response => {
    response = JSON.parse(window.atob(response));    
    //console.log(response);
    if(response.status === "success"){
       alert("Enrolled successfully");
    }
    else{
      alert('Already enrolled');
    }
      });


  //console.log(item);
}
Join= async(item) =>{
//write api call and join event function here
  var body = {
  eventid : item.eventid
  };

      DataService.joinEvent(body)
      .then(response => {
          alert(JSON.stringify(response));

  if(response.status==="success"){
    var data = {
      meetingNumber : (response.meetingdata.id).toString(),
      //password : response.meetingdata.join_url.split("pwd=")[1],
      //password : response.meetingdata.password,
	  password :'VVpwMGQxaXF1eWttK1Q5bVlqdlFiQT09',
	  email: response.meetingdata.host_email
    }
    this.launchMeeting(data);
    //joinmeet(response.meetingdata.id.toString(), response.meetingdata.password);
  }
  else{
    alert("join failed");
  }
  });
}


  EventList = () => {

    DataService.listEvents()
      .then(response => {
          response = JSON.parse(window.atob(response));    
        try{
  var array = [];
  if(response.status === "success"){
  response.response.forEach(element => {
    if(localStorage.getItem('phone_number') !== element.host && element.eventstatus!== 'closed'){
      element.description = window.atob(element.description);
      element.title = window.atob(element.title);
      array.push(element);
    }});
  this.setState({list:array});
}
else if(response.status === "failure"){
  localStorage.clear();
      this.props.history.push('/login');

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


  launchMeeting = (data) => {
		console.log(data);
        ZoomMtg.generateSignature({
            meetingNumber: 9696279797,//data.meetingNumber,
            apiKey: API_KEY,
            apiSecret: API_SECRET,
            role: 1,
            success(res) {
                console.log('signature', res.result);
                ZoomMtg.init({
                    leaveUrl: 'http://www.zoom.us',
                    success() {
                        ZoomMtg.join(
                            {
                                meetingNumber: 9696279797,//data.meetingNumber,
                                userName: 'test',
                                signature: res.result,
                                apiKey: API_KEY,
                                userEmail: data.email,
                                passWord: data.password,
                                success() {
									    document.getElementById('zmmtg-root').style.display = "block";

									console.log(API_KEY);
									console.log(data);
                                    console.log('join meeting success');
                                },
                                error(res) {
																		console.log(API_KEY);
									console.log(data);
                                    console.log(res);
                                }
                            }
                        );
                    },
                    error(res) {
                        console.log(res);
                    }
                });
            }
        });
    }


  render() {
    console.log(this.state.list);
    return (
         <div>
      {this.state.list.map(item => (
  <Card key={item.eventid}>
  <div className="imageDiv">
  <Card.Img variant="top" style={{ width: '100px', height :'100px',borderRadius:'50%'}} src={item.photo} />
  </div>
  <Card.Body>
    <Card.Title>{item.title}</Card.Title>
          <Card.Text>Event cost : Rs.{item.price}</Card.Text>
    <Card.Text>Duration: {item.duration}.min</Card.Text>
    <Card.Text>Time: {item.meetingtime}</Card.Text>

    <Card.Text>
      {item.description}  </Card.Text>
     {item.eventstatus === 'live'?
    <Button  style={{backgroundColor:'green'}} onClick={() => this.Join(item)}>JOIN</Button>:null}    
    {item.eventstatus === 'pending'?
    <Button style={{backgroundColor:'blue'}} onClick={() => this.Enrol(item)}>Enroll</Button>:null} 
  </Card.Body>
</Card>          ))}
        </div>
    );
  }
}
