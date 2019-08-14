// import React from 'react';
// import { Link } from 'react-router-dom';
// import {Alert} from "reactstrap";
// import styles from "./Login.module.scss";
// import api from "../../api/server";
// import dBug from "../../utilities/debug.js";
// const { wError, wInfo, wDebug, wObj } = dBug("Login");

// class Newuser extends React.Component {
//     state= {
//         jwt: "",
//         userData: {},
//         userName: "",
//         phoneNumber: "",
//         email:"",
//         petName:"",
//         imgPet:"",
//         password: "",
//         loginState: "input", 
//         // values are "input", "inputValid", "loggingIn", "badLogin" Would love enumerated type ....
//         redirect: false, // seems to me a hack, but this is what was recommended - Redirect is in render()
//         alertVisible: false
//     }

//     // if a user is already logged in, get jwt and userData from localStorage
//     componentDidMount() {
//         wDebug("Component mounted");
//         if ( localStorage.getItem("myNeighborhoodJwt") === null) {
//             wDebug("No stored session information");
//         }
//         else {
//             const userData = JSON.parse(localStorage.getItem("myNeighborhoodUserData"));
//             wDebug("Found stored session information for user " +  userData.userName);
//             this.setState( { 
//                 jwt: localStorage.getItem("myNeighborhoodJwt"),
//                 userData: userData
//             });
//         }

// }
//     // need to set loginState
//     handleInputChange = event => {
//         // Pull the name and value properties off of the event.target (the element which triggered the event)
//         const { name, value } = event.target;
//         let newState = this.state.loginState;
//         if ( name=== "userName" && this.state.password.length !== 0) {
//             newState= "inputValid";
//         }
//         else {
//             if (name === "password" && this.state.userName.length !== 0) {
//                 newState= "inputValid";
//             }
//         } 
//         if ( newState === this.state.loginState) {
//             // if no change in state don't update it because that will cause a re-render
//             // do have change state for the form entry field
//             this.setState({
//                 [name]: value
//             });
//         }
//         else {
//             this.setState({
//                 [name]: value,
//                 loginState: newState
//             });
//         }
//     }


//     // When the form is submitted, prevent the default event and call /api/login (returns promise)
//     // this function may need to be passed down from a higher level
//     handleFormSubmit = event => {
//         event.preventDefault();
//         if ((this.state.userName.length === 0) || (this.state.password.length === 0)) {
//             // respond to user about invalid search
//             wError("Pressed submit without userName or password filled in");
//             // TODO - need to show proper user feedback on this
//             // I think handleInput change should prevent this so would never be reached
//         }
//         else {
//             wDebug(`Form submit user name ${this.state.userName} password ${this.state.password}`);
//             this.setState({loginState:"loggingIn"}); // this can remove search button and put it a loader of some kind
//             api.login(this.state.userName, this.state.password)
//                 .then( ({ jwt, userData}) => {
//                     wInfo(`User ${this.state.userName} logged in successfully`);
//                     // TODO successful login, store state in localStorage
//                     localStorage.setItem("myNeighborhoodJwt", jwt);
//                     localStorage.setItem("myNeighborhoodUserData", JSON.stringify(userData));
//                     // pop up alert
//                     this.setState({alertVisible: true});
//                     // alert dismiss button will redirect to home page
//                     // TODO improve UI
//                     // may never reach this
//                     // this.setState({redirect: true});
//                 })
//                 .catch ( (response) => {
//                     if ( response.status === 204) {
//                         // response was ok, but password or user name incorrect
//                         // don't log an error
//                     }
//                     else {
//                         wError("Login error");
//                     }
//                     // TODO need proper UI feedback for this (modal ?)
//                     this.setState({
//                         loginState: "badLogin",
//                         password: ""
//                         }); // allows user to re-submit without losing user name
//                 });
            
