import React from 'react';
import './style.sass';
import { Link } from 'react-router-dom'
import logo from '../../images/mnlogo.png' 


function Nav(props) {

    return (
        <nav >
            <div className="NavHeaderBox">
                <img alt="LOGO" src={logo} />
            {/* Display either user name or a login button */}
            {props.authorizedUser ? (
                <span>Welcome {props.userName}</span>
            ) : (
                <span>
                    <Link className="NavLink" to="/login">
                        Please login
                    </Link>
                </span>
            )}
            </div>
        </nav>


    );
}

export default Nav;

//<Link to="/Alerts">
//    <i className="fas fa-exclamation-triangle fa-2x" onClick={clickMe} />
//</Link>