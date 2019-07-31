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



