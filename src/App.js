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
