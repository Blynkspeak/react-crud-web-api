import React, { Component } from "react";
import DataService from "../../services/DataService";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
    //<div style={{width:'100%',height:'100%',zIndex:'1'}}>Loading.....</div>

import { ZoomMtg } from "@zoomus/websdk";
//import Navigation from "../Navigation/Navigation";
import Loader from '../Helper/Loader';

const API_KEY = 'xp2f-ZkURViTizRyvaJJEA';
// Add this, never use it client side in production
const API_SECRET = 'jW1ewcLp40wtb8rjYLvKhpDspx3YoxHPR1OE';

//const API_KEY = 'ZINaR7MpQxKqrj27uOlWgQ';
// Add this, never use it client side in production
//const API_SECRET = 'FXkp7KBRhgjm3NwgChAAi0MEl8ViZZPXVpK7';

export default class MyEvents extends Component {
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



  StartEvent=(item)=>{
    //write api call and join event function here

    this.setState({loading: true});
  var body = {
  eventid : item.eventid
  };

  DataService.startEvent(body)
      .then(response => {

  if(response.status==="success"){
    var data = {
      meetingNumber : parseInt(response.meetingdata.id),
      password : response.meetingdata.encrypted_password,
      //password : response.meetingdata.password,
	  //password :'VVpwMGQxaXF1eWttK1Q5bVlqdlFiQT09',
	  email: response.meetingdata.host_email
    }
    this.launchMeeting(data);
    this.setState({loading: false});

    //startmeet(response.meetingdata.id.toString(), response.meetingdata.password);
  }
  else{
    alert("join failed");
  }
  });
}


  launchMeeting = (data) => {
		console.log(data);
        ZoomMtg.generateSignature({
            meetingNumber: data.meetingNumber,
            apiKey: API_KEY,
            apiSecret: API_SECRET,
            role: 1,
            success(res) {
                console.log('signature', res.result);
                ZoomMtg.init({
                    leaveUrl: 'http://localhost:8081/myevents',
                    success() {
                        ZoomMtg.join(
                            {
                                meetingNumber:data.meetingNumber,
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




  EventList = () => {
    this.setState({loading: true});

    DataService.listEvents()
      .then(response => {
          response = JSON.parse(window.atob(response)); 
              this.setState({loading: false});
   
        try{
  var array = [];
  if(response.status === "success"){
  response.response.forEach(element => {
    if(localStorage.getItem('phone_number') === element.host){
      element.description = window.atob(element.description);
      element.title = window.atob(element.title);
      array.push(element);
    }});
  this.setState({list:array});
                this.setState({loading: false});

}
else if(response.status === "failure"){
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
    <Button item="{item}" style={{backgroundColor:'blue'}} >Live</Button>:null}
    {item.eventstatus === 'closed'?
    <Button  style={{backgroundColor:'red'}} >Closed</Button>:null}  
    {item.eventstatus === 'pending'?
    <Button item="{item}" style={{backgroundColor:'blue'}} onClick={()=>this.StartEvent(item)}>Start</Button>:null}
    
  </Card.Body>
</Card>
	  
          ))}
        </div>
    );
  }
}
