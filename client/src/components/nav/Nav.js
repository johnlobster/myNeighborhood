import React from 'react';
import './style.sass';
import { Link } from 'react-router-dom'
import logo from '../../images/mnlogo.png' 


function Nav(props) {

    function clickMe() {
        console.log("I got clicked");
    }

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
        {/* If alert is active, show red triangle */}
        {props.activeAlert &&
            <div className="navAlertBox">
                <span>
                    <Link to="Alerts" onClick={clickMe} >
                        <div className="navAlertLink">
                            <i className="fas fa-exclamation-triangle fa-2x" />
                        </div>
                    </Link>
                </span>  
            </div>
        }
            
        </nav>


    );
}

export default Nav;

//<Link to="/Alerts">
//    <i className="fas fa-exclamation-triangle fa-2x" onClick={clickMe} />
//</Link>