import React from 'react';
import AlertItem from "./AlertItem";

import "./alerts.scss";
import api from "../../api/server";
import dBug from "../../utilities/debug.js";
const { wError, wInfo, wDebug, wObj } = dBug("Alerts component");

/* 
alert displays
- active alerts (passed as prop from App)
- button to add new alerts (expands to form)
- old alerts
*/

class Alerts extends React.Component {
    state= {
        userName: "",
        title: "",
        message: "",
        expiresDate: "",
        inputState: "hidden" 
        // values are "hidden", "input", "inputValid", "newAlert", "badAlert" Would love enumerated type ....
    }

    
    // form input handling
    handleInputChange = event => {
        // Pull the name and value properties off of the event.target (the element which triggered the event)
        const { name, value } = event.target;
        // TODO - input checking
        this.setState({
            [name]: value
        });
    }


    // When the form is submitted, prevent the default event and POST to /api/alerts (returns promise)
    handleFormSubmit = event => {
        event.preventDefault();
        if ((this.state.userName.length === 0) || (this.state.password.length === 0)) {
            // respond to user about invalid search
            wError("Pressed submit without userName or password filled in");
            // TODO - need to show proper user feedback on this
            // I think handleInput change should prevent this so would never be reached
        }
        else {
            wDebug(`Form submit user name ${this.state.userName} password ${this.state.password}`);
            this.setState({loginState:"loggingIn"}); // this can remove search button and put it a loader of some kind
            api.login(this.state.userName, this.state.password)
                .then( ({ jwt, userData}) => {
                    wInfo(`User ${this.state.userName} logged in successfully`);
                    this.props.authUser(jwt, userData); // changes state in App parent component
                    // pop up alert - successful login
                    this.setState({alertVisible: true});
                    // alert dismiss button will redirect to home page
                })
                .catch ( (response) => {
                    if ( response.status === 204) {
                        // response was ok, but password or user name incorrect
                        // don't log an error
                    }
                    else {
                        wError("Login error");
                    }
                    // TODO need proper UI feedback for this (modal ?)
                    this.setState({
                        loginState: "badLogin",
                        password: ""
                        }); // allows user to re-submit without losing user name
                });
            
        }
    }

    // set up alert form
    newAlert = () => {

    }
    render() {
        
        // create booleans to use for status box as can't use an if statement inside render 
        // "input", "inputValid", "loggingIn"
        const hidden = this.state.inputState === "hidden" ;
        const inputNotValid = this.state.inputState === "input";
        const inputValid = this.state.inputState ==="inputValid";
        const newAlert = this.state.inputState === "newAlert";
        const badAlert = this.state.inputState === "badAlert";
        wDebug("active length " + this.props.currentAlerts.length);
        return (
                <div> 
                    <h2 className="alertsHeader">Alerts</h2>
                    {/* Active alerts */}
                    {(this.props.currentAlerts.length !== 0) && 
                        this.props.currentAlerts.map((activeAlert,index) => {
                            return (
                            <AlertItem 
                                activeAlert={true}
                                key={`active_${index}`}
                                alertTitle={activeAlert.title}
                                alertMessage={activeAlert.message}
                                alertUser={activeAlert.userName}
                                alertExpires={activeAlert.expiryDate}
                            />
                        )})
                    }
                    {/* Create new alert */}
                    {hidden ? (
                        <button onClick={this.newAlert}>Create new alert</button>
                    ) : (
                        <div className="AlertsFormBox">

                        </div>
                    )}
                    {/* Previous alerts */}
                    {(this.props.previousAlerts.length !== 0) &&
                        this.props.previousAlerts.map((oldAlert, index) => {
                            return (
                                <AlertItem
                                    key={`old_${index}`}
                                    alertTitle={oldAlert.title}
                                    alertMessage={oldAlert.message}
                                    alertUser={oldAlert.userName}
                                    alertExpires={oldAlert.expiryDate}
                                />
                            )
                        })
                    }
                </div>
        )
    }
}

export default Alerts;
