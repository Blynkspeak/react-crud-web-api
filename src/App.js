import React, { Component } from "react";
//import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

/*import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component";
import Login from "./components/Login/Login";
import OTP from "./components/Login/OTP";*/
import Navigation from "./components/Navigation/Navigation";
class App extends Component {
  render() {
    return (
      <div>
        <Navigation/>
      </div>

    );
  }
}

export default App;
