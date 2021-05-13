import React, { Component } from "react";
import{
  Link
} from "react-router-dom";

//this file shows GET and DELETE CRUD connections for client collection
class ClientReact extends Component {
  constructor(props) {
    super(props);
    this.state ={
      clients: [],
      
    }
  }
  //updates everytime the component is mounted (you may need to refresh page after deletions to see change)-> GET
  componentDidMount = () => {
    fetch('http://localhost:5000/client')
    .then(res => res.json())
    .then(clients => this.setState({clients: clients}, () => console.log(this.state.clients)));
  }

  //removes the client from the client collection -> DELETE
  deleteClient(id){
    fetch(`http://localhost:5000/client/${id}`,{
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => alert("Successfully deleted"));
  }
  //removes all sessions for the specified client -> DELETE
  deleteSessions(id){
    fetch(`http://localhost:5000/session/client/${id}`,{
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => alert("Successfully deleted", data));
  }
  render() {
    return (
      <div className="underNav">
        <Link to="/newClient"><button className="buttonStyle">Create New Client</button></Link>
        <Link to="/newClient"><button className="buttonStyle">Update Client Details</button></Link>
        
        {this.state.clients.map((c) =>(
          <p key={c._id}>
            <h3>{c.Title} {c.Firstname} {c.Surname}</h3>
            <div>E: {c.EmailAddress}, M: {c.MobileNumber} H: {c.HomeNumber}</div>
            <div>Address: {c.HomeAddress.AddressLine1}, {c.HomeAddress.AddressLine2}, {c.HomeAddress.Town}, {c.HomeAddress.CityOrCounty}, {c.HomeAddress.Eircode}</div>
            <div>DOB: {c.DOB}, Parent: {c.Parent}, Leave Message: {c.Message}</div>
            <div>Registered: {c.Registered}, Dr: {c.Doctor} Referred by: {c.ReferredBy}</div>
            <div>
              <button className="buttonStyle" onClick={() => this.deleteClient(c._id)}>Delete Client Account</button>
              <button className="buttonStyle" onClick={() => this.deleteSessions(c._id)}>Delete All Sessions</button>
            </div>
          </p>
        ))}
      </div>
    ); // end of return statement
  } // end of render function
} // end of class

export default ClientReact;