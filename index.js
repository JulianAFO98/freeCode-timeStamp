// index.js
// where your node app starts

// init project
var express = require('express');
const { validateDate, isDateUnix } = require("./helpers");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date?", (req, res) => {
  let dateUnix;
  let dateUTC;
  try {
    const { date } = req.params;
    if (!date) {
      return res.status(200).json({ unix: Math.floor(new Date().getTime()), utc: new Date() })
    }


    const isValidDate = validateDate(date);
    if (!isValidDate) {
      throw new Error("Invalid Date");
    }

    const isUnix = isDateUnix(date);
    if (isUnix) {
      dateUnix = Number(date);
      dateUTC = new Date(Number(date)).toUTCString();
      return res.status(200).json({ unix: dateUnix, utc: dateUTC });
    } else {
      dateUnix = Math.floor(new Date(date).getTime());
      dateUTC = new Date(date).toUTCString();
      return res.status(200).json({ unix: dateUnix, utc: dateUTC });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
