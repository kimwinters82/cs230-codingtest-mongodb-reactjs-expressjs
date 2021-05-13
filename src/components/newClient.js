import React, { Component } from "react";

class NewClient extends Component {
  constructor(props) {
    super(props);
    this.state ={
      Title: '', 
      Firstname:'',
      Surname: '',
      EmailAddress: '',
      MobileNumber: '',
      HomeNumber: '',
      HomeAddressLine1: '',
      HomeAddressLine2: '',
      HomeTown: '',
      HomeCityOrCounty: '',
      HomeEircode: '',
      DOB: '',
      Parent: '',
      Message: '',
      Registered: '',
      Doctor: '',
      ReferredBy: '',
      update: false,
      clients: [],
      client: ''
      
    }
  }
  componentDidMount = () => {
    fetch('http://localhost:5000/client')
    .then(res => res.json())
    .then(clients => this.setState({clients: clients}));
  }
  handleClient = (e) => {
    this.setState({client: e.target.value})
    this.setState({update: true});
  }
  changeHandler =(e) =>{
      this.setState({[e.target.name]: e.target.value})
  }
  handleMessage =(e) =>{
    this.setState({Message: e.target.value})
  }
  handleRefer =(e) =>{
    this.setState({ReferredBy: e.target.value})
}
handleParent =(e) =>{
    this.setState({Parent: e.target.value})
}
  postClient = (e) => {
      e.preventDefault()
      if (this.state.update === true){
        const options ={
          method: 'PATCH',
          headers:{
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            Title: this.state.Title,
            EmailAddress: this.state.EmailAddress,
            MobileNumber: this.state.MobileNumber,
            HomeAddress:{
                AddressLine1: this.state.HomeAddressLine1,
                AddressLine2: this.state.HomeAddressLine2,
                Town: this.state.HomeTown,
                CityOrCounty: this.state.HomeCityOrCounty,
                Eircode: this.state.HomeEircode,
            }
          })//stringify
        }//options
        fetch(`http://localhost:5000/client/${this.state.client}`, options)
          .then(res=> res.json())
          .then(data => alert("Successfuy updated client", data))
          .catch(err => alert("Failed to update client", err)); 
      }
      else {
        const options ={
          method: 'POST',
          headers:{
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            Title: this.state.Title, 
            Firstname: this.state.Firstname,
            Surname: this.state.Surname,
            EmailAddress: this.state.EmailAddress,
            MobileNumber: this.state.MobileNumber,
            HomeNumber: this.state.HomeNumber,
            HomeAddress:{
                AddressLine1: this.state.HomeAddressLine1,
                AddressLine2: this.state.HomeAddressLine2,
                Town: this.state.HomeTown,
                CityOrCounty: this.state.HomeCityOrCounty,
                Eircode: this.state.HomeEircode,
            },
            DOB: this.state.DOB,
            Parent: this.state.Parent,
            Message: this.state.Message,
            Registered: this.state.Registered,
            Doctor: this.state.Doctor,
            ReferredBy: this.state.ReferredBy
          })//stringify
        }//options
        fetch(`http://localhost:5000/client`, options)
          .then(res=> res.json())
          .then(data => alert("Successfully created a new Client Account"))
          .catch(err => alert("Failed to create a new Client Account", err)); 
      }//else
      this.setState({update:false});
  }//postPhysio
  
  render() {
      const {Title, Firstname, Surname, EmailAddress, MobileNumber, HomeNumber} = this.state;
      const {HomeAddressLine1, HomeAddressLine2, HomeTown, HomeCityOrCounty, HomeEircode} = this.state;
      const {DOB, Parent, Message, Registered, Doctor, ReferredBy} = this.state;
    return (
        <div className="underNav">
        <label name="Client"><b>Update Client Account:</b></label>
          <select value ={this.state.client} onChange={this.handleClient}>
            <option>Please select</option>
              {this.state.clients.map((c) => (
              <option key={c._id} value={c._id}>
              {c.Firstname} {c.Surname}
            </option> ))} 
          </select> 
        <button className="buttonStyle"onClick={()=> this.setState({update:false})}>Reset</button>
        {this.state.update === false &&<h3>Fill out to Create Client Account </h3>}
        <form onSubmit={this.postClient}>
          <div>
            <label>Title: 
                <input 
                    type="text" 
                    name="Title" 
                    value={Title}
                    onChange={this.changeHandler}
                /></label>
          </div>
            {this.state.update === false &&
            <div>
            <label>Firstname: 
                <input 
                    type="text" 
                    name="Firstname" 
                    value={Firstname}
                    onChange={this.changeHandler}
                /></label>
              </div>}
            {this.state.update === false &&
            <div>
            <label>Surname: 
                <input 
                    type="text" 
                    name="Surname" 
                    value={Surname}
                    onChange={this.changeHandler}
                /></label></div>}
                <div>
              <label>EmailAddress: 
                <input 
                    type="text" 
                    name="EmailAddress" 
                    value={EmailAddress}
                    onChange={this.changeHandler}
                /></label></div>
            <div>
            <label>MobileNumber: 
                <input 
                    type="text" 
                    name="MobileNumber" 
                    value={MobileNumber}
                    onChange={this.changeHandler}
                /></label></div>
            {this.state.update === false &&
            <div>
            <label>HomeNumber: 
                <input 
                    type="text" 
                    name="HomeNumber" 
                    value={HomeNumber}
                    onChange={this.changeHandler}
                /></label></div>}
              <div>
              <label>Address Line 1: 
                <input 
                    type="text" 
                    name="HomeAddressLine1" 
                    value={HomeAddressLine1}
                    onChange={this.changeHandler}
                /></label></div>
                <div>
              <label>Address Line 2: 
                <input 
                    type="text" 
                    name="HomeAddressLine2" 
                    value={HomeAddressLine2}
                    onChange={this.changeHandler}
                /></label></div>
                <div>
                <label>Town: 
                <input 
                    type="text" 
                    name="HomeTown" 
                    value={HomeTown}
                    onChange={this.changeHandler}
                /></label></div>
                <div>
              <label>City or County: 
                <input 
                    type="text" 
                    name="HomeCityOrCounty" 
                    value={HomeCityOrCounty}
                    onChange={this.changeHandler}
                /></label></div>
                <div>
              <label>Eircode: 
                <input 
                    type="text" 
                    name="HomeEircode" 
                    value={HomeEircode}
                    onChange={this.changeHandler}
                /></label></div>
              {this.state.update === false &&
                <div>
                <label>DOB: 
                    <input 
                    type="text" 
                    name="DOB" 
                    value={DOB}
                    onChange={this.changeHandler}
                /></label></div>}
            {this.state.update === false &&
                <div>
                    <label for="Parent">Parent/Guardian: </label>
                    <select id={Parent} onChange={this.handleParent}>
                        <option>Please select</option>
                        <option value={"Over 18 - not needed"}> Over 18 - not needed</option> 
                        <option value={"Parent/Guardian"}> Parent/Guardian - form signed </option>  
                    </select>
                </div>
            }
            {this.state.update === false &&
                <div>
                    <label for="Message">Get messages to: </label>
                    <select id={Message} onChange={this.handleMessage}>
                        <option>Please select</option>
                        <option value={"Mobile"}> Mobile</option> 
                        <option value={"Home"}> Home </option>
                        <option value={"Email"}> Email </option> 
                        <option value={"Text"}> Text</option> 
                        <option value={"No contact"}> No contact </option> 
                    </select>
                </div>
            }
            {this.state.update === false &&
                <div>
                <label>Registered on: 
                    <input 
                    type="text" 
                    name="Registered" 
                    value={Registered}
                    onChange={this.changeHandler}
                /></label></div>}
            {this.state.update === false &&
                <div>
                <label>Doctor's name: 
                    <input 
                    type="text" 
                    name="Doctor" 
                    value={Doctor}
                    onChange={this.changeHandler}
                /></label></div>}
            {this.state.update === false &&
                <div>
                    <label for="ReferredBy">Referred by: </label>
                    <select id={ReferredBy} onChange={this.handleRefer}>
                        <option>Please select</option>
                        <option value={"GP"}> GP</option> 
                        <option value={"Hospital"}> Hospital </option>
                        <option value={"Work"}> Work </option> 
                        <option value={"Not Referred"}> Not Referred </option>  
                    </select>
                </div>
            }
            <button className="buttonStyle"type="submit" value="Submit">{this.state.update === true ?"Update Client Account":"Create Client Account"}</button>
      </form>
      
      </div>
    ); // end of return statement
  } // end of render function
} // end of class

export default NewClient;