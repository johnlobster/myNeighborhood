/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import './styles.sass';
import { Link } from 'react-router-dom';



function Navbtn() {
  return (
      <div className="row d-flex flex-row-reverse">
      <div id="nav" className="col-3 fixed-bottom ">
          <li className="nav-item  dropdown p-2 ">
            <Link className="nav-link" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fa fa-bars" aria-hidden="true"></i>
            </Link>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item text-right" to="/Services">Services<i className="fa fa-tools"></i></Link>
              <Link className="dropdown-item text-right" to="/Lostandfound">Lost & found<i className="fa fa-key" aria-hidden="true"></i></Link>
              <Link className="dropdown-item text-right" to="/Pets">Pets <i className="fa fa-paw" aria-hidden="true"></i></Link>
              <Link className="dropdown-item text-right" to="/Alerts">Alerts<i className="fa fa-exclamation-triangle" aria-hidden="true"></i></Link>
              <Link className="dropdown-item text-right" to="/News">News<i className="fa fa-newspaper-o" aria-hidden="true"></i></Link>
              <Link className="dropdown-item text-right" to="/Gar">Favorites<i className="fa fa-heart" aria-hidden="true"></i></Link>
              <div className="dropdown-divider"></div>
              <Link className="dropdown-item text-right" to="/login">Login</Link>
              <Link className="dropdown-item text-right" to="/signup">Sign up</Link>
              <div className="dropdown-divider"></div>
              <Link className="dropdown-item text-right" to="/">Enter<i className="fa fa-home" aria-hidden="true"></i></Link>
            </div>
          </li>

        </div>
      </div>
   
  );
}

export default Navbtn;