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
      .then(function (response) {
        console.log(response.data);
        next();
      })
      .catch(function (error) {
        console.error(error);
      });
  }
};
