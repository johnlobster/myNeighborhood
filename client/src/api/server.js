import axios from "axios";
import dBug from "../utilities/debug.js";
const { wError, wInfo, wDebug, wObj } = dBug("server API");

export default {
  login: (userName, password) =>{
    return new Promise( (resolve, reject) => {
      axios.post("/api/login",{
          userName: userName,
          password: password
      })
        .then(function (response) {
          if (response.data.jwt) {
            wDebug("Data received from server");
            console.log(response.data.userData);
            resolve({jwt: response.data.jwt, userData: response.data.userData});
          }
          else {
            // successful request but no data returned
            // not sure that this can happen
            wDebug("POST to /api/login failed - request succeeded but no data returned");
            // return something to print out as an error
            reject(response.headers);
          }
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("GET failed with http error code " + error.response.status);
          }
          else {
            // The request was made but no response was received
            console.log("GET timed out, nothing received");
          }
          reject(error);
        });
    });
  }
}