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
                <span>Welcome {props.userName}</span>
            ) : (
                <Link className="NavLink login-home" to="/login">
                    <button>Login</button> 
                </Link>
            )}
            {props.activeAlert && 
            <div className="navAlertBox">
                <Link to="/Alerts">
                    <i className="fas fa-exclamation-triangle fa-2x" />
                </Link>
            </div>
        }
        </nav>


    );
}

export default Nav;