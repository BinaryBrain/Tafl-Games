var ctx;
var canWidth, canHeight;

var board;
var bPawn, wPawn, kPawn;

var map;
var nRow = 19, nCol = 19;
var mapName = "alea-evangeli";

		
// load the images and set the basic variables
function init(){
	ctx = document.getElementById('canvas').getContext('2d');
	canWidth = document.getElementById('canvas').width,
	canHeight = document.getElementById('canvas').height;
	
	board = new Image();
	board.onload = function(){

		bPawn = new Image();
		bPawn.onload = function() {
	
			wPawn = new Image();
			wPawn.onload = function() {
			
				kPawn = new Image();
				kPawn.onload = function() {
					map = new Maps(mapName,nRow,nCol).getMap();
					draw();
				}
				kPawn.src = '../resources/kPawn.png';

			}
			wPawn.src = '../resources/wPawn.png';
		
		}
		bPawn.src = '../resources/bPawn.png';
	};
	
	board.src = '../resources/board.png';
}

// function used to draw the game
function draw() {
	drawBackground();
	drawPawns();
}

// draw the board
function drawBackground(){
	
	ctx.drawImage(board, 0, 0, canWidth, canHeight);

	var bigger;
	if(nCol > nRow) bigger = nCol;
	else bigger = nRow;
	
	for(i = 0; i<bigger; i++){
		
		// draw the vertical lines
		ctx.beginPath();
		ctx.moveTo(i*(canWidth/nCol), 0);
		ctx.lineTo(i*(canWidth/nCol), canHeight);
		ctx.stroke();
		
		// draw the horizontal lines
		ctx.beginPath();
		ctx.moveTo(0, i*(canHeight/nRow));
		ctx.lineTo(canWidth, i*(canHeight/nRow));
		ctx.stroke();
	}
}

// draw the pawns by type
function drawPawns(){
	for(var i = 0; i< nCol; i++){
		for(var j = 0; j<nRow; j++){
			switch(map[i][j]){
				case 'B':
					ctx.drawImage(bPawn, i*(canWidth/nCol), j*(canHeight/nRow), (canWidth/nCol), (canHeight/nRow));
					break;
				case 'W':
					ctx.drawImage(wPawn, i*(canWidth/nCol), j*(canHeight/nRow), (canWidth/nCol), (canHeight/nRow));
					break;
				case 'k':
					ctx.drawImage(kPawn, i*(canWidth/nCol), j*(canHeight/nRow), (canWidth/nCol), (canHeight/nRow));
					break;
				case '.':
					break;
				default:
					break;
			}
		}
	}
}
