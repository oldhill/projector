// Work in progress, starting to mess around with SoundCloud API
// on server using js

var http = require('http');
var fs = require('fs');

// Read JSON config file from disk
// for now this is just: sample client_id and target soundcloud artist
var inputs = JSON.parse(fs.readFileSync('config.json', 'utf8'))
console.log(inputs);

// Sample SoundCloud API request: tracks object for an artist
var api_endpoint = 'http://api.soundcloud.com/users/' + inputs.artistId;
var tracks_url = api_endpoint + '/tracks.json?client_id=' + inputs.sampleClientId;

http.get(tracks_url, function(res) {
  console.log("Got response: " + res.statusCode);
  console.log("Got headers: " + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('Got body: ' + chunk);
  });
}).on('error', function(e) {
  console.log("Error: " + e.message);
});
