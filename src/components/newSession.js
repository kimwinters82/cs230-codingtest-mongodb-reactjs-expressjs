import React, { Component } from "react";

class NewSession extends Component {
  constructor(props) {
    super(props);
    this.state ={
        Date: '',
        Time: '',
        Client: '',
        Physio: '',
        Fee: '',
        Number: '',
        Duration: '',
        Type: '',
        Notes: '',
        update: false,
        clients: [],
        physios: [],
        sessions: [],
        Session: ''
    }
  }
  componentDidMount = () => {
    fetch('http://localhost:5000/client')
    .then(res => res.json())
    .then(clients => this.setState({clients: clients}));
    fetch('http://localhost:5000/physio')
    .then(res => res.json())
    .then(physios => this.setState({physios: physios}));
    fetch('http://localhost:5000/session')
    .then(res => res.json())
    .then(sessions => this.setState({sessions: sessions}, () => console.log(this.state.sessions)));
  }
  handleClient = (e) => {
    this.setState({Client: e.target.value});
  }
  handlePhysio = (e) => {
    this.setState({Physio: e.target.value});
  }
  handleSession = (e) => {
    this.setState({Session: e.target.value});
  }
  handleDuration = (e) => {
    this.setState({Duration: e.target.value});
  }
  handleFee = (e) => {
    this.setState({Fee: e.target.value});
  }
  handleType = (e) => {
    this.setState({Type: e.target.value});
  }
  changeHandler =(e) =>{
      this.setState({[e.target.name]: e.target.value})
  }
  postSession = (e) => {
      e.preventDefault()
      if (this.state.update === true){
        const options ={
          method: 'PATCH',
          headers:{
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            Time: this.state.Time,
            Physio: this.state.Physio,
            Notes: this.state.Notes,
            
          })//stringify
        }//options
        fetch(`http://localhost:5000/session/${this.state.Session}`, options)
          .then(res=> res.json())
          .then(data => alert("Successfuy updated session", data))
          .catch(err => alert("Failed to update session", err)); 
      }
      else {
        const options ={
          method: 'POST',
          headers:{
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            Date: this.state.Date,
            Time: this.state.Time,
            Client: this.state.Client,
            Physio: this.state.Physio,
            Fee: this.state.Fee,
            Number: this.state.Number,
            Duration: this.state.Duration,
            Type: this.state.Type,
            Notes: this.state.Notes
          })//stringify
        }//options
        fetch(`http://localhost:5000/session`, options)
          .then(res=> res.json())
          .then(data => alert("Successfully added a new Session", data))
          .catch(err => alert("Failed to add a new Session", err)); 
      }//else
      this.setState({update:false});
  }//postPhysio
  
  render() {
      const {Date, Time, Client, Physio, Fee, Number, Session, Duration, Type, Notes} = this.state;
      
    return (
        <div className="underNav">
        {this.state.update === false && <h3>Log a new Session</h3>}
        {this.state.update === true && <h3>Update Session Details</h3>}
        {this.state.update === false &&<button className="buttonStyle"onClick={()=> this.setState({update:true})}>Update Session</button>}
        {this.state.update === true &&<button className="buttonStyle"onClick={()=> this.setState({update:false})}>Log New Session</button>}
        {this.state.update === false && <div>
        <p>Select a client and a physio and fill out the rest of the form</p>
        <label name="Client"><b>Select Client: </b></label>
          <select value ={Client} onChange={this.handleClient}>
            <option>Please select</option>
              {this.state.clients.map((c) => (
              <option key={c._id} value={c._id}>
              {c.Firstname} {c.Surname}
            </option> ))} 
          </select> 
          <label name="Physio"><b>Select Physio: </b></label>
          <select value ={Physio} onChange={this.handlePhysio}>
            <option>Please select</option>
              {this.state.physios.map((c) => (
              <option key={c._id} value={c._id}>
              {c.Firstname} {c.Surname}
            </option> ))} 
          </select>
          </div>}
        {this.state.update === true &&<div>
            <label name="Session"><b>Select Session: </b></label>
            <select value ={Session} onChange={this.handleSession}>
              <option>Please select</option>
                {this.state.sessions.map((c) => (
                <option key={c._id} value={c._id}>
                {c._id}
              </option> ))} 
            </select>
        </div>}

        <form onSubmit={this.postSession}>
          {this.state.update === false &&
          <div>
            <label>Date: 
                <input 
                    type="text" 
                    name="Date" 
                    value={Date}
                    onChange={this.changeHandler}
                /></label>
          </div>}
          <div>
            <label>Time: 
                <input 
                    type="text" 
                    name="Time" 
                    value={Time}
                    onChange={this.changeHandler}
            /></label>
          </div>
          {this.state.update === true &&
          <div>
            <label name="Physio">Select New Physio: </label>
            <select value ={Physio} onChange={this.handlePhysio}>
                <option>Please select</option>
                {this.state.physios.map((c) => (
                <option key={c._id} value={c._id}>
                {c.Firstname} {c.Surname}
                </option> ))} 
            </select>
          </div>}
        {this.state.update === false &&
          <div>
            <label for="Fee">Fee: </label>
            <select id={Fee} onChange={this.handleFee}>
                <option>Please select</option>
                <option value={40}> €40</option> 
                <option value={60}> €60</option> 
                <option value={75}> €75</option> 
            </select>
           </div>
        }
        {this.state.update === false &&
            <div>
            <label for="Duration">Duration: </label>
                <select id={Duration} onChange={this.handleDuration}>
                    <option>Please select</option>
                    <option value={30}> 30</option> 
                    <option value={45}> 45</option> 
                    <option value={60}> 60</option> 
                </select>
            </div>
        } 
        {this.state.update === false &&
            <div>
                <label>Session Number: 
                    <input 
                        type="text" 
                        name="Number" 
                        value={Number}
                        onChange={this.changeHandler}
                /></label>
            </div>
        }
        {this.state.update === false &&
            <div>
                <label for="Type">Session Type: </label>
                    <select id={Type} onChange={this.handleType}>
                        <option>Please select</option>
                        <option value={"Assessment"}> Assessment</option> 
                        <option value={"Hydrotherapy"}> Hydrotherapy </option>
                        <option value={"Electrotherapy"}> Electrotherapy </option> 
                        <option value={"Stretching"}> Stretching </option> 
                        <option value={"Massage Therapy"}> Massage Therapy</option> 
                    </select>
            </div>
        }
        {this.state.Type && console.log(this.state.Type)}    
            <div>
                <label>Notes: 
                    <input 
                    type="text" 
                    name="Notes" 
                    value={Notes}
                    onChange={this.changeHandler}
                /></label></div>
            
            <button className="buttonStyle"type="submit" value="Submit">{this.state.update === true ?"Update Session":"Log New Session"}</button>
      </form>
      
      </div>
    ); // end of return statement
  } // end of render function
} // end of class

export default NewSession;