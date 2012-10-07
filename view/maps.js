var map;

function Maps(name, nRow, nCol){
	
	map = createArray(nRow);
	var midLineHor = (nRow - 1)/2;
	var midLineVer = (nCol - 1)/2;
	
	map[midLineHor][midLineVer] = 'k';
	
	if(name == "hnefatafl"){
		//sets the white pawns
		for(i = 0; i < 5; i++){
			map[0][midLineVer - 2 + i] = 'W';
			map[nRow-1][midLineVer - 2 + i] = 'W';
			map[midLineHor -2 + i][0] = 'W';
			map[midLineHor -2 + i][nCol-1] = 'W';
		}
		
		map[1][midLineVer] = 'W';
		map[nRow-2][midLineVer] = 'W';
		map[midLineHor][1] = 'W';
		map[midLineHor][nCol-2] = 'W';
		
		// sets the black pawns
		for(i =-2; i < 3; i++){
			if(i != 0){
				map[midLineHor + i][midLineVer] = 'B';
				map[midLineHor][midLineVer +i] = 'B';
			}
		}
		
		for(i = -1; i < 2; i++){
			if(i != 0){
				map[midLineHor - i][midLineHor -i] = 'B';
				map[midLineHor + i][midLineHor -i] = 'B';
			}
		}
		
	}
	
	else if(name == "tablut"){
		//sets the white pawns
		for(i = 0; i < 3; i++){
			map[0][midLineVer - 1 + i] = 'W';
			map[nRow-1][midLineVer - 1 + i] = 'W';
			map[midLineHor -1 + i][0] = 'W';
			map[midLineHor -1 + i][nCol-1] = 'W';
		}
		
		map[1][midLineVer] = 'W';
		map[nRow-2][midLineVer] = 'W';
		map[midLineHor][1] = 'W';
		map[midLineHor][nCol-2] = 'W';
		
		// sets the black pawns
		for(i =-2; i < 3; i++){
			if(i != 0){
				map[midLineHor + i][midLineVer] = 'B';
				map[midLineHor][midLineVer +i] = 'B';
			}
		}
		
	}

}

Maps.prototype.getMap = function(){
	return map;
}

function createArray(nRow){
	var array = new Array();
	for(i = 0; i < nRow; i++){
		array[i] = new Array();
	}
	
	return array;
}