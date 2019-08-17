import React from 'react';
import { Link } from 'react-router-dom';
import {Alert} from "reactstrap";
import dBug from "../../utilities/debug.js";
const { wError, wInfo, wDebug, wObj } = dBug("Login");

class LostAndFound extends React.Component {
    // state= {
    //     jwt: "",
    //     userData: {},
    //     userName: "",
    //     password: "",
    //     loginState: "input", 
    //     // values are "input", "inputValid", "loggingIn", "badLogin" Would love enumerated type ....
    //     redirect: false, // seems to me a hack, but this is what was recommended - Redirect is in render()
    //     alertVisible: false
    // }

    // // if a user is already logged in, get jwt and userData from localStorage
    // componentDidMount() {
    //     wDebug("Component mounted");
    //     if ( localStorage.getItem("myNeighborhoodJwt") === null) {
    //         wDebug("No stored session information");
    //     }
    //     else {
    //         const userData = JSON.parse(localStorage.getItem("myNeighborhoodUserData"));
    //         wDebug("Found stored session information for user " +  userData.userName);
    //         this.setState( { 
    //             jwt: localStorage.getItem("myNeighborhoodJwt"),
    //             userData: userData
    //         });
    //     }

    // }
    // // need to set loginState
    // handleInputChange = event => {
    //     // Pull the name and value properties off of the event.target (the element which triggered the event)
    //     const { name, value } = event.target;
    //     let newState = this.state.loginState;
    //     if ( name=== "userName" && this.state.password.length !== 0) {
    //         newState= "inputValid";
    //     }
    //     else {
    //         if (name === "password" && this.state.userName.length !== 0) {
    //             newState= "inputValid";
    //         }
    //     } 
    //     if ( newState === this.state.loginState) {
    //         // if no change in state don't update it because that will cause a re-render
    //         // do have change state for the form entry field
    //         this.setState({
    //             [name]: value
    //         });
    //     }
    //     else {
    //         this.setState({
    //             [name]: value,
    //             loginState: newState
    //         });
    //     }
    // }


    // // When the form is submitted, prevent the default event and call /api/login (returns promise)
    // // this function may need to be passed down from a higher level
    // // on successful login, call this.props.validUser, which is passed down from App
    // handleFormSubmit = event => {
    //     event.preventDefault();
    //     if ((this.state.userName.length === 0) || (this.state.password.length === 0)) {
    //         // respond to user about invalid search
    //         wError("Pressed submit without userName or password filled in");
    //         // TODO - need to show proper user feedback on this
    //         // I think handleInput change should prevent this so would never be reached
    //     }
    //     else {
    //         wDebug(`Form submit user name ${this.state.userName} password ${this.state.password}`);
    //         this.setState({loginState:"loggingIn"}); // this can remove search button and put it a loader of some kind
    //         api.login(this.state.userName, this.state.password)
    //             .then( ({ jwt, userData}) => {
    //                 wInfo(`User ${this.state.userName} logged in successfully`);
    //                 // TODO successful login, store state in localStorage
    //                 localStorage.setItem("myNeighborhoodJwt", jwt);
    //                 localStorage.setItem("myNeighborhoodUserData", JSON.stringify(userData));
    //                 this.props.validUser(jwt, userData); // changes state in App
    //                 // pop up alert
    //                 this.setState({alertVisible: true});
    //                 // alert dismiss button will redirect to home page
    //                 // TODO improve UI
    //                 // may never reach this
    //                 // this.setState({redirect: true});
    //             })
    //             .catch ( (response) => {
    //                 if ( response.status === 204) {
    //                     // response was ok, but password or user name incorrect
    //                     // don't log an error
    //                 }
    //                 else {
    //                     wError("Login error");
    //                 }
    //                 // TODO need proper UI feedback for this (modal ?)
    //                 this.setState({
    //                     loginState: "badLogin",
    //                     password: ""
    //                     }); // allows user to re-submit without losing user name
    //             });
            
    //     }
    // }
    render() {
        // if (this.state.redirect) {
        //     return <Redirect push to="/" />;
        // }
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
                                <div className={styles.alertWrapper}>
                                    <Alert
                                        className={styles.alert}
                                        isOpen={this.state.alertVisible}>
                                        <div className={"container container-fluid " + styles.alertContainer}>
                                            <div className={"row " + styles.alertRow}>
                                                <h2 className={styles.alertH2}>Login successful</h2>
                                            </div>
                                            <div className={"row " + styles.alertRow}>
                                                <Link to="/">
                                                    <button className={styles.alertButton}>
                                                        Continue to home page
                                                        </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </Alert>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12, col-md-6">
                                <div className={styles.LoginSignupBox}>
                                    <Link to="Newuser">
                                    <button className={"btn " + styles.signupButton}>Signup</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default LostAndFound;

