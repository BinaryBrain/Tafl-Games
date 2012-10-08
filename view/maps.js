var map;

function Maps(name, nRow, nCol){
	var bigger;
	if(nCol > nRow) bigger = nCol;
	else bigger = nRow;
		
	map = createArray(bigger);
	var midLineHor = (nRow - 1)/2; 
	var midLineVer = (nCol - 1)/2;

	map[midLineVer][midLineHor] = 'k';
	
	if(name == "hnefatafl"){
		//the 5 white pawns on each side
		for(i = 0; i < 5; i++){
			map[midLineVer - 2 + i][0] = 'W'; //top
			map[midLineVer - 2 + i][nRow-1] = 'W'; //bot
			map[0][midLineHor -2 + i] = 'W'; //left
			map[nCol-1][midLineHor -2 + i] = 'W'; //right
		}
		// the remaining white one with them
		map[midLineVer][1] = 'W';
		map[midLineVer][nRow-2] = 'W';
		map[1][midLineHor] = 'W';
		map[nCol-2][midLineHor] = 'W';
		
		
		// the black pawns in 2 lines wich intersect at the king
		for(i =-2; i < 3; i++){
			if(i != 0){
				map[midLineVer][midLineHor + i] = 'B';
				map[midLineVer +i][midLineHor] = 'B';
			}
		}
		// the remaining black ones next to them.
		for(i = -1; i < 2; i++){
			if(i != 0){
				map[midLineVer + i][midLineHor -1] = 'B';
				map[midLineVer + i][midLineHor +1] = 'B';
			}
		}
		
	}
	
	else if(name == "tablut"){
		//the 3 white pawns on each side
		for(i = 0; i < 3; i++){
			map[midLineVer - 1 + i][0] = 'W'; //top
			map[midLineVer - 1 + i][nRow-1] = 'W'; //bot
			map[0][midLineHor -1 + i] = 'W'; //left
			map[nCol-1][midLineHor -1 + i] = 'W'; //right
		}
		// the remaining white one with them
		map[midLineVer][1] = 'W';
		map[midLineVer][nRow-2] = 'W';
		map[1][midLineHor] = 'W';
		map[nCol-2][midLineHor] = 'W';
		
		// the black pawns in 2 lines wich intersect at the king
		for(i =-2; i < 3; i++){
			if(i != 0){
				map[midLineVer][midLineHor + i] = 'B';
				map[midLineVer +i][midLineHor] = 'B';
			}
		}
		
	}

}

Maps.prototype.getMap = function(){
	return map;
}

function createArray(n){
	var array = new Array();
	for(i = 0; i < n; i++){
		array[i] = new Array();
	}
	
	return array;
}