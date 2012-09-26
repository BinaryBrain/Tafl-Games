function Pawn(color, position, playerID) {
	this.color = color
	this.position = position
	this.isAlive = true
	this.playerID = playerID
}

Pawn.prototype.move = function(dest) {
	if(dest.isValid)
		this.position = dest
		return true
	else
		return false
}