//         }
//     }
//     render() {
//         // if (this.state.redirect) {
//         //     return <Redirect push to="/" />;
//         // }
//         // create booleans to use for status box as can't use an if statement inside render 
//         // "input", "inputValid", "loggingIn"
//         const inputNotValid = this.state.loginState === "input";
//         const inputValid = this.state.loginState ==="inputValid";
//         const loggingIn = this.state.loginState === "loggingIn";
//         const badLogin = this.state.loginState === "badLogin";
//         // console.log( inputNotValid, inputValid, loggingIn);
//         return (
//                 <div className={styles.LoginFormBox}>
//                     <h1 className={styles.LoginFormTitle}>Create Account</h1>
//                     <div className="container">
//                         <div className="row">
//                             <div className="col-12, col-md-6">
//                                 <form>
//                                     <div className="form-group">
//                                         <label htmlFor="userName">User name</label>
//                                         <input
//                                             className="form-control"
//                                             id="userName"
//                                             type="text"
//                                             placeholder="user name"
//                                             name="userName"
//                                             value={this.state.userName}
//                                             onChange={this.handleInputChange}
//                                         />
//                                     </div>
//                                     <div className="form-group">
//                                         <label htmlFor="firstName">First Name</label>
//                                         <input
//                                             className="form-control"
//                                             id="firstName"
//                                             type="text"
//                                             placeholder="First Name"
//                                             name="firstname"
//                                             value={this.state.firstName}
//                                             onChange={this.handleInputChange}
//                                         />
//                                     </div>
//                                     <div className="form-group">
//                                         <label htmlFor="lastName">Last Name</label>
//                                         <input
//                                             className="form-control"
//                                             id="lastName"
//                                             type="text"
//                                             placeholder="last name"
//                                             name="lastName"
//                                             value={this.state.lastName}
//                                             onChange={this.handleInputChange}
//                                         />
//                                     </div>
//                                     <div className="form-group">
//                                         <label htmlFor="phoneNumber">Phone Number</label>
//                                         <input
//                                             className="form-control"
//                                             id="phoneNumber"
//                                             type="number"
//                                             placeholder="Phone Number"
//                                             name="phoneNumber"
//                                             value={this.state.phoneNumber}
//                                             onChange={this.handleInputChange}
//                                         />
//                                     </div>
//                                     <div className="form-group">
//                                         <label htmlFor="petName">Pet Name</label>
//                                         <input
//                                             className="form-control"
//                                             id="petName"
//                                             type="text"
//                                             placeholder="Pet Name"
//                                             name="petName"
//                                             value={this.state.petName}
//                                             onChange={this.handleInputChange}
//                                         />
//                                     </div>
//                                     <div className="form-group">
//                                         <label htmlFor="imgPet">Picture Pet</label>
//                                         <input
//                                             className="form-control"
//                                             id="imgPet"
                                            
//                                             placeholder="Picture pet"
//                                             name="imgPet"
//                                             value={this.state.imgPet}
//                                             onChange={this.handleInputChange}
//                                         />
//                                     </div>
//                                     <div className="form-group">
//                                         <label htmlFor="password">Password</label>
//                                         <input
//                                             className="form-control"
//                                             id="passwordInput"
//                                             type="password"
//                                             placeholder="password"
//                                             name="password"
//                                             value={this.state.password}
//                                             onChange={this.handleInputChange}
//                                         />
//                                     </div>
//                                     <div className={styles.LoginButtonBox}>
//                                     {/* Select between no entry, login button and logging in loader */}
//                                     { inputNotValid &&
//                                         <div><h3> </h3></div>
//                                     }
//                                     { inputValid &&
//                                         <button
//                                         disabled={this.state.searchDisable}
//                                         className={"btn " + styles.LoginFormButton + " btn-primary"}
//                                         onClick={this.handleFormSubmit}>Login</button>
//                                     }
//                                     { loggingIn &&
//                                         <div><h3>Logging in</h3></div>
//                                     }
//                                     { badLogin &&
//                                         <div><h5>Something went wrong logging in, please try again</h5></div>
//                                     }
//                                     </div>  
//                                 </form>
//                                 <div className={styles.alertWrapper}>
//                                     <Alert
//                                         className={styles.alert}
//                                         isOpen={this.state.alertVisible}>
//                                         <div className={"container container-fluid " + styles.alertContainer}>
//                                             <div className={"row " + styles.alertRow}>
//                                                 <h2 className={styles.alertH2}>Login successful</h2>
//                                             </div>
//                                             <div className={"row " + styles.alertRow}>
//                                                 <Link to="/">
//                                                     <button className={styles.alertButton}>
//                                                         Continue to home page
//                                                         </button>
//                                                 </Link>
//                                             </div>
//                                         </div>
//                                     </Alert>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="row">
//                             <div className="col-12, col-md-6">
//                                 <div className={styles.LoginSignupBox}>
//                                     <Link to="Newuser">
//                                     <button className={"btn " + styles.signupButton}>Signup</button>
//                                     </Link>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//         )
//     }
// }

// export default Newuser;

import React, { Component } from "react";
// import "./App.css";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class Newuser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                type="text"
                name="firstName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                type="text"
                name="lastName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="createAccount">
              <button type="submit">Create Account</button>
              <small>Already Have an Account?</small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Newuser ;
