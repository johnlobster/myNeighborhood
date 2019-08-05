import React from 'react';
import "./index.css";
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
       
      </div>
    );
  }
}

export default Header;