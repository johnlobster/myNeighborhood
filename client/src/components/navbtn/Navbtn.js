import React from 'react';
import './styles.sass';
import { Link } from 'react-router-dom';



function Navbtn(props) {
  return (
      <div id="wrapper-btnnav" className="row d-flex flex-row-reverse">
      <div id="nav" className="col-3 fixed-bottom ">
          <li className="nav-item dropdown">
            <Link className="nav-link" to="#"  role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i id="bars-menu" className="fa fa-bars" aria-hidden="true"></i>
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
              <Link className="dropdown-item text-right" to="/Newuser">Sign up</Link>
              <div className="dropdown-divider"></div>
              <Link className="dropdown-item text-right" to="/">Enter<i className="fa fa-home" aria-hidden="true"></i></Link>
            </div>
          </li>

        </div>
      </div>
   
  );
}



export default Navbtn;