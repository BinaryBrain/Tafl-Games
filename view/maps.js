
function Maps(name, nRow, nCol){
	var bigger;
	if(nCol > nRow) bigger = nCol;
	else bigger = nRow;
		
	this.map = createArray(bigger);
	this.midLineHor = (nRow - 1)/2; 
	this.midLineVer = (nCol - 1)/2;

	this.map[this.midLineVer][this.midLineHor] = 'k';
	
	if(name == "hnefatafl"){
		
		this.setExtBlack(5);
		// the remaining black one with them
		this.map[this.midLineVer][1] = 'B';
		this.map[this.midLineVer][nRow-2] = 'B';
		this.map[1][this.midLineHor] = 'B';
		this.map[nCol-2][this.midLineHor] = 'B';
		
		
		// the white pawns in 2 lines wich intersect at the king
		for(var i =-2; i < 3; i++){
			if(i != 0){
				this.map[this.midLineVer][this.midLineHor + i] = 'W';
				this.map[this.midLineVer +i][this.midLineHor] = 'W';
			}
		}
		// the remaining white ones next to them.
		for(var i = -1; i < 2; i++){
			if(i != 0){
				this.map[this.midLineVer + i][this.midLineHor -1] = 'W';
				this.map[this.midLineVer + i][this.midLineHor +1] = 'W';
			}
		}
		
	}
	
	else if(name == "tablut"){
		this.setExtBlack(3);
		// the remaining black one with them
		this.map[this.midLineVer][1] = 'B';
		this.map[this.midLineVer][nRow-2] = 'B';
		this.map[1][this.midLineHor] = 'B';
		this.map[nCol-2][this.midLineHor] = 'B';
		
		// the white pawns in 2 lines wich intersect at the king
		for(var i =-2; i < 3; i++){
			if(i != 0){
				this.map[this.midLineVer][this.midLineHor + i] = 'W';
				this.map[this.midLineVer +i][this.midLineHor] = 'W';
			}
		}
		
	}
	
	else if(name == "ard-ri"){
		
		this.setExtBlack(3);
		// the remaining black one with them
		this.map[this.midLineVer][1] = 'B';
		this.map[this.midLineVer][nRow-2] = 'B';
		this.map[1][this.midLineHor] = 'B';
		this.map[nCol-2][this.midLineHor] = 'B';
		
		for(var i =-1; i < 2; i++){
			for(var j = -1; j<2; j++){
				if((i != 0) || (j != 0)){
					this.map[this.midLineVer + i][this.midLineHor + j] = 'W';
				}
			}
		}
	}
	
	else if(name == "brandubh"){
		this.setExtBlack(1);
		// the remaining black one with them
		this.map[this.midLineVer][1] = 'B';
		this.map[this.midLineVer][nRow-2] = 'B';
		this.map[1][this.midLineHor] = 'B';
		this.map[nCol-2][this.midLineHor] = 'B';
		
		// the white pawns in 2 lines wich intersect at the king
		for(var i =-1; i < 2; i++){
			if(i != 0){
				this.map[this.midLineVer][this.midLineHor + i] = 'W';
				this.map[this.midLineVer +i][this.midLineHor] = 'W';
			}
		}
	}	
	
	else if(name == "tawlbwrdd"){
		this.setExtBlack(3);
		//the two black pawns next to the 3
		for(var i = -1; i < 2; i++){
			if(i != 0){
				this.map[this.midLineVer - + i][1] = 'B'; //top
				this.map[this.midLineVer -  + i][nRow-2] = 'B'; //bot
				this.map[1][this.midLineHor - + i] = 'B'; //left
				this.map[nCol-2][this.midLineHor - + i] = 'B'; //right
			}
		}
		// the remaining black one with them
		this.map[this.midLineVer][2] = 'B';
		this.map[this.midLineVer][nRow-3] = 'B';
		this.map[2][this.midLineHor] = 'B';
		this.map[nCol-3][this.midLineHor] = 'B';
		
		// the white pawns in 2 lines wich intersect at the king
		for(var i =-2; i < 3; i++){
			if(i != 0){
				this.map[this.midLineVer][this.midLineHor + i] = 'W';
				this.map[this.midLineVer +i][this.midLineHor] = 'W';
			}
		}
		// the remaining white ones next to them.
		for(var i = -1; i < 2; i++){
			if(i != 0){
				this.map[this.midLineVer + i][this.midLineHor -1] = 'W';
				this.map[this.midLineVer + i][this.midLineHor +1] = 'W';
			}
		}
	}

}

Maps.prototype.getMap = function(){
	return this.map;
}

// sets the black pawns on each side of the board
Maps.prototype.setExtBlack = function(n){
	for(var i = 0; i < n; i++){
		this.map[this.midLineVer - ((n-1)/2) + i][0] = 'B'; //top
		this.map[this.midLineVer - ((n-1)/2) + i][nRow-1] = 'B'; //bot
		this.map[0][this.midLineHor -((n-1)/2) + i] = 'B'; //left
		this.map[nCol-1][this.midLineHor -((n-1)/2) + i] = 'B'; //right
	}
}

// create an array with n arrays
function createArray(n){
	var array = new Array();
	for(var i = 0; i < n; i++){
		array[i] = new Array();
	}
	
	return array;
}