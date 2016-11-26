// Require npm packages
var express = require('express');
var gm = require('gm').subClass({imageMagick: true});
var fs = require('fs');

// Set up express app
var app = express();

var createText = function(topText, bottomText) {
  return gm()
    .background('transparent') //should be in docs
    .rawSize(500*0.9, 375*0.9) 
    .font("Impact.ttf")
    .fill("#FFF")
    .stroke("#000", 2)
    .gravity("Center")
    .out("caption:" + topText + "\n\n\n\n\n\n" + bottomText)
    .setFormat('png');
}

// Set up a route to /api
app.get('/api', function(req, res) {
  res.type('jpeg');

  var topText = req.query.top.toUpperCase();
  var bottomText = req.query.bottom.toUpperCase();

  //createText(topText, bottomText).pipe(res);
  
  createText(topText, bottomText).write(__dirname + "/tmp/memeText.png", function(err) {
    if (err) console.log(err);
    console.log('hi');

    gm(__dirname + '/images/fry.jpg')
      .gravity("Center")
      .composite(__dirname + '/tmp/memeText.png')
      .stream()
      .pipe(res);
  });

   // gm(__dirname + '/images/fry.jpg')
   //    .gravity("Center")
   //    .composite(__dirname + '/tmp/memeText.png')
   //    .stream()
   //    .pipe(res);
 
});

// Start the server
var server = app.listen(3000, function () {
  console.log('Server listening on port 3000');
});
