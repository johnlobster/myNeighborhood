import axios from "axios";
import moment from "moment";

import dBug from "../utilities/debug.js";
const { wError, wDebug } = dBug("alerts API");

export default {
  // on success returns {activeAlerts:[],oldAlerts:[]}
  getAll: () => {
    return new Promise((resolve, reject) => {
      axios.get("/api/alerts")
      .then((dbResult) => {
        wDebug("getAll: data returned from server")
        // separate into active and old
        let active = [];
        let old = [];
        dbResult.data.forEach( (alert) => {
          if (moment(alert.expiresDate).isAfter(moment())){ 
            active.push(alert);
          }
          else {
            old.push(alert);
          }
        });
        resolve({activeAlerts: active, oldAlerts: old});
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          wError("GET to /api/alerts failed with http error code " + error.response.status);
        }
        else {
          // The request was made but no response was received
          wError("GET to /api/alerts timed out, nothing received");
        }
        reject(error);
      });
    });
  },
  newAlert: (alertData) => {
    return new Promise((resolve, reject) => {
      axios.post("/api/alerts",
        {
          data: alertData,
          headers: {
            "authorization": `Bearer ${alertData.jwt}`
          }
        }
      )
        .then((dbResult) => {
          resolve(dbResult);
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            wError("POST to /api/alerts failed with http error code " + error.response.status);
          }
          else {
            // The request was made but no response was received
            wError("POST to /api/alerts timed out, nothing received");
            // error.response.body.message = "Server timed out, try again";
          }
          reject(error);
        });
    });
  }
}