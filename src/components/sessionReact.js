import React, { Component } from "react";
import{
  Link
} from "react-router-dom";

//this file shows GET and DELETE CRUD connections for session collection
class SessionReact extends Component {
  constructor(props) {
    super(props);
    this.state ={
      sessions: [],
      custOrders: []
    }
  }
  //updates everytime component is mounted -> used to map sessions to screen -> GET
  componentDidMount = () => {
    fetch('http://localhost:5000/session')
    .then(res => res.json())
    .then(sessions => this.setState({sessions: sessions}, () => console.log(this.state.sessions)));
  }
    
  //removes the session from the session collection -> DELETE
  deleteSession(id){
    fetch(`http://localhost:5000/session/${id}`,{
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => alert("Successfully deleted", data));
  }
  
  render() {
    return (
      <div className="underNav">
        <Link to="/newSession"><button className="buttonStyle">Create New Session</button></Link>
        <Link to="/newSession"><button className="buttonStyle">Update Session Details</button></Link>
        
        {this.state.sessions.map((c) =>(
          <p key={c._id}>
            <h3>{c.Date} {c.Time} </h3>
            <div><b>Client:</b> {c.Client.Firstname} {c.Client.Surname} <b>Physio:</b> {c.Physio.Firstname} {c.Physio.Surname}</div>
            <div>Fee: {c.Fee}, Session Number: {c.Number} Duration: {c.Duration}</div>
            <div>Session Type: {c.Type}, Notes: {c.Notes}</div>
            <div>
              <button className="buttonStyle" onClick={() => this.deleteSession(c._id)}>Delete Session</button>
            </div>
          </p>
        ))}
      </div>
    ); // end of return statement
  } // end of render function
} // end of class

export default SessionReact;