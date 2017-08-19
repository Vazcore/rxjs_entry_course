var express = require('express');
var path = require('path');
var app = express();

app.get('/speed', function (req, res) {
  var avg = req.query.avg;
  res.json({
    avg: avg,
    msg: avg > 50 ? 'This is a high speed' : 'This is normal speed'
  });
});

app.use('/', express.static(__dirname + '/public'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
