import React, { Component } from "react";

class NewPhysio extends Component {
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
      update: false,
      physios: [],
      physio: ''
      
    }
  }
  componentDidMount = () => {
    fetch('http://localhost:5000/physio')
    .then(res => res.json())
    .then(physios => this.setState({physios: physios}));
  }
  handlePhysio = (e) => {
    this.setState({physio: e.target.value})
    this.setState({update: true});
  }
  changeHandler =(e) =>{
      this.setState({[e.target.name]: e.target.value})
  }
  postPhysio = (e) => {
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
        fetch(`http://localhost:5000/physio/${this.state.physio}`, options)
          .then(res=> res.json())
          .then(data => alert("Successfuy updated physio", data))
          .catch(err => alert("Failed to update physio", err)); 
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
            }
          })//stringify
        }//options
        fetch(`http://localhost:5000/physio`, options)
          .then(res=> res.json())
          .then(data => alert("Successfully created a new Physio Account"))
          .catch(err => alert("Failed to create a new Physio Account", err)); 
      }//else
      this.setState({update:false});
  }//postPhysio
  
  render() {
      const {Title, Firstname, Surname, EmailAddress, MobileNumber, HomeNumber} = this.state;
      const {HomeAddressLine1, HomeAddressLine2, HomeTown, HomeCityOrCounty, HomeEircode} = this.state;
      
    return (
        <div className="underNav">
        <label name="Physio"><b>Update Physio Account:</b></label>
          <select value ={this.state.physio} onChange={this.handlePhysio}>
            <option>Please select</option>
              {this.state.physios.map((c) => (
              <option key={c._id} value={c._id}>
              {c.Firstname} {c.Surname}
            </option> ))} 
          </select> 
        <button className="buttonStyle"onClick={()=> this.setState({update:false})}>Reset</button>
        {this.state.update === false &&<h3>Fill out to Create Physio Account </h3>}
        <form onSubmit={this.postPhysio}>
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
              
            <button className="buttonStyle"type="submit" value="Submit">{this.state.update === true ?"Update Physio Account":"Create Physio Account"}</button>
      </form>
      
      </div>
    ); // end of return statement
  } // end of render function
} // end of class

export default NewPhysio;