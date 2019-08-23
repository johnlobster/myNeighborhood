import React from 'react';
import { Link } from 'react-router-dom';
import moment from "moment";

import AlertItem from "./AlertItem";

import "./alerts.scss";
import api from "../../api/alertsAPI";
import dBug from "../../utilities/debug.js";
const { wError } = dBug("Alerts component");

/* 
alert displays
- active alerts (passed as prop from App)
- button to add new alerts (expands to form)
- old alerts
*/

class Alerts extends React.Component {
    state= {
        title: "",
        message: "",
        expires: "",
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
        if ((this.state.title.length === 0) || (this.state.expires.length === 0)) {
            // respond to user about invalid search
            wError("Pressed submit without title or expiry date filled in");
            // TODO - need to show proper user feedback on this
        }
        else {
            const userData = JSON.parse(localStorage.getItem("myNeighborhoodUserData"));
            let alertData = {
                userName: userData.userName,
                jwt: localStorage.getItem("myNeighborhoodJwt"),
                title: this.state.title,
                message: this.state.message,
                expiresDate: moment().add(parseFloat(this.state.expires), "hours").toDate()
            }   
            api.newAlert(alertData)
            .then( (result) => {
                //
            })
            .catch( (error) => {
                //
            })
        }
    }


    // show alert form
    newAlert = () => {
        this.setState({inputState: "input"});
    }
    render() {
        
        // create booleans to use for status box as can't use an if statement inside render 
        // "input", "inputValid", "loggingIn"
        const hidden = this.state.inputState === "hidden" ;
        const input = this.state.inputState === "input";
        const inputValid = this.state.inputState ==="inputValid";
        // const newAlert = this.state.inputState === "newAlert";
        const badAlert = this.state.inputState === "badAlert";
        return (
                <div className="alertsWrapper"> 
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
                                alertExpires={moment(activeAlert.expiryDate).format("H:mm")}
                            />
                        )})
                    }
                    {/* Create new alert only if logged in */}
                    {hidden ? (
                        <div>
                        {this.props.authorizedUser ? (
                            <button onClick={this.newAlert} className="alertsNewAlertButton">Create new alert</button>
                        ) : (
                            <h4 className="alertsNotAuthorized">
                                Must be logged in to create a new alert
                                <span>
                                    <Link to="/Login">
                                        <button className="alertsNewAlertButton alertsLoginButtonMod">
                                            Login
                                        </button>
                                    </Link>
                                </span>
                            </h4>
                        )}
                        </div>
                        
                    ) : (
                        <div className="AlertsFormBox">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input
                                        className="form-control"
                                        id="title"
                                        type="text"
                                        placeholder="Title for new alert"
                                        name="title"
                                        value={this.state.title}
                                        onChange={this.handleInputChange}
                                    />
                                    <label htmlFor="message">Message</label>
                                    <input
                                        className="form-control"
                                        id="message"
                                        type="text"
                                        placeholder="Message for new alert"
                                        name="message"
                                        value={this.state.message}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="expires">Expires</label>
                                    <input
                                        className="form-control"
                                        id="expires"
                                        type="text"
                                        placeholder="Expiry time in hours"
                                        name="expires"
                                        value={this.state.expires}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="createAccount">
                                    <button 
                                        className="alertsNewAlertButton"
                                        onClick={this.handleFormSubmit}>
                                        New alert
                                    </button>
                                </div>
                            </form>
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
