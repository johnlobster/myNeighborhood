// debug logger for use in browser
// matches winston logger setup used in server

// this module returns 4 functions. Error, info and debug, and object pretty-print
// pretty-print of object is of level debug, so should not be used in production
// The message is colored according to level and labeled with [fileName]
// use example: import {wError, wInfo, wDebug, wObj} from "./utils/debug.js")("App");
// the import results are destructured to get the 4 functions

// TODO: use a REACT_APP variable to determine logging level
export default function(componentName) {
  return {
    wError: function (...logMessage) {
      // red
      console.log(`\x1b[31m[${componentName}] Error: `, logMessage);
    },
    wInfo: function (...logMessage) {
      console.log(`[${componentName}] Info: `, logMessage);
    },
    wDebug: function (...logMessage) {
      // magenta
      console.log(`\x1b[35m[${componentName}] Debug: `, logMessage);

    },
    wObj: function (obj) {
      console.log(obj)

    }
  }
}
// to use:
// import debug from "./utilities/debug.js";
// const { wError, wInfo, wDebug, wObj } = debug("App");

// test code
// wError("An error");
// wInfo("some info");
// wDebug("debug stuff");
// wObj({ fred: { jim: { eric: "hello" } } });
