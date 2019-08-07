/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import './styles.sass';



function Navbtn() {
  return (
      <div className="row d-flex flex-row-reverse">
      <div id="nav" className="col-3 fixed-bottom ">
          <li className="nav-item  dropdown p-2 ">
            <a className="nav-link   " href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fa fa-bars" aria-hidden="true"></i>
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item text-center" href="/login">Login</a>
              <a className="dropdown-item text-center" href="/signup">Sign up</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item text-center" href="/"><i class="fa fa-home" aria-hidden="true"></i></a>
            </div>
          </li>

        </div>
      </div>
   
  );
}

export default Navbtn;