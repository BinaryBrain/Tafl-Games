function Pawn(color, position, playerID) {
	this.color = color
	this.position = position
	this.isAlive = true
	this.playerID = playerID
}

Pawn.prototype.move = function(dest) {
	console.log("Moving "+this.color+" pawn from "+this.position+" to "+dest+"...")
	if(dest.isValid)
		this.position = dest
		return true
	else
		return false
}
