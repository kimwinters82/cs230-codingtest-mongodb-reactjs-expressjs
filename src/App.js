import './App.css';
import Nav from './components/nav';
import SessionReact from './components/sessionReact';
import PhysioReact from './components/physioReact';
import ClientReact from './components/clientReact';
import NewPhysio from './components/newPhysio';
import NewClient from './components/newClient';
import NewSession from './components/newSession';
import{
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

/*
As you will see my front end has all working functionality as required by the brief
What I lack in styling, I make up in fully working requests 
I have added comments to each file so you can clearly see what requests are being fulfilled in each file
Go easy on me with the styling please -> I do not have the eye needed  :(
*/

//set up my routing to help navigate between my front end pages
function App() {
  return (
    <Router>
      <div className="App">
        <Nav></Nav>
        <Switch>
          <Route path="/sessions">
            <SessionReact/>
          </Route>
          <Route path="/clients">
            <ClientReact/>
          </Route>
          <Route path="/physios">
            <PhysioReact/>
          </Route>
          <Route path="/newPhysio">
            <NewPhysio/>
          </Route>
          <Route path="/newClient">
            <NewClient/>
          </Route>
          <Route path="/newSession">
            <NewSession/>
          </Route>
        </Switch> 
      </div>
    </Router>
  );
}

export default App;
