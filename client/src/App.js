import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Nav from "./components/nav/Nav";
import About from "./components/about/About";
import Login from "./components/login/Login";
import "./styles/globals.scss";
import Newuser from './components/newUser/Newuser';


function App() {
  return (
    <Router>
          <Nav/>
          <Switch>
            <Route exact path='/'  component={Home} />
            <Route path='/about'  component={About} />
            <Route path='/login' component={Login} />
            <Route path='/Newuser' component={Newuser} />
          <Footer />
        </Switch>
    </Router>
  );
}

export default App;
