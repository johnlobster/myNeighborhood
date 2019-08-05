import React from 'react';
import './style.sass';
import { Link } from 'react-router-dom'

function Nav() {
    return (
        <nav>
            <Link to="/">home</Link>
            <ul className="nav-links">
                <Link to="/login">Login</Link>
                <Link to="/about">About</Link>
                <Link to="/info">Info</Link>
            </ul>
        </nav>

      
    );
  }

export default Nav;