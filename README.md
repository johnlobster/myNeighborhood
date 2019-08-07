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
Create a `.env` file at the project root. Add the lines
```bash
NODE_ENV="development"
JWT_KEY=12345dsdhfaklkjhgl
```
NODE_ENV is not set by default, but is used to drive logging and some other test functions
It will be automatically set to "test" in test environment, and "production" by `create-react-app` on deployment. If not set, server.js will set it to "production". The .env file is not checked into the git repo to prevent unwanted defaults, so must be created explicitly in the development environment


**Please make sure all changes are done in a branch other than master**

## Sass and css

We are using the Sass preprocessor - it is already integrated into the create-react-app flow. Sass (`.scss`) accepts all css syntax so there need be no changes to any existing style files. The `.sass` syntax is slightly different from css, so cannot be mixed in the same file. Note - to pick up the sass color variables, have to import the colors file located in `src/styles` into every scss/sass file that uses `$color` variables.
```sass
@import "../../styles/colors";
```
To use sass in a project
* `npm install node-sass` (in client directory) The package.json has been updated, but you may still need to install locally if the package hasn't been installed yet
* Rename all style files from `.css` to `.scss`. I think that the `client/src/index.css` file has to be kept as is
* Import the new scss file in the module `.js` file:  `import "./index.scss";`

Please note that sass/css does not support modular class naming. This means that if two classes have the same name, they can overwrite each others' styles. `create-react-app` naturally supports a module mechanism. This will make every class name unique so that there can be no name clashes. It's opt in, so regular css or scss files will work exactly as before. To make it work, do the following
* rename style file from `<name>.scss` to `<name>.module.scss`
* change the style file import to `import styles from "./<name>.module.scss";`
* change `className="myStyle"` to `className={styles.myStyle}` wherever you use your own style. Other style names, for instance bootstrap names, are not affected.


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

## Authentication (login, register, sessions)

### Concepts

A user logs in. If this is successful, the server returns a session token (for instance jwt) and user data information. The client will then send that token back as an Authentication header whenever
the user wants to access a server api that is protected. When receiving that request, the server checks that the token is valid, and then allows the api access. The token is stored in `localStorage` along with any relevant user data. This means that when the client links to a new page, the new page component can check the local storage in `ComponentDidMount()` and keep
the user's session intact. The user's session will also stay intact if they move to a completely different web page. When they return, they will still have the same session information, so don't have to log in again.

JWT is a standard for signing data. If the JWT is altered in any way, the issuer can detect it. JWT stands for JSON Web Token. The jwt creating and setting functions in this app come from the npm module `jsonwebtoken`. The jwt has an expiry date/time, so even if a user has a token in localStorage, it may have expired and so the server will reject the request. The user will then have to log in again. I have set the expiration time to 2 days.

The `bcrypt` npm module is used to "hash" a user's password. This is a one way conversion of
the user's password into a long string of characters. The hashed password is stored in the user database during registration. The unhashed password is never saved. To check the password, there is a bcrypt `compare()` method that checks the user's password against the stored, hashed password.
When the user attempts to log in, the password the user name from the form are sent in the body of the POST request. The request will return pass/fail information to the client.

Both `bcrypt` and jwt generation take a significant amount of time. The functions must therefore be used asynchronously with callbacks. 

There are many different ways to to implement authorization. The session token could be stored by the user as a cookie, as localStorage or as a header that is transmitted automatically with the browser being unable to detect. There are also many options for hashing the password.

### JWT key

For security, the jwt key must be set in the environment variable JWT_KEY. For development
purposes, an arbitrary set of characters will be used if JWT_KEY is not set. For production heroku deployment, JWT_KEY **must** be set.

In development, JWT_KEY can be set in the `.env` file in the server directory, but this is not mandatory
```bash
JWT_KEY=12345dsdhfaklkjhgl
```
### passport

I expected to use the `passport` npm module. `passport` requires a specific "strategy", which then controls how it treats passwords and session tokens. There are over 500 different strategies available. Most tutorials use the "local". When I looked at it, the local strategy requires the developer to set up functions to hash and verify passwords and likewise generating and checking jwts. I decided not to use passport. Where passport would add value is in more complex authorization, using standards such as `Oauth 2.0` that allow the user to login into the website using other accounts, such as google or github. 

### Component and server api testing

In end to end testing, it would be very time consuming to have to make a login every time to run a valid test, so there should be a method to disable the checking

## Testing and continuous integration

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

To make this work, I modified the package.json. Under "scripts", I changed the "test" to run test:server then test:client. test:server runs mocha. test:client cds to client directory and then runs `npm run test`. Travis runs `npm test` by default. I added "testCI" to pass the CI environment variable into the client test, for local testing

Travis is controlled by the `.travis.yml` file. I added install: to it so that it npm installs both server and client node_modules directory



