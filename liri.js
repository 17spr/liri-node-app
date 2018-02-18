require("dotenv").config();

var myKeys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var nodeCommand = process.argv[3];

if (nodeCommand === 'my-tweets') {
    console.log()
}