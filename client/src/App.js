import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Nav from "./components/nav/Nav";
import About from "./components/about/About";
import Login from "./components/login/Login";
import Newuser from './components/newUser/Newuser';
import Recomendations from './components/recomendations/Recomendations';
import Events from './components/events/Events';
import Phonebook from './components/phonebook/Phonebook';
import LocalInfo from './components/localinfo/LocalInfo';


import "./styles/themes.scss";
import Navbtn from './components/navbtn/Navbtn';

class  App extends React.Component {
  state = {
    jwt: "",
    userData: {},
    authorizedUser: false
  }

  // if a user is already logged in, get jwt and userData from localStorage
  componentDidMount() {
    if (localStorage.getItem("myNeighborhoodJwt") === null) {
      console.log("No stored session information");
    }
    else {
      const userData = JSON.parse(localStorage.getItem("myNeighborhoodUserData"));
      console.log("Found stored session information for user " + userData.userName);
      this.setState({
        jwt: localStorage.getItem("myNeighborhoodJwt"),
        userData: userData,
        authorizedUser: true
      });
    }

  }
  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/About' component={About} />
          <Route path='/Login' component={Login} />
          <Route path='/Newuser' component={Newuser} />
          <Route path='/Recomendations' component={Recomendations} />
          <Route path='/Events' component={Events} />
          <Route path='/Phonebook' component={Phonebook} />
          <Route path='/LocalInfo' component={LocalInfo} />
          <Footer />
        </Switch>
        <Navbtn authorizedUser={this.state.authorizedUser} />
      </Router>
    );
  }
}

export default App;
