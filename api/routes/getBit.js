var express = require("express");
var router = express.Router();
const request = require("request");

router.get("/", function(req, res, next) {
  request(
    "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=ILS&apikey=72OBWVGSE8LVHUCZ",
    { json: true },
    (err, response, body) => {
      if (err) {
        return console.log(err);
      }
      res.send(JSON.stringify(body));
    }
  );
});
router.get("/byDate", function(req, res, next) {
  request(
    "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=ILS&apikey=72OBWVGSE8LVHUCZ",
    { json: true },
    (err, response, body) => {
      if (err) {
        return console.log(err);
      }
      res.send(
        JSON.stringify(
          body[["Time Series (Digital Currency Daily)"]][req.query.selectedDate]
        )
      );
    }
  );
});

// TODO: put api key in env file

module.exports = router;
