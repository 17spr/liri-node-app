// Twitter API =======================================
require("dotenv").config();
var myKeys = require("./keys.js")





// OMDB API ==========================================

// Notes..............................................
// working example of using a multi-word movie name:
         // node .\liri.js movie-this "how the grinch stole christmas"
// single-word movie name: 
         // node .\liri.js movie-this cinderella
// IMPORTANT:
// ***If the movie name has multiple words (i.e. How the Grinch Stole Christmas), write the name in quotes. Otherwise it won't work.****
// .....................................................


// variable to store `movie-this` command 
var movieThis = process.argv[2];
// variable to store the name of the movie
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

} else if (movieThis != true) {
  console.log("You must type `movie-this` before typing the movie name. For example: node liri.js movie-this cinderella")
}
// creating the function that performs the OMDB API request
function getMovie() {
  var request = require("request");

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

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
  
}

// function to retrieve data for 'Mr. Nobody' in case no movie name is specified
function mrNobody() {

  var mrNobodyMovie = "mr nobody";

  var request = require("request");

  var queryUrl = "http://www.omdbapi.com/?t=" + mrNobodyMovie + "&y=&plot=short&apikey=trilogy";

  console.log("URL: " + queryUrl);

  request(queryUrl, function(error, response, body) {
    // handling errors
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






