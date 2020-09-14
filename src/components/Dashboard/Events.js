import React, { Component } from "react";
import DataService from "../../services/DataService";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
//import Navigation from "../Navigation/Navigation";
import { subscribeUser } from '../../subscription';

import { ZoomMtg } from "@zoomus/websdk";
import Loader from '../Helper/Loader'
const API_KEY = 'xp2f-ZkURViTizRyvaJJEA';
// Add this, never use it client side in production
const API_SECRET = 'jW1ewcLp40wtb8rjYLvKhpDspx3YoxHPR1OE';

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      PhoneNumber: 9535461483,
      published: false,
      submitted: false,
      list :[],
      loading:false
    };
    document.body.style.overflow ="auto";
    document.getElementById('zmmtg-root').style.display = "none";
      subscribeUser();

  }
  componentDidMount(){
        this.EventList();
        ZoomMtg.setZoomJSLib("https://source.zoom.us/1.8.0/lib", "/av");
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareJssdk();
  }

  onChangePhoneNumber = (e) => {
    console.log(e.target.value);
    this.setState({
      PhoneNumber: e.target.value
    });
  }


 Enrol= async(item) =>{
  this.setState({loading: true});
  var body = {
    username: item.username,
    eventid : item.eventid
  };
    DataService.enrolEvent(body)
      .then(response => {
    response = JSON.parse(window.atob(response)); 
        this.setState({loading: false});
   
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
    this.setState({loading: true});

  var body = {
  eventid : item.eventid
  };

      DataService.joinEvent(body)
      .then(response => {

  if(response.status==="success"){
   var data = {
      meetingNumber : parseInt(response.meetingdata.id),
      password : response.meetingdata.encrypted_password,
      //password : response.meetingdata.password,
    //password :'VVpwMGQxaXF1eWttK1Q5bVlqdlFiQT09',
    }

    this.launchMeeting(data);
    this.setState({loading: false});

    //joinmeet(response.meetingdata.id.toString(), response.meetingdata.password);
  }
  else if(response.status==="error"){
    const r = window.confirm('You are not Enrolled to this event. Do you want to enroll? ');
    if (r ===true){
      this.Enrol(item);
    }

  }
  });
}


  EventList = () => {
    this.setState({loading: true});
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
      this.setState({loading: false});

}
else if(response.status === "failure"){
      this.setState({loading: false});

  localStorage.clear();
      //this.props.history.push('/login');
      window.location ="/login";

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
            meetingNumber:data.meetingNumber,
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
                                meetingNumber: data.meetingNumber,
                                userName: 'test',
                                signature: res.result,
                                apiKey: API_KEY,
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
         <Loader item={this.state.loading}/>
      {this.state.list.map(item => (
      <Card style={{    background: '#eaeaea', margin: '10px'}} key={item.eventid}>
  <div className="imageDiv">
  <Card.Img variant="top" style={{ padding:'10px',width: '100px', height :'100px',borderRadius:'50%'}} src={item.photo} />
  </div>
  <Card.Body>
    <Card.Title>{item.title}</Card.Title>
          <span>Event cost : Rs.{item.price}</span><br/>
    <span>Duration: {item.duration}.min</span><br/>
    <span>Time: {item.meetingtime}</span><br/>

    <span> {item.description}  </span><br/>
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
