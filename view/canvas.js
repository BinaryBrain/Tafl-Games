var ctx;
var nRow = 11, nCol = 11;
var canWidth, canHeight;

var board;
var bPawn, wPawn, kPawn;
		
// load the images and set the basic variables
function init(){
	ctx = document.getElementById('canvas').getContext('2d');
	canWidth = document.getElementById('canvas').width,
	canHeight = document.getElementById('canvas').height;
	
	board = new Image();
	board.src = '../resources/board.png';
	bPawn = new Image();
	bPawn.src = '../resources/bPawn.png';
	wPawn = new Image();
	wPawn.src = '../resources/wPawn.png';
	kPawn = new Image();
	kPawn.src = '../resources/kPawn.png';
	
	
	draw();
	
}

// function used to draw the game
function draw() {
	drawBackground();
	drawPawns();
}

// draw the board
function drawBackground(){

	var iWidth = board.width,
		iHeight = board.heigth;
	
	
		ctx.drawImage(board, 0, 0, canWidth, canHeight);
	  
		for(i = 0; i<nCol; i++){
			
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

// draw the pawns
function drawPawns(){
	
	/*In test.
	TODO : load correctly a map at the beginning, fill the tab with the positions on the map. Then when 
	differents events append, fill the tab with te actual position of the pawns and then redraw.*/ 
	
	var map = new Array();
	for(var i =0; i< nCol; i++){
		map[i] = new Array();
	}
	
	
	for(i = 0; i< nRow; i++){
		for(j = 0; j<nCol; j++){
			drawPawnsType(i,j,'B');
		}
	}
}

// draw the pawns with 
function drawPawnsType(i,j,s){
	switch(s){
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