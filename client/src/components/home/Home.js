/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import './style.sass';
import logo from './mnh.gif' 
import Signup from '../signup/Signup';



function Home() {
    return (
      <div className ="background " >
          <div className='pulsating-circle'>   
          </div>
          <h1>My Neighborhood</h1>
          <img src ={logo} />
          <Signup/>
      </div>
    );
  }

export default Home;