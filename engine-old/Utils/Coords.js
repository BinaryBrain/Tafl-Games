function Coords(x, y) {
	this.x = x
	this.y = y
}

Coords.prototype.isValid() {
	var board = Game.board
	return (x > 0 && y > 0 && x < board.length && y < board[x].length)
}
