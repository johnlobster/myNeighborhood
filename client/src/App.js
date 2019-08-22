import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from "axios";
import Home from "./components/home/Home";
import Nav from "./components/nav/Nav";
import About from "./components/about/About";
import Login from "./components/login/Login";
import Newuser from './components/newUser/Newuser';
import Recomendations from './components/recomendations/Recomendations';
import Events from './components/events/Events';
import LocalInfo from './components/localinfo/LocalInfo';
import Pets from "./components/Pets/Pets";
import Services from './components/Services/Services.js';
import Alerts from "./components/alerts/Alerts";
import API from "./api/alertsAPI";

// global scss file - import here then available to all sass files
import "./styles/themes.scss";
import Navbtn from './components/navbtn/Navbtn';

class  App extends React.Component {
  state = {
    jwt: "",
    userData: {},
    authorizedUser: false,
    activeAlert: false,
    activeAlerts: [],
    oldAlerts: []
  }

  // get alerts, create boolean "activeAlert", save to state
  // if a user is already logged in, get jwt and userData from localStorage, check that token is still valid
  componentDidMount() { 
    // get alert data
    API.getAll()
      .then(({ activeAlerts, oldAlerts }) => {
        let active = false;
        if (activeAlerts.length !== 0) {
          active = true;
        }
        this.setState(
          {
            activeAlert: active,
            activeAlerts: activeAlerts,
            oldAlerts: oldAlerts
          });
      })
      .catch((err) => {
        console.log("App: Error accessing /api/alerts");
        console.log(err);
      })
      .finally ( () => {
        // whether the alert data get succeeds or fails, check out authorization
        if (localStorage.getItem("myNeighborhoodJwt") === null) {
          console.log("No stored session information");
        }
        else {
          axios.get("/api/pingtoken",
            {
              headers: {
                "authorization": `Bearer ${localStorage.getItem("myNeighborhoodJwt")}`
              }
            }
          )
            .then((result) => {
              console.log(result.data);
              if (result.data.jwValid) {
                const userData = JSON.parse(localStorage.getItem("myNeighborhoodUserData"));
                console.log("Found stored session information for user " + userData.userName);
                this.setState({
                  jwt: localStorage.getItem("myNeighborhoodJwt"),
                  userData: userData,
                  authorizedUser: true
                });
              }
              else {
                // saved token was invalid, delete from localStorage
                localStorage.removeItem("myNeighborhoodUserData");
                localStorage.removeItem("myNeighborhoodJwt");
                console.log("Removed expired authentication token");
              }


            })
            .catch((err) => {
              console.log("App: Error accessing /api/pingtemplate");
              console.log(err);
            })
        }
      })
    
  }

  // this is called by login and register routes so that state in App can be updated
  validUser = (jwt, userData) => {
    localStorage.setItem("myNeighborhoodUserData", userData);
    localStorage.setItem("myNeighborhoodJwt", jwt);
    this.setState({
      jwt: jwt,
      userData: userData,
      authorizedUser: true
    });
    console.log("App: Changed user data");
  } 

  render() {
    
    return (
      <Router>
        {/* Nav displays current user (or login button) and alerts flag */}
        <Nav 
          authorizedUser={this.state.authorizedUser} 
          activeAlert={this.state.activeAlert}
          userName={`${this.state.userData.firstName} ${this.state.userData.lastName}`}/>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/About' component={About} />
          <Route 
            path='/Login' 
            render={(props) => <Login {...props} authUser={this.validUser} />}
          />
          <Route 
            path='/Newuser'
            render={(props) => <Newuser {...props} authUser={this.validUser} />}
          />
          <Route
            path="/Alerts"
            render={(props) => <Alerts {...props} 
              authorizedUser={this.state.authorizedUser}
              currentAlerts={this.state.activeAlerts} 
              previousAlerts={this.state.oldAlerts}
              />}
          />
          <Route path='/Recomendations' component={Recomendations} />
          <Route path='/Events' component={Events} />
          <Route path='/LocalInfo' component={LocalInfo} />
          <Route path='/Pets' component={Pets} />
          <Route path='/Services' component={Services} />
       
          
        </Switch>
        <Navbtn authorizedUser={this.state.authorizedUser} />
        
      </Router>
    );
  }
}

export default App;
