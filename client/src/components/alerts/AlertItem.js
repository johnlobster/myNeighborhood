import React from "react";

import "./AlertItem.scss";

// displays an alert item, either active or inactive (passed expiry date)
function AlertItem (props) {
  return (
    <div className="alertItemBox">
      <div className="alertItemNotifier">
        {props.activeAlert && 
          <div className="alertItemActive">
          </div>
        }
      </div>
      <div className="alertItemEntryBox" >
        <div className="alertItemBox1">
          <div className="alertItemTitle">
            {props.alertTitle}
          </div>
          <div className="alertItemUserName">
            From {props.alertUser}
          </div>
        </div>
        
        <div className="alertItemMsgBox">
          {props.alertMessage}
        </div>
      </div>

    </div> 
  );
}

export default AlertItem;
