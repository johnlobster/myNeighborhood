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
      {/* Extra line in table, showing  alert time remaining*/}
      <div className="alertItemEntryBox" >
        {props.activeAlert &&
          <div className="alertItemActiveBox">
            <div className="alertItemUserName">
              Created by  {props.alertUser}
            </div>
            <div className="alertItemTimeRemaining">
              Time left {props.alertExpires}
            </div>
          </div>
        }
        <div className="alertItemBox1">
          <div className="alertItemTitle">
            {props.alertTitle}
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
