var Logic = require("./Logic");
var Pawn = require("./Pawn");
var Player = require("./Player");
var Presets = require("./Presets");
var Coords = require("./Utils/Coords");

function Game(players) {
	this.board = []
	this.players = players
	this.pawns = []
	this.turn = 0
}

Game.prototype.init = function () {
	console.log("Initializing the game...")
}

Game.prototype.load = function (presetID) {
	console.log("Loading preset n° "+presetID+"...")
	
	var preset = Presets.load(presetID)
	// Transform the .map to a [][]
}

Game.prototype.launch = function () {
	console.log("Launching the game...")
	this.nextTurn()
}

Game.prototype.nextTurn = function () {
	console.log("Next turn.")
	if(Logic.checkEnd()) {
		this.end()
	}
	else {
		if(this.turn++ >= this.players.length)
			this.turn = 0
		this.player[this.turn].play(this.nextTurn)
	}
}

Game.prototype.end = function () {
	console.log("End of the game.")
}
