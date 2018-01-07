//CONSTANTS

var SIZE = 4;

//HELPER FUNCTIONS
function boardEquality(A,B) { // assumes the arrays are the same shape
	for(var i = 0; i < A.length; i++) {
		for(var j = 0; j < A[0].length; j++) {
			if(A[i][j] != B[i][j]) return false;
		}
	}
	return true;
}
function merge(list) {
	var temp = [];
	for(var i = 0;i < list.length;i++) //Remove all zeros
	{
		if(list[i] != 0)
			temp = temp.concat(list[i]);
	}
	while(temp.length != list.length) { //Pad with zeros
		temp = temp.concat(0);
	}
	for(var i = 1; i < list.length; i++) { //Merge
		if(temp[i-1] == temp[i]) {
			temp[i]=0;
			temp[i-1]*=2;
		}
	}
	var temp2 = []; //We need to create a new list to do the first two steps again
	for(var i = 0;i < list.length;i++) //Remove all zeros
	{
		if(temp[i] != 0)
			temp2 = temp2.concat(temp[i]);
	}
	while(temp2.length != list.length) { //Pad with zeros one last time
		temp2 = temp2.concat(0);
	}
	return temp2;
}

function mergeLeft(array) {
	return array.map(merge);
}

function mergeRight(array) {
	return array.map(function(x){
		x.reverse();
		var res = merge(x).reverse();
		x.reverse();
		return res;
	});
}

function transpose(array) {
	var res = Array(array[0].length).fill(0).map(function(i){return [];});
	for(var i = 0; i < array.length; i++) {
		for(var j = 0;j < array[0].length;j++) {
			res[j][i] = array[i][j];
		}
	}
	return res;
}

function mergeUp(array) {
	return transpose(mergeLeft(transpose(array)));
}

function mergeDown(array) {
	return transpose(mergeRight(transpose(array)));
}

function randomElement(list) {
	//this is a temporary fix.
	//console.log("LIST: "+list);
	//console.log("LENGTH: "+list.length);
	var index = list.length + 1;
	while(list[index] === undefined) {
		index = Math.floor(Math.random()*(list.length + 1));
		//console.log("INDEX: "+index);
	}
	return list[index];
}

function insertNumber(array) { //Modifies the array
	var zeros = [];
	for(var i = 0; i < array.length; i++) {
		for(var j = 0; j < array[0].length; j++) {
			if(array[i][j] == 0) {
				zeros = zeros.concat([[i,j]]);
			}
		}
	}
	var index = randomElement(zeros);
	var number = randomElement([2,2,2,2,2,2,2,2,2,4]);
	array[index[0]][index[1]] = number;
}

function gameOver(array) {
	return boardEquality(mergeLeft(array),array) && boardEquality(mergeUp(array),array) && boardEquality(mergeDown(array),array) && boardEquality(mergeRight(array),array);
}

function generateArray() {
	var arr = Array(SIZE).fill(0).map(function(n){return Array(SIZE).fill(0);});
	insertNumber(arr);
	insertNumber(arr);
	return arr;
}


// ------------- (TEMPORARY) UI STUFFS ---------------

/*
UI = 0: text based
UI = 1: current style of UI (text based with board in background)
*/
var UI = 1;

function drawBoard(board) { //Table based UI
	var res = "<table>";
	for(var i = 0; i < SIZE; i++) {
		res += "<tr>";
		for(var j = 0; j < SIZE; j++) {
			res += "<td>"+board[i][j]==0?'':board[i][j]+"</td>";
		}
		res += "</tr>";
	}
	res += "</table>";
	document.getElementById("draw").innerHTML = res;
}

			

function temporaryGame() { //Text based game
	var board = generateArray();
	while(!gameOver(board)) {
		if(UI == 1) drawBoard(board);
		var choice = prompt(board.map(function(n){return n.join('\t');}).join('\n')); //Tabs won't render in Chrome
		if((choice == 'a' || choice == 'A') && !boardEquality(mergeLeft(board),board)) board = mergeLeft(board);
		else if((choice == 'w' || choice == 'W') && !boardEquality(mergeUp(board),board)) board = mergeUp(board);
		else if((choice == 's' || choice == 'S') && !boardEquality(mergeDown(board),board)) board = mergeDown(board);
		else if((choice == 'd' || choice == 'd') && !boardEquality(mergeRight(board),board)) board = mergeRight(board);
		else if(choice == 'q' || choice == 'Q') break;
		else continue;
		insertNumber(board);
	}
}
