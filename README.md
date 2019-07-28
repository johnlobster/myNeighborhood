# myNeighborhood

## Contributors

* Rob Ross
* Eddson Blanco
* Diego Solario
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
To run both node/express server and react
```bash
npm run start
```
To seed the database
```bash
node scripts/dbSeed
```

**Please make sure all changes are done in a branch other than master**

## Testing

### Server (API) tests

```bash
npm run test
```
will run all the tests in the `test` subdirectory. The tests are run in alphabetical order.
mocha and chai are used.

### react tests (individual components)

```bash
cd client
npm run test
```

This is different from the server testing. `react-scripts test` (part of `create-react-app`) uses Jest and watches for file changes and only runs tests where something has changed. 
`react-scripts test` has a command line interface, and will give a list of commands if nothing has 
changed for a while. Two useful commands are "a" to run all tests, and "q" to quit.

We are following the recommended pattern of keeping each test in the same directory as the component definition. The example given is `client/src/App.test.js`

These tests are for individual components,
not testing integration of front end and back end

For documentation, read 

<https://facebook.github.io/create-react-app/docs/running-tests>

