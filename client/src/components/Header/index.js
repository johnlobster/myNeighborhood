import React from 'react';
import reactLogo from "../../images/react-logo.svg";
import "./index.css";

// this is a placeholder

class Header extends React.Component {
  render() {
    return(
      <div>
        <h1 className="HeaderHeaderBox">
          <span>my Neighborhood</span>
          <span>
            <img src={reactLogo} className="HeaderReactLogo" alt="React logo" />
          </span>
        </h1>
      </div>
    );
  }
}

export default Header;