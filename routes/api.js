const router = require("express").Router();
const axios = require('axios');
const cheerio = require('cheerio')

const { wError, wInfo, wDebug, wObj } = require("../scripts/debug")("routes/api");
const login = require("../controller/loginController");
const register = require("../controller/register");
const { validateJWT } = require("../controller/authentication");


// Middleware to check incoming jwt token and pass on a req.authorized field 
router.use(function (req, res, next) {
  wDebug("http " + req.url + " " + req.method + " ");
  if (req.headers.authorization) {
    // Header has "Bearer <key>"
    validateJWT(req.headers.authorization.split(" ")[1])
      .then((payload) => {
        // valid JWT, pass on to rest of flow
        req.authorized = true;
        wDebug("Valid authentication header found");
        next();
      })
      .catch((err) => {
        // jwt code returns error for invalid jwt, so don't print out these errors
        // wError("Invalid JWT (should this be an error ?)");
        // wError(err);
        req.authorized = false;
        next();
      })
  }
  else {
    wDebug("No authentication header found");
    req.authorized = false;
    next();
  }
});


// this route allows client to check that a previously saved jwt is still valid
// jwt has a timeout so this is possible
// very simple route so not in a separate file 
router.route("/api/pingtoken")
  .get( (req, res) => {
    if (req.authorized) {
      res.json({ jwtValid: true });
    }
    else {
      wDebug("/api/pingtoken bad token");
      res.json({ jwtValid: false });
    }
  });

router.route("/api/register")
  .post(register);

// login route
router.route("/api/login")
  .post(login.verifyUser);


router.route('/scrape')
  .get(function(){
    console.log('hello from router.route over in api routes')
    axios.get("https://www.kcra.com/local-news/")
      .then(function(response){
      var $ = cheerio.load(response.data);
      $("[data-subsection=local-news]").each(function(i, element){

          // result.push(this);
          let cat = $(this).text()
          console.log(cat)
      })
  })

  axios.get("https://www.kcra.com/local-news/")
  .then((response) => {
      let $ = cheerio.load(response.data);
      $(".listing-page-grid").each(function(i,element) {
        // let title = $(element).children('item-info-wrap')
        //             .children('item-info')
        //             .find('h2.title').text();
        console.log(element);
      });
  })
  })

module.exports = router;