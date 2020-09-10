import React, { Component } from "react";
import DataService from "../../services/DataService";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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

  }
  componentDidMount(){
    this.EventList();
  }

  onChangePhoneNumber = (e) => {
    console.log(e.target.value);
    this.setState({
      PhoneNumber: e.target.value
    });
  }



startEvent= async(item) =>{
//write api call and join event function here
  var body = {
  eventid : item.eventid
  };

  DataService.startEvent(body)
      .then(response => {
  alert(JSON.stringify(response));
  if(response.status==="success"){
    //startmeet(response.meetingdata.id.toString(), response.meetingdata.password);
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
    if(localStorage.getItem('phone_number') === element.host){
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





  render() {
    console.log(this.state.list);
    return (
         <ul>
      {this.state.list.map(item => (
      <ListItem key={item.eventid} item={item} />
          ))}
        </ul>
    );
  }
}

const ListItem = ({ item }) => (
  <li>
  <Card >
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
    <Button  style={{backgroundColor:'green'}} >Live</Button>:null}  
    {item.eventstatus === 'closed'?
    <Button  style={{backgroundColor:'red'}} >Closed</Button>:null}  
    {item.eventstatus === 'pending'?
    <Button style={{backgroundColor:'blue'}} onClick={() => this.startEvent(item)}>Start</Button>:null}
    
  </Card.Body>
</Card>
  </li>
);