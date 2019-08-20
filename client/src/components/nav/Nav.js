import React from 'react';
import './style.sass';
import { Link } from 'react-router-dom'
import logo from '../../images/mnlogo.png' 

function Nav(props) {
    return (
        <nav className="NavHeaderBox">
            <img alt="LOGO" src ={logo} />
            {/* Display either user name or a login button */}
            {props.authorizedUser ? (
                <span>{props.userName}</span>
            ) : (
                <Link className="NavLink login-home" to="/login">
                    <button>Login</button> 
                </Link>
            )}
        </nav>


    );
}

export default Nav;