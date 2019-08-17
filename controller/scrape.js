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
      $(".grid-content-inner").each(function (i, element) {
        let title = $(this)
          .find("a").text().trim();
         


        let site = $(this)
          .find("a").attr("href");
          console.log(site);
        
        results.push({title: title, site: "https://www.kcra.com"+ site})
      });
      res.json(results);
    })
    .catch((err) => {
      wError("Error scraping");
      res.status(400).end();
      wObj(err);
    })
}