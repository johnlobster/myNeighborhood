/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import './style.sass';
import logo from './mnh.gif'




function Home() {
  return (
    <div className="container ">
      <div className="row">
        <div className=" col ">
          <h1>My Neighborhood</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <img alt="logo" src={logo} />
        </div>
      </div>
    </div>
  );
}

export default Home;