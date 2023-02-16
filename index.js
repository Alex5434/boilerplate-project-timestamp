// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const moment = require('moment')

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/:date', (req, res) => {
  const date = req.params.date;
  let uni, tim
  if((new Date(parseInt(date)).toString()==='Invalid Date')){
    return res.json({error:"Invalid Date"})
  }
  // date.indexOf('-')===-1
  if((new Date(parseInt(date))).getTime()===parseInt(date) && date.indexOf('-')===-1
    && date.indexOf(' ')===-1){
    uni = parseInt(date);
    tim = new Date(parseInt(date)).toUTCString();
  }
  else{
    uni  = (new Date(date)).getTime()
    tim = (new Date(parseInt(uni))).toUTCString();
  }
  res.json({unix:uni, utc:tim})
})



// your first API endpoint... 
app.get("/api", function(req, res) {
  let uni = new Date().valueOf();
  let date = new Date();
  // console.log(date.g)
  console.log(uni);
  const dat = new Date();
  let msg;
  msg = days[dat.getDay()] + ", " + dat.getDate() + " " + month[dat.getMonth()] + " " + dat.getFullYear() + " " + dat.getHours() + ":" + dat.getMinutes() + ":" + dat.getSeconds() + " GMT"
  console.log(msg);
  res.status(200).json({ "unix": uni, "utc": msg })

});



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
