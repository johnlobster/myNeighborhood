import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./style.scss";
import api from "../../api/server";
import dBug from "../../utilities/debug.js";
const { wError, wDebug } = dBug("Login");

class Login extends React.Component {
    state= {
        userName: "",
        password: "",
        loginState: "input",
        // values are "input", "inputValid", "loggingIn", "badLogin" Would love enumerated type ....
        redirect: false, // seems to me a hack, but this is what was recommended - Redirect is in render()
        alertVisible: false
    }

    
    // form input handling
    handleInputChange = event => {
        // Pull the name and value properties off of the event.target (the element which triggered the event)
        const { name, value } = event.target;
        let newState = this.state.loginState;
        if (name === "userName" && this.state.password.length !== 0) {
            newState = "inputValid";
        }
        else {
            if (name === "password" && this.state.userName.length !== 0) {
                newState = "inputValid";
            }
        }
        if (newState === this.state.loginState) {
            // if no change in state don't update it because that will cause a re-render
            // do have change state for the form entry field
            this.setState({
                [name]: value
            });
        }
        else {
            this.setState({
                [name]: value,
                loginState: newState
            });
        }
    }


    // When the form is submitted, prevent the default event and call /api/login (returns promise)
    // on successful login, call this.props.validUser, which is passed down from App component
    handleFormSubmit = event => {
        event.preventDefault();
        if ((this.state.userName.length === 0) || (this.state.password.length === 0)) {
            // respond to user about invalid search
            wError("Pressed submit without userName or password filled in");
            // TODO - need to show proper user feedback on this
            // I think handleInput change should prevent this so would never be reached
        }
        else {
            wDebug(`Form submit user name ${this.state.userName}`);
            this.setState({ loginState: "loggingIn" }); // this can remove search button and put it a loader of some kind
            api.login(this.state.userName, this.state.password)
                .then(({ jwt, userData }) => {
                    wDebug(`User ${this.state.userName} logged in successfully`);
                    console.log(userData);
                    this.props.authUser(jwt, userData); // changes state in App parent component
                    // pop up alert - successful login
                    // this.setState({alertVisible: true});
                    // alert dismiss button will redirect to home page
                    this.props.history.push('/')
                    
                })
                .catch((response) => {
                    if (response.status === 204) {
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
    render() {
        
        // create booleans to use for status box as can't use an if statement inside render 
        // "input", "inputValid", "loggingIn"
        const inputNotValid = this.state.loginState === "input";
        const inputValid = this.state.loginState === "inputValid";
        const loggingIn = this.state.loginState === "loggingIn";
        const badLogin = this.state.loginState === "badLogin";
        return ( 
                <div className="loginWrapper d-flex flex-column  align-items-center ">
                    <h1 className="text-center font-weight-light" >Login</h1>
                    <div className="formWrapper">
                            <form className=' d-flex flex-column '>
                                <div className="form-group">
                                    <label htmlFor="userName">User name</label>
                                    <input
                                        className="form-control"
                                        id="userName"
                                        type="text"
                                        placeholder=""
                                        name="userName"
                                        value={this.state.userName}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        className="form-control"
                                        id="passwordInput"
                                        type="password"
                                        placeholder=""
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="alerts">
                                    {/* Select between no entry, login button and logging in loader */}
                                    {inputNotValid &&
                                        <div  className="wrong" >Username and/or password can't be blank</div>
                                    }
                                    {inputValid &&
                                        <button
                                            disabled={this.state.searchDisable}
                                            className="loginButton"
                                            onClick={this.handleFormSubmit}>Login</button>
                                    }
                                    {loggingIn &&
                                        <div>Logging in</div>
                                    }
                                    {badLogin &&
                                        <div  className="wrong" >Username and/or password are incorrect</div>
                                    }
                                </div>
                            </form>
                        </div>
                    <div className='newAccountWrapper'>
                        <Link to="/Newuser" >
                            New Account?
                        </Link>
                    </div>
                    
                </div>
        )
    }
}

export default Login;

