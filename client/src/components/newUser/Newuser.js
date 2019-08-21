import React, { Component } from "react";
import './styles.sass';
import { Link, Redirect  } from 'react-router-dom';
import api from "../../api/server";
import { } from 'react-router-dom';

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
      userName: null,
      address: null,
      email: null,
      password: null,
      formErrors: {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        address:""
      },
      registerError: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Username: ${this.state.userName}
        Address: ${this.state.address}
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
      // remove error message - re-submitting
      this.setState( {registerError: ""});
      const userData = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        userName: this.state.userName,
        password: this.state.password,
        email: this.state.email,
        address: this.state.address
      }
      api.register( userData )
      .then( (registerResult) => {
        // sends register data to App
        this.props.authUser(
          registerResult.jwt,
          registerResult.userData
        );
      })
      .catch( (message) => {
        this.setState({ registerError: message});
      });
    } else {
      this.setState({ registerError: "Form invalid - try again"});
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characters required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "minimum 3 characters required" : "";
        break;
      case "userName":
        formErrors.userName =
          value.length < 5 ? "minimum 5 characters required" : "";
        break;
      case "address":
        formErrors.address =
          value.length < 10 ? "minimum 10 characters required" : "";
        break;       
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characters required" : "";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value });

    // this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper ">
        <div className="form-wrapper ">
          <h1 id="createAccount-title" >Create Account</h1>
          {/* Notify user of form error */}
          { (this.state.registerError !== "") &&
          <h5 style={{color: "red" }}>{this.state.registerError}</h5>
          }
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder=""
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
                placeholder=""
                type="text"
                name="lastName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>

            <div className="userName">
              <label htmlFor="userName">Username</label>
              <input
                className={formErrors.userName.length > 0 ? "error" : null}
                placeholder=""
                type="text"
                name="userName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.userName.length > 0 && (
                <span className="errorMessage">{formErrors.userName}</span>
              )}
            </div>


            <div className="address">
              <label htmlFor="Address">Address</label>
              <input
                className={formErrors.address.length > 0 ? "error" : null}
                placeholder=""
                type="text"
                name="address"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.address.length > 0 && (
                <span className="errorMessage">{formErrors.address}</span>
              )}
            </div>

            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder=""
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
                placeholder=""
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="createAccount text-center">
              <button type="submit">Create Account</button>
              <Link id="already-account" to="/login" >Already Have an Account?</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Newuser ;
