import React from 'react';
import './styles.sass';
import { Link } from 'react-router-dom';



function Navbtn(props) {
  return (
      
      <div id="nav" className="fixed-bottom">
        {/* If alert is active, show red triangle. This uses a relative position */}
        {props.activeAlert &&
            <span className="navAlertBox">
              <Link to="/Alerts" className="navAlertLink">
                  <i className="fas fa-exclamation-triangle fa-2x navAlertIcon" />
              </Link>
            </span>
        }
          <li className="nav-item dropdown">
            <Link className="nav-link" to="#"  role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i id="bars-menu" className="fa fa-bars" aria-hidden="true"></i>
            </Link>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item text-right" to="/Services">Services<i className="fa fa-tools"></i></Link>
              <Link className="dropdown-item text-right" to="/Photo">Lost & found<i className="fa fa-key" aria-hidden="true"></i></Link>
              <Link className="dropdown-item text-right" to="/Pets">Pets <i className="fa fa-paw" aria-hidden="true"></i></Link>
              <Link className="dropdown-item text-right" to="/Alerts">Alerts<i className="fa fa-exclamation-triangle" aria-hidden="true"></i></Link>
              <Link className="dropdown-item text-right" to="/LocalInfo">News<i className="fa fa-newspaper-o" aria-hidden="true"></i></Link>
              <div className="dropdown-divider"></div>
              <Link className="dropdown-item text-right" to="/login">Login</Link>
              <Link className="dropdown-item text-right" to="/Newuser">Sign up</Link>
              <Link className="dropdown-item text-right" to="/About">Our Team</Link>
              <div className="dropdown-divider"></div>
              <Link className="dropdown-item text-right" to="/">Enter<i className="fa fa-home" aria-hidden="true"></i></Link>
            </div>
          </li>

        </div>

   
  );
}



export default Navbtn;