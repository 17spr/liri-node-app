require("dotenv").config();

// importing API keys from key.js file
var keys = require("./keys.js")

// Spotify API ======================================
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});
var spotifyThisSong = process.argv[2];
var mySong = process.argv[3];

if (spotifyThisSong === 'spotify-this-song' && mySong) {
  console.log("Getting song...")
  getSong();
} else if (spotifyThisSong === 'spotify-this-song' && mySong != true) {
  theSign();
}

function getSong() {
  spotify.search({ type: 'track', query: mySong}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(JSON.stringify(data, null, 2)); 
  });
}

// function that defaults to 'The Sign' by Ace of Base if no other song is entered
function theSign() {
  spotify.search({ type: 'track', query: 'The Sign'}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(JSON.stringify(data, null, 2)); 
  });
}



// Twitter API =======================================

// creating a variable to capture and store the `my-tweets` argument
var myTweets = process.argv[2];

// if-then logic for making the Twitter API call
if (myTweets === 'my-tweets') {
  console.log("Fetching tweets...")
  // calling the function that retrieves my tweets
  getTweets();
}
// creating a function that performs all of the code for getting my tweets using the Twitter API
function getTweets() {
  var Twitter = require('twitter');
 
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });
  
  var params = {screen_name: 'Alias_Jesse'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      // looping through response array that contains each tweet to access the text and the creation date
      for (i = 0; i < tweets.length; i++) {
        // displaying the results in the console 
        console.log(tweets[i].text);
        console.log(tweets[i].created_at);
      }
    }
  });
  
}
// OMDB API ==========================================

// ***If the movie name has multiple words (for example: How the Grinch Stole Christmas), write the name in quotes. Otherwise it won't work.****
// working example of using a multi-word movie name:
         // node .\liri.js movie-this "how the grinch stole christmas"
// single-word movie name example: 
         // node .\liri.js movie-this cinderella
// ...................................................

// variable to store `movie-this` argument 
var movieThis = process.argv[2];
// variable to store the movie name argument
var movieName = process.argv[3];

// if-then logic for performing the API request for OMDB movie data...
if (movieThis === 'movie-this' && movieName) {
  console.log("It's working!")
  // executing the function to get movie data
  getMovie();

} else if (movieThis === 'movie-this' && movieName != true) {
  // defaulting to 'Mr. Nobody' movie data if no movie name is provided
  console.log("Fine then, let's learn about Mr. Nobody.")
  mrNobody();

} 
// creating the function that performs the OMDB API request
function getMovie() {
  var request = require("request");
  // concatenating the url parameters
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  console.log("URL: " + queryUrl);
  // making the API request...
  request(queryUrl, function(error, response, body) {
  
  if (!error && response.statusCode === 200) {
    // logging the data required in the homework description (title, release year, etc.)
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);

  }
});
  
}
// function to retrieve data for 'Mr. Nobody' in case no movie name is specified
function mrNobody() {
  var mrNobodyMovie = "mr nobody";
  var request = require("request");
  var queryUrl = "http://www.omdbapi.com/?t=" + mrNobodyMovie + "&y=&plot=short&apikey=trilogy";

  console.log("URL: " + queryUrl);

  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // logging the JSON response for the data required in the homework description (title, release year, etc.)
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
    }
  });
  
};

// Do-what-it-says ==============================
var fs = require('fs');

var doWhatItSays = process.argv[2];

// logic for performing the function to run the `do-what-it-says` command

if (doWhatItSays === 'do-what-it-says') {
  myFunction();
}

function myFunction() {

  fs.readFile("random.txt", "utf8", function(error, data) {
    // logging any errors to the console
    if (error) {
      return console.log(error);
    }
    // then logging the contents of the random.txt file to the console
    console.log("node liri.js " + data);
    
  
  });
}


