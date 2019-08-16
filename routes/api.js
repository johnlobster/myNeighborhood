const router = require("express").Router();


const { wError, wInfo, wDebug, wObj } = require("../scripts/debug")("routes/api");
const login = require("../controller/loginController");
const register = require("../controller/register");
const { validateJWT } = require("../controller/authentication");
const scrape = require("../controller/scrape");


// Middleware to check incoming jwt token and pass on a req.authorized field 
router.use(function (req, res, next) {
  wDebug("http " + req.url + " " + req.method + " ");
  if (req.headers.authorization) {
    // Header has "Bearer <key>"
    auth.validateJWT(req.headers.authorization.split(" ")[1])
      .then((payload) => {
        // valid JWT, pass on to rest of flow
        req.authorized = true;
        next();
      })
      .catch((err) => {
        // jwt code returns error for invalid jwt, so don't print out these errors
        // wError("Invalid JWT (should this be an error ?)");
        // wError(err);
        next();
      })
  }
  else {
    wDebug("No authentication header found");
    next();
  }
});


// this route allows client to check that a jwt is still valid
router.route("api/pingtoken")
  .post( (req, res) => {
    res.json({jwtValid: true})
  });

router.route("/api/register")
  .post(register);

// login route
router.route("/api/login")
  .post(login.verifyUser);


router.route('/api/scrape')
  .get(scrape)

//   // axios.get("https://www.npr.org/sections/news/")
//   // .then((response) => {
//   //     let $ = cheerio.load(response.data);
//   //     $(".item").each(function(i,element) {
//   //       // let title = $(element).children('item-info-wrap')
//   //       //             .children('item-info')
//   //       //             .find('h2.title').text();
//   //       console.log('item class')
//   //     });
//   // })
//   })

module.exports = router;