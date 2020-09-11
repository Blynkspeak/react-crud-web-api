
/*return (
	
        )

        */


import React, { Component } from "react";

export default class Loader extends Component {
  constructor(props) {
  	super(props);
    console.log(props);    
  }

render() {
	if(this.props.item){
	return (
   			<div style={{width:'100%',height:'100%',zIndex:'1'}}>Loading.....</div>
		)
	}
	else{
		return null;
	}
	}
}
