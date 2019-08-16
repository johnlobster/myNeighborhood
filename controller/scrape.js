const axios = require('axios');
const cheerio = require('cheerio');
const { wError, wInfo, wDebug, wObj } = require("../scripts/debug")("scrape");


module.exports = function (req, res) {
  wDebug("scraping");
  axios.get("https://www.kcra.com/local-news/")
    .then(function (response) {
      wDebug("scraped data");
      let results = [];
      let $ = cheerio.load(response.data);
      $("[data-subsection=local-news]").each(function (i, element) {
        // let cat = $(this).text()
        // console.log(cat)
        wObj(element);
      });
      res.json(results);
    })
    .catch((err) => {
      wError("Error scraping");
      res.status(400).end();
      wObj(err);
    })
}