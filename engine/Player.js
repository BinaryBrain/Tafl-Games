function Player(id, name) {
	this.id = id
	this.name = name
}

Player.prototype.play = function (cb) {
	console.log("Player "+this.id+" have to play.")
	var moved = false
	while(!moved) {
		this.waitForChoice(function(pawn, dest) {
			if(pawn.isAlive && pawn.move(dest))
				moved = true
		})
	}
	
	cb()
}

Player.prototype.waitForChoice = function (cb) {
	console.log("Waiting for the choice of player "+this.id+"...")
	// Player choose a pawn
	// Player move it to a dest
	// Network.blah
	cb(pawn, dest)
}
