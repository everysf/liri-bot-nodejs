var request = require("request")
var moment = require("moment")
var Spotify = require("node-spotify-api")
var inquirer = require("inquirer")

var spotify = new Spotify({
    id: "29b9dac9e2e5449e8bfdcc955ff927f6",
    secret: "7878962a44654563a718bdc3dea1cc22"
});

var bandsintown = require('bandsintown')("6582c1bec9a2df17f81e470cdd3e558a");

function search(){
    inquirer
        .prompt([
            {
                message: "Hello Kevin. Liri is here. What would you like to search for?",
                name: "media",
                type: "list",
                choices: ["Song", "Concert"]
            }
        ]).then(function(response){
            console.log(response.media)
            switch(response.media) {
                case "Song": getSong();
                    break;
                case "Concert": getConcert();
                    break;
            }
        })
}

function animation() {
    setTimeout(function(){
        console.log("----|----------------------------------\n")}, 1000)
    setTimeout(function(){
        console.log("---------|------------------------------\n")}, 1500)
    setTimeout(function(){
        console.log("---------S----|-------------------------\n")}, 2000)
    setTimeout(function(){
        console.log("---------S----E----|--------------------\n")}, 2500)
    setTimeout(function(){
        console.log("---------S----E----A----|---------------\n")}, 3000)
    setTimeout(function(){
        console.log("---------S----E----A----R----|----------\n")}, 3500)
    setTimeout(function(){
        console.log("---------S----E----A----R----C----|-----\n")}, 4000)
    setTimeout(function(){
        console.log("---------S----E----A----R----C----H---|-\n")}, 4500)
    setTimeout(function(){
        console.log("---------=----=----=----=----=----=-----\n")}, 5000)
}

function searchSong(songName) {
    console.log("Ok, searching Spotify for " + songName)

    animation()

    setTimeout(function(){

        console.log("\nHere's what I found:")
        spotify.search({ type: 'track', query: songName }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            for (var i = 0; i < 5; i++) {
                console.log("\n" + songName + " by " + data.tracks.items[i].artists[0].name + " from the album " + data.tracks.items[i].album.name)
                console.log(data.tracks.items[i].artists[0].external_urls.spotify + "\n"); 
            }
        })}, 5010)

    setTimeout(function(){
        search()
    }, 6000)

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

function searchConcert(bandName) {
    console.log("Ok, searching Bandsintown for " + bandName)
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
        bandsintown
            .getArtist(bandName)
            .then(function(events) {
                console.log(events)
                if (events.upcoming_event_count === 0) {
                    console.log(bandName + " is currently off-tour.")
                } else {
                    console.log(bandName + "is on tour! \n" + bandName + " has " + events.upcoming_event_count + " shows coming up.")
                }
            });
        }, 4000
    )

    setTimeout(function(){
        search()
    }, 7000)

}

function getConcert(bandName) {
    var bandName = "";
    inquirer
    .prompt([
        {
            message: "Type any touring band.",
            name: "bandName"
        }
    ]).then(function(response){
        bandName = response.bandName;
        searchConcert(bandName)
    })
}

search()