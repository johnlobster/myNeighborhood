import React from 'react';
import { Redirect } from 'react-router';
import styles from "./Login.module.scss";
import api from "../../api/server";
import dBug from "../../utilities/debug.js";
const { wError, wInfo, wDebug, wObj } = dBug("Login");

class Login extends React.Component {
    state= {
        jwt: "",
        userData: {},
        userName: "",
        password: "",
        loginState: "input", 
        // values are "input", "inputValid", "loggingIn", "badLogin" Would love enumerated type ....
        redirect: false // seems to me a hack, but this is what was recommended - Redirect is in render()
    }

    // if a user is already logged in, get jwt and userData from localStorage
    componentDidMount() {
        wDebug("Component mounted");
        if ( localStorage.getItem("myNeighborhoodJwt") === null) {
            wDebug("No stored session information");
        }
        else {
            console.log(localStorage.getItem("myNeighborhoodUserData"));
            const userData = JSON.parse(localStorage.getItem("myNeighborhoodUserData"));
            wDebug("Found stored session information for user " +  userData.userName);
            this.setState( { 
                jwt: localStorage.getItem("myNeighborhoodJwt"),
                userData: userData
            });
        }

}
    // need to set loginState
    handleInputChange = event => {
        // Pull the name and value properties off of the event.target (the element which triggered the event)
        const { name, value } = event.target;
        let newState = this.state.loginState;
        if ( name=== "userName" && this.state.password.length !== 0) {
            newState= "inputValid";
        }
        else {
            if (name === "password" && this.state.userName.length !== 0) {
                newState= "inputValid";
            }
        } 
        if ( newState === this.state.loginState) {
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
    // this function may need to be passed down from a higher level
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
                    console.log(userData);
                    // TODO successful login, store state in localStorage
                    localStorage.setItem("myNeighborhoodJwt", jwt);
                    localStorage.setItem("myNeighborhoodUserData", JSON.stringify(userData));

                    // redirect to home page (maybe pop up a success modal first ?)
                    // TODO improve UI
                    // don't need to setState() for password/userId because component gets unmounted on redirect
                    // this.setState({ userName: "", password: "", loginState: "input" });
                    this.setState({redirect: true});
                })
                .catch ( () => {
                    wError("Login error");
                    // TODO need proper UI feedback for this (modal ?)
                    this.setState({
                        loginState: "badLogin",
                        password: ""
                        }); // allows user to re-submit without losing user name
                });
            
        }
    }
    render() {
        if (this.state.redirect) {
            return <Redirect push to="/" />;
        }
        // create booleans to use for status box as can't use an if statement inside render 
        // "input", "inputValid", "loggingIn"
        const inputNotValid = this.state.loginState === "input";
        const inputValid = this.state.loginState ==="inputValid";
        const loggingIn = this.state.loginState === "loggingIn";
        const badLogin = this.state.loginState === "badLogin";
        // console.log( inputNotValid, inputValid, loggingIn);
        return (
                <div className={styles.LoginFormBox}>
                    <h1 className={styles.LoginFormTitle}>Login form</h1>
                    <div className="container">
                        <div className="row">
                            <div className="col-12, col-md-6">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="userName">User name</label>
                                        <input
                                            className="form-control"
                                            id="userName"
                                            type="text"
                                            placeholder="user name"
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
                                            placeholder="password"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.handleInputChange}
                                        />
                                    </div>
                                    <div className={styles.LoginButtonBox}>
                                    {/* Select between no entry, login button and logging in loader */}
                                    { inputNotValid &&
                                        <div><h3>Enter user Name and password</h3></div>
                                    }
                                    { inputValid &&
                                        <button
                                        disabled={this.state.searchDisable}
                                        className={"btn " + styles.LoginFormButton + " btn-primary"}
                                        onClick={this.handleFormSubmit}>Login</button>
                                    }
                                    { loggingIn &&
                                        <div><h3>Logging in</h3></div>
                                    }
                                    { badLogin &&
                                        <div><h5>Something went wrong logging in, please try again</h5></div>
                                    }
                                    </div>  
                                </form>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12, col-md-6">
                                <div className={styles.LoginSignupBox}>
                                    <button className="btn">Signup</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default Login;