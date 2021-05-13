import React, { Component } from "react";
import{
  Link
} from "react-router-dom";

//this file shows GET and DELETE CRUD connections for physio collection
class PhysioReact extends Component {
  constructor(props) {
    super(props);
    this.state ={
      physios: [],
      
    }
  }
  //updates each time coponent is mounted -> GET
  componentDidMount = () => {
    fetch('http://localhost:5000/physio')
    .then(res => res.json())
    .then(physios => this.setState({physios: physios}, () => console.log(this.state.physios)));
  }
  
  //removes the physio from the physio collection -> DELETE
  deletePhysio(id){
    fetch(`http://localhost:5000/physio/${id}`,{
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => alert("Successfully deleted", data));
  }
  //removes all orders for the specified customer -> DELETE
  deleteSessions(id){
    fetch(`http://localhost:5000/session/${id}`,{
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => alert("Successfully deleted", data));
  }
  render() {
    return (
      <div className="underNav">
        <Link to="/newPhysio"><button className="buttonStyle">Create New Physio</button></Link>
        <Link to="/newPhysio"><button className="buttonStyle">Update Physio Details</button></Link>
        {this.state.physios.map((c) =>(
          <p key={c._id}>
            <h3>{c.Title} {c.Firstname} {c.Surname}</h3>
            <div>E: {c.EmailAddress}, M: {c.MobileNumber} H: {c.HomeNumber}</div>
            <div>Address: {c.HomeAddress.AddressLine1}, {c.HomeAddress.AddressLine2}, {c.HomeAddress.Town}, {c.HomeAddress.CityOrCounty}, {c.HomeAddress.Eircode}</div>
            <div>
              <button className="buttonStyle" onClick={() => this.deletePhysio(c._id)}>Delete Physio Account</button>
              <button className="buttonStyle" onClick={() => this.deleteSessions(c._id)}>Delete All Sessions</button>
            </div>
          </p>
        ))}
      </div>
    ); // end of return statement
  } // end of render function
} // end of class

export default PhysioReact;