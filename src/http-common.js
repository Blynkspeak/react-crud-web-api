import axios from "axios";

export default axios.create({
  baseURL: "https://r7hvl6uiue.execute-api.ap-south-1.amazonaws.com",
  headers: {
    "Content-type": "application/json",
    'Access-Control-Allow-Origin' : '*'
  }
});