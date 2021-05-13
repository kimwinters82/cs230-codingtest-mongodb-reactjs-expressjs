import React, { Component } from "react";
import{
    Link
  } from "react-router-dom";
class Nav extends Component {
  constructor(props) {
    super(props);
    this.state ={
        
    }
  }
  //created a really simple navigation bar which will stay at the top of the page
  render() {
    return (
        <div>
        <Link to= "/physios"><button className="buttonStyle">Physio collection</button></Link>
        <Link to= "/clients"><button className="buttonStyle">Client collection</button></Link>
        <Link to= "/sessions"><button className="buttonStyle">Session collection</button></Link>
      </div>
    ); // end of return statement
  } // end of render function
} // end of class

export default Nav;