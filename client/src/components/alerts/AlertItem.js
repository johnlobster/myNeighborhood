import React from "react";

import "./AlertItem.scss";

// displays an alert item, either active or inactive (passed expiry date)
function AlertItem (props) {
  return (
    <div className="alertItemBox">
      <div className="alertItemNotifier">
        {props.ActiveAlert && 
          <div className="alertItemActive">
          </div>
        }
      </div>
      <div className="alertItemEntryBox" >
        <div className="alertItemTitle">
          {props.title}
        </div>
        <div className="alertItemUserName">
          From {props.user}
        </div>
      <div className="alertItemMsgBox">
        {props.alertMessage}
      </div>
      </div>
      {props.alertTitle}
    </div> 
  );
}

export default AlertItem;
