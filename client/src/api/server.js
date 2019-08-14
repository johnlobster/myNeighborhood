import axios from "axios";
import dBug from "../utilities/debug.js";
const { wError, wInfo, wDebug, wObj } = dBug("server API");

// this is the API that connects to the server. Maybe server.js isn't the best name ...
export default {
  login: (userName, password) =>{
    return new Promise( (resolve, reject) => {
      axios.post("/api/login",{
          userName: userName,
          password: password
      })
        .then(function (response) {
          if (response.data.jwt) {
            // wDebug("Data received from server");
            resolve({jwt: response.data.jwt, userData: response.data.userData});
          }
          else {
            // successful request but no data returned
            // this happens when the password or user name was wrong
            wDebug("POST to /api/login failed - request succeeded (" + response.status + ") but no data returned");
            // return something to print out as an error
            reject(response);
          }
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            wError("POST to /api/login failed with http error code " + error.response.status);
          }
          else {
            // The request was made but no response was received
            wError("POST to /api/login timed out, nothing received");
          }
          reject(error);
        });
    });

  },

  scrape: ()=>{
    console.log('hello from front end server')
    axios.get('/scrape').then(function(res){
      console.log(res.data)
      console.log('hi')
    })
  }
}