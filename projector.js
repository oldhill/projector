// Work in progress, starting to mess around with SoundCloud API
// on server using js files run with node on command-line

var http = require('http');
var fs = require('fs');

// Read JSON config file from disk
// for now this is just: sample client_id and target soundcloud artist
var inputs = JSON.parse(fs.readFileSync('config.json', 'utf8'))
console.log(inputs);

// SoundCloud API requests: tracks, followings for an artist
var apiEndpoint = 'http://api.soundcloud.com/users/' + inputs.artistId;
var tracksUrl = apiEndpoint + '/tracks.json?client_id=' + inputs.sampleClientId;
var followingsUrl = apiEndpoint + '/followings.json?client_id=' + inputs.sampleClientId;
var loopField = 'username';

// Get data from API, parse and print
http.get(followingsUrl, function(res) {
  console.log("Got response: " + res.statusCode);
  console.log("Got headers: " + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  // Get all the data first...
  var bodyData = '';
  res.on('data', function (chunk) {
    bodyData += chunk;
  });
  // then do other stuff
  res.on('end', function() {
    var bodyArray = JSON.parse(bodyData);
    for (var i = 0; i < bodyArray.length; i++){
      console.log(bodyArray[i][loopField]);
    }
  });
}).on('error', function(e) {
  console.log("Error: " + e.message);
});
