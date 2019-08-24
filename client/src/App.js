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
import Photos from "./components/Photos/Photos";

// global scss file - import here then available to all sass files
import "./styles/themes.scss";
import Navbtn from './components/navbtn/Navbtn';

import dBug from "./utilities/debug.js";
const { wError, wDebug } = dBug("App");

class  App extends React.Component {
  state = {
    jwt: "",
    userData: {},
    authorizedUser: false,
    activeAlert: false,
    activeAlerts: [],
    oldAlerts: []
  }

  // user added alert - refetch
  
  newAlert = () => {
    this.getAlerts()
      .then (()=> {
        wDebug("refetched alerts");
      })
      .catch((err) => {
        wError("failed to refetch alerts");
      })
  }

  // this should probably be part of API
  getAlerts = () => {
    return new Promise( (resolve, reject) => {
      API.getAll()
        .then(({ activeAlerts, oldAlerts }) => {
          const active = (activeAlerts.length !== 0) ;
          wDebug(`active ${active}`);
          this.setState(
            {
              activeAlert: active,
              activeAlerts: activeAlerts,
              oldAlerts: oldAlerts
            });
          resolve();
        })
        .catch((err) => {
          wError("App: Error accessing /api/alerts");
          wError(err);
          reject(err);
        })
    })
  }

  // get alerts, create boolean "activeAlert", save to state
  // if a user is already logged in, get jwt and userData from localStorage, check that token is still valid
  componentDidMount() { 
    wDebug("component did mount");
    // get alert data
      this.getAlerts()
        .then( () => {
          // getAlerts function has done all the work
        })
        .catch ((err) => {
          // getAlerts already printed error messages
        })
        .finally( () => {
          // whether the alert data get succeeds or fails, check out authorization
          if (localStorage.getItem("myNeighborhoodJwt") === null) {
            wDebug("No stored session information");
            return;
          }
          else {
            // check that token hasn't expired
            axios.get("/api/pingtoken",
              {
                headers: {
                  "authorization": `Bearer ${localStorage.getItem("myNeighborhoodJwt")}`
                }
              })
            .then((result) => {
              if (result.data.jwtValid) {
                const userData = JSON.parse(localStorage.getItem("myNeighborhoodUserData"));
                wDebug("Found stored session information for user " + userData.userName);
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
                wDebug("Removed expired authentication token");
              }
            })
            .catch((error) => {
              wDebug("Error returned from axios GET .api/pingtoken");
              // not sure whether to delete user token
            })
        }
      }) 
  }

  // this is called by login and register routes so that state in App can be updated
  validUser = (jwt, userData) => {
    wDebug("validUser");
    let temp= JSON.stringify(userData);
    console.log(temp);
    localStorage.setItem("myNeighborhoodUserData", JSON.stringify(userData));
    localStorage.setItem("myNeighborhoodJwt", jwt);
    // wDebug("validUser2");
    this.setState({
      jwt: jwt,
      userData: userData,
      authorizedUser: true
    });
    wDebug("App: Changed user data");
  } 

  // remove localStorage for user and change state
  logout = () => {
    localStorage.removeItem("myNeighborhoodUserData");
    localStorage.removeItem("myNeighborhoodJwt");
    wDebug("Log out user");
    this.setState({
      jwt: "",
      userData: {},
      authorizedUser: false
    });

  }

  render() {
    
    return (
      <Router id="turn">
        {/* Nav displays current user (or login button) and alerts flag */}
        <Nav 
          logoutFn={this.logout}
          authorizedUser={this.state.authorizedUser} 
          
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
              newAlert={this.newAlert}
              />}
          />
          <Route path='/Recomendations' component={Recomendations} />
          <Route path='/Events' component={Events} />
          <Route path='/LocalInfo' component={LocalInfo} />
          <Route path='/Pets' component={Pets} />
          <Route path='/Services' component={Services} />
          <Route Path='/Photos' component={Photos} />          
        </Switch>

        <Navbtn 
          authorizedUser={this.state.authorizedUser}
          activeAlert={this.state.activeAlert}
        />
        
      </Router>
    );
  }
}

export default App;
