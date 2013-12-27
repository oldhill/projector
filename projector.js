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

// Get data from API, parse and print
http.get(followingsUrl, function(res) {
  console.log("Got response: " + res.statusCode);
  console.log("Got headers: " + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  // Get all the data
  var bodyData = '';
  res.on('data', function (chunk) {
    bodyData += chunk;
  });
  // Parse and store once request is complete
  res.on('end', function() {
    var bodyObject = JSON.parse(bodyData);
    for (var i = 0; i < bodyObject.length; i++){
      var record = bodyObject[i];
      console.log(record['id'] + ' ' + record['username'] + ' ' + record['followers_count']);
      // Append to file -- creates file if !already exist
      fs.appendFile('test.json', JSON.stringify(bodyObject[i], null, 4), function (err) {
        if (err) { 
          throw err;
        } else {
          console.log('File successfully written.');
        }
      });
    }
  });
}).on('error', function(e) {
  console.log("Error: " + e.message);
});
