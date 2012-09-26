Game = {
	board: [][],
	players: [],
	pawns: [],
	turn: 0,
	
	init: function() {
		players.push(new Player(1,	"Player 1"))
		players.push(new Player(2,	"Player 2"))
	},
	
	load: function(presetID) {
		var preset = Presets.load(presetID)
		// Transform the .map to a [][]
	},
	
	launch: function() {
		nextTurn()
	},

	nextTurn: function() {
		if(Logic.checkEnd()) {
			this.end();
			break;
		}
		
		if(turn++ >= players.length)
			turn = 0
		player[turn].play(this)
	},

	end: function() {

	},
};
