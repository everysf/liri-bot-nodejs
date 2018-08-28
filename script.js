var request = require("request")
var moment = require("moment")
var Spotify = require("node-spotify-api")
var inquirer = require("inquirer")

var spotify = new Spotify({
    id: "29b9dac9e2e5449e8bfdcc955ff927f6",
    secret: "7878962a44654563a718bdc3dea1cc22"
});

function search(){
    inquirer
        .prompt([
            {
                message: "Hello Kevin. Liri is here. What would you like to search for?",
                name: "media",
                type: "list",
                choices: ["Song", "Movie"]
            }
        ]).then(function(response){
            console.log(response.media)
            switch(response.media) {
                case "Song": getSong()
            }
        })
}

function searchSong(songName) {
    console.log("Ok, searching Spotify for " + songName)
    setTimeout(function(){
        console.log("\nThinking...")}, 1000)
    setTimeout(function(){
        console.log("\nThinking....")}, 2000)
    setTimeout(function(){
        console.log("\nThinking......")}, 3000)
    setTimeout(function(){
        console.log("\n" + "\n---------------------------" + "\n")}, 4000)

    setTimeout(function(){
        console.log("\nHere's what I found:")
        spotify.search({ type: 'track', query: songName }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            for (var i = 0; i < data.tracks.items.length; i++) {
                console.log(songName + " by " + data.tracks.items[i].artists[0].name); 
            }
        })}, 4000    )

    setTimeout(function(){
        search()
    }, 7000)

}

function getSong(songName) {

    var songName = "";

    inquirer
    .prompt([
        {
            message: "Type any song name",
            name: "songName"
        }
    ]).then(function(response){
        songName = response.songName;
        searchSong(songName)
    })

}

search()
// getSong(process.argv.slice(2).join(" "))