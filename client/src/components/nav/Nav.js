import React from 'react';
import './style.sass';
import { Link } from 'react-router-dom'
import logo from './mnlogo.png' 

function Nav() {
    return (
        <nav>
            <img alt="LOGO" src ={logo} />
            <ul className="nav-links">
                <Link to="/login"><li>Login</li></Link>
                <Link to="/about"><li>About</li></Link>
                <Link to="/info"><li>Info</li></Link>
            </ul>
        </nav>

      
    );
  }

export default Nav;