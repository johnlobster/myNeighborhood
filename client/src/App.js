import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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

// themes imported here, but selector attaches them to <body>
import "./styles/themes.scss";

function App() {
  return (
    <Router>
          <Nav/>
          <Switch>
            <Route exact path='/'  component={Home} />
            <Route path='/About'  component={About} />
            <Route path='/Login' component={Login} />
            <Route path='/Newuser' component={Newuser} />
            <Route path='/Recomendations' component={Recomendations} />
            <Route path='/Events' component={Events} />
            <Route path='/Phonebook' component={Phonebook} />
            <Route path='/LocalInfo' component={LocalInfo} />
          <Footer />
        </Switch>
    </Router>
  );
}

export default App;
