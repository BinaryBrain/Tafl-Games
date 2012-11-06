Game = {
	board: [][],
	players: [],
	pawns: [],
	turn: 0,
	
	init: function() {
		console.log("Initializing the game...")
		
		players.push(new Player(1,	"Player 1"))
		players.push(new Player(2,	"Player 2"))
	},
	
	load: function(presetID) {
		console.log("Loading game n° "+presetID+"...")
		
		var preset = Presets.load(presetID)
		// Transform the .map to a [][]
	},
	
	launch: function() {
		console.log("Launching the game...")
		nextTurn()
	},

	nextTurn: function() {
		console.log("Next turn.")
		if(Logic.checkEnd()) {
			this.end()
		}
		else {
			if(turn++ >= players.length)
				turn = 0
			player[turn].play(this.nextTurn)
		}
	},

	end: function() {
		console.log("End of the game.")
		
	},
};
