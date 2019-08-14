require("dotenv").config();

// code required to import from keys.js
var keys = require("./keys.js");

//should be able to access  keys information
var spotify = new Spotify(keys.spotify);