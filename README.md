# myNeighborhood

## Contributors

* Rob Ross
* Eddson Blanco
* Diego Solorio
* John Webster

## Set up development environment

Setup
```bash
git clone https://github.com/johnlobster/myNeighborhood
cd myNeighborhood
npm install
```
Start mongodb
```
mongodb
```
Note - mongodb must always be running. If your computer restarts for some reason you must start mongodb again

To run both node/express server and react
```bash
npm run start
```
To seed the database
```bash
node scripts/dbSeed
```

**important**
Create a `.env` file at the project root. Add the line
```bash
NODE_ENV="development"
```
NODE_ENV is not set by default, but is used to drive logging and some other test functions
It will be automatically set to "test" in test environment, and "production" by `create-react-app` on deployment. If not set, server.js will set it to "production". The .env file is not checked into the git repo to prevent unwanted defaults, so must be created explicitly in the development environment


**Please make sure all changes are done in a branch other than master**

## Sass and css

We are using the Sass preprocessor - it is already integrated into the create-react-app flow. The following must be done for it to work. Sass (`.scss`) accepts all css syntax so there need be no changes to any style files. 

* `npm install node-sass` (in client directory) The package.json has been updated, but you may still need to install locally if the package hasn't been installed yet
* Rename all style files from `.css` to `.scss`. I think that the `client/src/index.css` file has to be kept as is
* Import the new scss file in the module `.js` file:  `import "./index.scss";`

Please note that sass/css does not support modular class naming. This means that if two classes have the same name, they can overwrite each others' styles. In my last app, I put the module name in front of every class, for instance `HeaderMyAwesomeClassName` to avoid this problem, create-react-app has a built in  option to make the names unique using the `css-modules` package. Requires some very minor changes to component files and scss file names.

## Debug logging

The purpose of this logging is to allow user to write debug/logging statements without having to remove them for production. In addition, on the server side, logs can be sent to files if needed

I have created a simple logging setup, using winston on the server side and javascript on the browser side. The API is the same for both. Four functions are available
* `wError("message");` - always printed out, line is in red.
* `wInfo("message");` - always printed out, line is white, black on browser
* `wDebug("message");` - does not print if NODE_ENV="production", line is yellow, magenta on server
* `wObj(<object>);` - does not print if NODE_ENV="production". Prints out object. More useful on server, as browser console.log prints objects in a more readable fashion

When the debug script is included in the file, a name (string) should be passed in as an argument, to make it
clear which file or Module printed the message. If there are a lot of files named `index.js` this really helps with debugging

Example use
```js
wInfo("Mounted component");
wError("Error mounting component");
wDebug("Fix this problem later);
```
Example output (browser colors)

<code style="color:black">[Header] Info: Mounted component</code>

<code style="color:red">[Footer] Error: Error mounting component</code>

<code style="color:magenta">[/routes/api.js] Debug: Fix this problem later</code>

`console.log()` can be called with multiple arguments. The debug functions support this and all arguments will be printed out, but only the first one will have the right color

`console.log("Example %s", "of string substitution in console.log")` syntax is supported, as all arguments to the debug function are passed into `console.log` The example will print out something like this
```
Example of string substitution in console.log
```

### Server

Script is in `scripts/debug.js`

Example install in file

```js
const { wError, wInfo, wDebug, wObj } = require("./scripts/debug.js")("server.js");
```

### Browser

Script is in `src/utilities/debug.js`

Example install in file. React requires it to be done in this way, otherwise the string identifying the module cannot be passed in.

```js
import dBug from "../../utilities/debug.js";
const { wError, wInfo, wDebug, wObj } = dBug("Header");
```

Some part of react/create-react-app does some javascript linting on the browser side. If you cut and paste the above but don't use all the functions, a warning message will be printed in the browser console. This may only occur in development environment, I haven't tested in production yet. To remove this message, delete the functions that aren't used
```js
import dBug from "../../utilities/debug.js";
const { wInfo } = dBug("Header");
```

## Testing

### Server (API) tests

```bash
npm run test:server
```
will run all the tests in the `test` subdirectory. The tests are run in alphabetical order, and can be run in order if they start `t<test number>`. `t0_canary.js` tests that the test environment works. `t1_userCRUD.js` is an example of api testing. mocha and chai are used.

### react tests (individual components)

```bash
cd client
npm run test
```

This is different from the server testing. `react-scripts test` (part of `create-react-app`) uses Jest and watches for file changes and only runs tests where something has changed. 
`react-scripts test` has a command line interface when watching, and will give a list of commands if nothing has 
changed for a while. Two useful commands are "a" to run all tests, and "q" to quit.

We are following the recommended pattern of keeping each test in the same directory as the component definition. The example given is `client/src/App.test.js`

These tests are for individual components,
not testing integration of front end and back end

For documentation, read 

<https://facebook.github.io/create-react-app/docs/running-tests>

### Continuous integration with Travis CI

Before making a pull request, you should run
```bash
npm run testCI
```
The difference is that the CI environment variable is passed into `react-scripts test` and this prevents Jest from watching files, and forces it to run all tests. It's a good check that nothing has broken. Travis should behave in exactly the same way

Travis build will run automatically from a github pull request. Success/fail will show up in the pull request. All github members can view Travis results, collaborators can restart builds and change settings. Pull requests have a link to Travis results, but it is well hidden. Use the following URL

<https://travis-ci.com/johnlobster/myNeighborhood>

To make this work, I modified the package.json. Under "scripts", I changed the "test" to run test:server then test:client. test:server runs mocha. test:client cds to client directory and then runs `npm run test`. Travis runs `npm test` by default. I added "testCI" to pass the CI environment variable into the client test.

Travis is controlled by the `.travis.yml` file. I added install: to it so that it npm installs both server and client node_modules directory



