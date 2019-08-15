require("dotenv").config();
var request = require('request');
var fs = require('fs');
var moment = require('moment');
// code required to import from keys.js
var keys = require("./keys.js");
// var axios= require("axios");

const Spotify = require('node-spotify-api');

//should be able to access  keys information
var spotify = new Spotify(keys.spotify);

//Variable assignedd to arguments
var instructions = process.argv[2];
var parameter = process.argv[3];

//Execute function
inputs(instructions, parameter);

//Switch Statments

function inputs(instructions, parameter){
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
      console.log("Please the following options: \nconcert-this \nspotify-this-song \nmovie-this");
}
}

//Function for Bands in town
//concert-this
function bandsInTown (bands){
  var queryURL = "https://rest.bandsintown.com/artists/" + bands + "/events?app_id=4b9cf2955b460f24db1c3e790af65e49";

  request(queryURL, function (error, response, body){
    if(!error && response.statusCode === 200){
      var concerts = JSON.parse(body);

      
      for(var i = 0; i < concerts.length; i++){
        var dateOfEvent = moment(concerts[i].datetime).format("MM/DD/YYYY");
        
        console.log("Event # " + i);
        console.log("Name of Venue: " + concerts[i].venue.name);
        console.log("Venue Location: " + concerts[i].venue.city + ", " + concerts[i].venue.region + "\nCountry: " + concerts[i].venue.country);
        console.log("Date of Event: " + dateOfEvent);
        console.log("==========================================================");
        
      // var randomDate = "02/23/1999";
      // var randomFormat = "MM/DD/YYYY";
      // var convertedDate = moment(randomDate, randomFormat);
      // console.log(convertedDate.format("MM/DD/YYYY"));
    }
    } else{
      console.log('Error has occurred.');
    }
  });
}

//Function for Spotify
// spotify-this-song
function spotSong(findSong){
  
  if(findSong === undefined || null){
    findSong = "The Sign Ace of Base";
    // console.log(spotSong);
  }

  spotify.search({ type: 'track', query: findSong, limit:7}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    else { 

      for (var index in data.tracks.items){
        var musicQuery = data.tracks.items[index];
        var artist = musicQuery.artists[0].name;
        var nameOfSong = musicQuery.name;
        var preview = musicQuery.preview_url;
        var albumTitle = musicQuery.album.name;

        console.log("Artist: " + artist +
        "\nSong Name: " + nameOfSong +
        "\nLink to song: " + preview +
        "\nAlbum Title: " + albumTitle +
        "\n==============================================");
      }
    }
  // console.log(data); 
  });
}


//Fuction to request movie information
//movie-this
function movieInfo (movieQuery) {
  if (movieQuery ===undefined || null){
    movieQuery = "Mr. Nobody"
    console.log(movieQuery);
    console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
    console.log("It's on Netflix!");
  }
  var queryURL = "http://www.omdbapi.com/?t=" + movieQuery + "&y=&plot=short&apikey=c77f65c7";
  // // var queryURL = "http://www.omdbapi.com/?i=tt3896198&apikey=c77f65c7";
  console.log(queryURL);

  request(queryURL, function (error, response, body){
    //if no error and response statuscode is ok
    if(!error && response.statusCode ===200){
      var movie = JSON.parse(body);
      console.log("Movie Title: " + movie.Title);
      console.log("Released: " + movie.Year);
      console.log("IMDB Rating: " + movie.imdbRating);
      console.log("Rotten Tomatoes Rating: " + rottenTomatoesValue(movie));
      console.log("Country of Production: " + movie.Country);
      console.log("Language: " + movie.Language);
      console.log("Plot: " + movie.Plot);
      console.log("Actors: " + movie.Actors);
      console.log("===========================================================");
    } else {
      console.log('Error has occured'); // Print the error if one occurred
      
    }
    
  });

//function to get rotten tomatoes rating
function rottenTomatoesObject(data){
  return data.Ratings.find(function (item){
    return item.Source === "Rotten Tomatoes";
  });
}

function rottenTomatoesValue (data){
  return rottenTomatoesObject(data).Value;
}


}

//Reading random text
function getRandom(){
  fs.readFile('random.txt', 'utf8', function(err, data){
    if(err){
      return console.log(err);
    }
    var dataArray = data.split(',');
    inputs(dataArray[0], dataArray[1]);
  });
}

