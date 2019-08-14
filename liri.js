require("dotenv").config();
//fs is a core node package used for reading and writing files
var fs = require ("fs");
// code required to import from keys.js
var keys = require("./keys.js");

const Spotify = require('node-spotify-api');
var request = require('request');
//should be able to access  keys information
var spotify = new Spotify(keys.spotify);


var instructions = process.argv[2];
var parameter = process.argv[3];


//Switch Statments
function switchCase(){
switch (instructions) {
  case "concert-this":
      bandsInTown(parameter);

      break;
  case "spotify-this-song":
      spotSong(parameter);
      break;

  case "movie-this":
      movieInfo(parameter);
      break;

  case "do-what-it-says":
      getRandom(parameter);
      break;
  default:
      break;
}
};









spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});

// console.log(spotify);
// function concertThis (bandQuery){
//   var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
//   console.log(queryURL);
// }