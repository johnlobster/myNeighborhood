import React from 'react';
import './services.scss';




class Services extends React.Component {
  render() {
    return (

      <div className="services-wrapper">
        <h1>Services</h1>
        <div className="service-icons">
          <i class="fas fa-toilet"><p>Plumbing</p></i>
          <i class="fas fa-people-carry"><p>Moving</p></i>
          <i class="fas fa-dog"><p>Pet Services</p></i>
          <i class="fas fa-temperature-high"><p>Heating & Air</p></i>
          <i class="fas fa-broom"><p>Housekeeping</p></i>
          <i class="fas fa-car"><p>Mechanic</p></i>
          <i class="fas fa-seedling"><p>Gardening</p></i>
          <i class="fas fa-bolt"><p>Electrician</p></i>
          <i class="fas fa-cannabis"><p>Dispensary</p></i>
        </div>
      </div>
    );
  }
}

export default Services;