// set up loggers using winston
// can only be used in backend

// this module returns 4 functions. Error, info and debug, and object pretty-print
// pretty-print of object is of level debug, so should not be used in production
// The message is colored according to level and labeled with [fileName]
// use example: let {wError, wInfo, wDebug, wObj} = require("./scripts/debug.js")("server.js");
// the require results are destructured to get the 4 functions

const winston = require('winston');
const util = require('util'); // built into node

//const loggerLevel = (process.env.NODE_ENV === "development") ? "debug" : "info";
/* using npm logging levels (the default)
{
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5
}
*/
// using NODE_ENV==="production" to prevent outputs for "debug" level (including object logger)
// info and error will always be printed out in server logs
// feeding "debug" to logger definitions so that the loggers will always fire

const loggerLevel = "debug";

module.exports = function(fileName) {
  let newLogger = winston.createLogger({
    level: loggerLevel,
    format: winston.format.combine(
      winston.format.label({label: `${fileName}`, message:true}),
      winston.format.splat(),
      winston.format.colorize(
        { all: true, colors: { info: "white", error: "red", debug: "yellow" } }
        ),
        winston.format.printf( info => {
          return `${info.message}`;
        })      
        ),
        transports: [
          new winston.transports.Console()
        ]
  });
  let objLogger = winston.createLogger({
    level: loggerLevel,
    format: winston.format.printf(info => {
      return util.inspect(info.message, false, 4, true);
    }),
    transports: [
      new winston.transports.Console()
    ]
  });
      
      return {
        wError: function (...logMessage) {
          newLogger.error(logMessage);
        },
        wInfo: function (...logMessage) {
          newLogger.info(...logMessage);
        },
        wDebug: function (...logMessage) {
          if (process.env.NODE_ENV !== "production") {
            newLogger.debug(logMessage);
          }
        },
        wObj: function (obj) { 
          // note - should not be used in production as it is slow
          // modified call to util to show 4 levels of hierarchy in console.log output
          // could possibly pass this as a variable into the top level function
          if (process.env.NODE_ENV !== "production") {
            objLogger.debug(obj);
          }
        }
      }
}

