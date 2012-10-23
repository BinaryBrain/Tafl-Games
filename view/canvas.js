var ctx;
var canWidth, canHeight;

var board;
var bPawn, wPawn, kPawn;

var map;
var nRow = 11, nCol = 11;
var mapName = "hnefatafl";

		
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
	
	board.src	= '../resources/board.png';
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

function getCoords(event){
	draw();
	
	pos_x = event.offsetX?(event.offsetX):event.pageX-document.getElementById("canvas").offsetLeft;
	pos_y = event.offsetY?(event.offsetY):event.pageY-document.getElementById("canvas").offsetTop;
	
	ctx.lineWidth = 3;
	ctx.strokeRect(getBorder(pos_x,canWidth,nCol),getBorder(pos_y,canHeight,nRow),canWidth/nCol,canHeight/nRow);
	ctx.lineWidth = 1;
}

function drawSelectSquare(event){
	draw();
	
	//get the coordinates of the clicked point
	var pos_x = event.offsetX?(event.offsetX):event.pageX-document.getElementById("canvas").offsetLeft;
	var pos_y = event.offsetY?(event.offsetY):event.pageY-document.getElementById("canvas").offsetTop;
	
	var borderX = getBorder(pos_x,canWidth,nCol);
	var borderY = getBorder(pos_y,canHeight,nRow);
	
	//draw the selection square
	ctx.lineWidth = 3;
	ctx.strokeStyle = '#1e90ff';
	ctx.strokeRect(borderX,borderY,canWidth/nCol,canHeight/nRow);
	
	// draw the disabled positions
	//todo transparence
	ctx.fillStyle = "rgba(0,0,0,0.5)";
	for(var i = 0; i< nCol;i++){
		for(var j = 0; j<nRow;j++){
			if(i*(canWidth/nCol) != borderX && j*(canHeight/nRow) != borderY){
				ctx.fillRect(i*(canWidth/nCol),j*(canHeight/nRow),canWidth/nCol,canHeight/nRow);
			}
		}
	}
	
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#000000';
}

// gets the border of the relative square
function getBorder(pos,dim,div){
	var result;
	for(var i = 0; i<div;i++){
		if(pos >= i*(dim/div) && pos < (i+1)*(dim/div)){
			result = i*(dim/div);
		}
	}
	return result;
}
