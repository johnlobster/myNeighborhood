// debug logger for use in browser
// matches winston logger setup used in server

// this module returns 4 functions. Error, info and debug, and object pretty-print
// pretty-print of object is of level debug, so should not be used in production
// The message is colored according to level and labeled with [fileName]
// use example: import {wError, wInfo, wDebug, wObj} from "./utils/debug.js")("App");
// the import results are destructured to get the 4 functions

export default function(componentName) {
  return {
    wError: function (inputString, ...otherArgs) {
      // red
      console.log(`\x1b[31m[${componentName}] Error: ${inputString}`, ...otherArgs);
    },
    wInfo: function (inputString, ...otherArgs) {
      console.log(`[${componentName}] Info: ${inputString}`, ...otherArgs);
    },
    wDebug: function (inputString, ...otherArgs) {
      if (process.env.NODE_ENV !== "production") {
        // magenta
        console.log(`\x1b[35m[${componentName}] Debug: ${inputString}`, ...otherArgs);
      }
    },
    wObj: function (obj) {
      if (process.env.NODE_ENV !== "production") {
        console.log(obj)

      }
    }
  }
}
// to use:
// import dBug from "./utilities/debug.js";
// const { wError, wInfo, wDebug, wObj } = dBug("App");

// test code
// wError("An error");
// wInfo("some info");
// wDebug("debug stuff");
// wObj({ fred: { jim: { eric: "hello" } } });
