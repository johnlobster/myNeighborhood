/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import './style.sass';
import logo from './mnh.gif' 



function Home() {
    return (
      <div className ="background " >
          <div className='pulsating-circle'>   
          </div>
          <h1>My Neighborhood</h1>
          <img src ={logo} />
      </div>
    );
  }

export default Home;