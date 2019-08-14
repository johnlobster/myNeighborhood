const router = require("express").Router();
const axios = require('axios');
const cheerio = require('cheerio')
const login = require("../controller/loginController");

// Matches with "/api"
// router.route("/api")
//   .get(booksController.findAll)
//   .post(booksController.create);

// login route
router.route("/api/login")
  .post(login.verifyUser);


router.route('/scrape')
  .get(function(){
    console.log('hello from router.route over in api routes')
    axios.get("https://www.kcra.com/local-news/")
      .then(function(response){
      var $ = cheerio.load(response.data);
      $(".grid-content-inner").each(function(i, element){

          // result.push(this);
          let test = $(this).children('li[data-section=news]').find('a').text()

          setTimeout(function(){
            console.log(test)

          },2000)
      })
  })

  // axios.get("https://www.npr.org/sections/news/")
  // .then((response) => {
  //     let $ = cheerio.load(response.data);
  //     $(".item").each(function(i,element) {
  //       // let title = $(element).children('item-info-wrap')
  //       //             .children('item-info')
  //       //             .find('h2.title').text();
  //       console.log('item class')
  //     });
  // })
  })

module.exports = router;