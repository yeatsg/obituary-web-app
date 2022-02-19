const axios = require("axios");

module.exports = (req, res, next) => {
  if (req.body.floridaMan) {
    console.log("florida Man checked and api request sent");
    axios
      .request({
        method: "GET",
        url: "https://google-search3.p.rapidapi.com/api/v1/news/q=florida+man+alligator",
        headers: {
          "x-user-agent": "desktop",
          "x-proxy-location": "US",
          "x-rapidapi-host": "google-search3.p.rapidapi.com",
          "x-rapidapi-key":
            "0d606d157emshcdbc7685b5ffb85p19f6cdjsn62fcd40f1ae3",
        },
      })
      .then((searchObject) => {
        let articleIndex = Math.floor(
          Math.random() * searchObject.data.entries.length
        );
        console.log(searchObject.data.entries[articleIndex]);
        req.body.floridaManSlug = searchObject.data.entries[articleIndex].title;
        req.body.floridaManURL = searchObject.data.entries[articleIndex].link;
        console.log("new floridaManSlug", req.body.floridaManSlug);
        console.log("new URL", req.body.floridaManURL);
        next();
      })
      .catch((error) => {
        console.error(error);
      });
  }
};
