function Player(id, name) {
	this.id = id
	this.name = name
}

Player.prototype.play(cb) {
	var moved = false
	while(!moved) {
		// Player choose a pawn
		// Player move it to a dest
		if(pawn.isAlive && pawn.move(dest))
			moved = true
	}

	// callback
	cb()
}
