import axios from "axios";
import dBug from "../utilities/debug.js";
const { wError, wInfo, wDebug, wObj } = dBug("server API");

export default {
  login: () =>{
    return new Promise( (resolve, reject) => {
      resolve();
    });
  }
}