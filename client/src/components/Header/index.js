import React from 'react';
import reactLogo from "../../images/react-logo.svg";
import "./index.scss";
import dBug from "../../utilities/debug.js";
// const { wError, wInfo, wDebug, wObj } = dBug("Header");
const { wInfo } = dBug("Header");

// this is a placeholder

class Header extends React.Component {

  componentDidMount() {
    wInfo("Mounted component");
  }
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