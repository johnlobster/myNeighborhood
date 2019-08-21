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
                <span style={{color:"black",fontWeight:'bold' }}>Welcome {props.userName}</span>
            ) : (
                <Link style={{color:"black" }} className="NavLink " to="/login">
                    Please login
                </Link>
            )}
        </nav>


    );
}

export default Nav;