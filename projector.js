// Work in progress, starting to mess around with SoundCloud API
// on server using js

var http = require('http');
var fs = require('fs');

// Read JSON config file from disk
// for now this is just: sample client_id and target soundcloud artist
var inputs = JSON.parse(fs.readFileSync('config.json', 'utf8'))
console.log(inputs);

// SoundCloud API requests: tracks, followings for an artist
var api_endpoint = 'http://api.soundcloud.com/users/' + inputs.artistId;
var tracks_url = api_endpoint + '/tracks.json?client_id=' + inputs.sampleClientId;
var followings_url = api_endpoint + '/followings.json?client_id=' + inputs.sampleClientId;

// Get JSON from the api
http.get(followings_url, function(res) {
  console.log("Got response: " + res.statusCode);
  console.log("Got headers: " + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  // Get all teh datas, then concat & parse
  var bodyData = '';
  res.on('data', function (chunk) {
    bodyData += chunk;
  });
  res.on('end', function() {
    var bodyObject = JSON.parse(bodyData);
    console.log(bodyObject);
  });
}).on('error', function(e) {
  console.log("Error: " + e.message);
});
