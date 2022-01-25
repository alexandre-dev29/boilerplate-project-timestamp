// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...

app.get("/api", function (req, res) {
    let date = new Date();
    let jsondate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    res.json({ unix: jsondate.getTime(), utc: date.toUTCString() });
});

app.get("/api/:date", function (req, res) {
    const { date } = req.params;
    const timestamp = parseInt(date * 1, 10);
    const finalDate = new Date(timestamp || date || Date.now());

    let result;

    if (isNaN(+finalDate)) {
        result = { error: "Invalid Date" };
    } else {
        result = {
            unix: finalDate.getTime(),
            utc: finalDate.toUTCString(),
        };
    }
    res.json(result);
});

// listen for requests :)
var listener = app.listen(3001, function () {
    console.log("Your app is listening on port " + listener.address().port);
});
