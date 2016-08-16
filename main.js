var SIZE = 3; //The size of the array of boxes
var JUMP_HEIGHT = 2; //The height that the player can jump.


var x = 0; //The x position
var y = 0; //The y position

var direction=0; //1 is up, 0 is no vertical movement, -1 is downards vertical
var increments=0; //The number of movements to go till it stop

function NOTHING_TEXT(x,y){return "<div class='nothing' id='p"+x+"_"+y+"'></div>"; } //The div with nothing in it
function PLAYER_TEXT(x,y){return "<div class='player' id='p"+x+"_"+y+"'></div>"; } //The divs with the player in it
function OBSTACLE_TEXT(x,y){return "<div class='obstacle' id='p"+x+"_"+y+"'></div>"; } //The divs with the platforms
function init_display() //returns the initial text
{
	var i = SIZE-1; //This is modified old code, don't want to comment it all out
	var j = 0;
	var res = "";
	while(i!=-1)
	{
		j = 0;
		while(j!=SIZE)
		{
			res += (i == y && j == x) ? PLAYER_TEXT(j,i) : NOTHING_TEXT(j,i);
			j++;
		}
		res += "<br>";
		i--;
	}
	return res;
}
function display() //Displays the 
{
	document.getElementsByClassName("player")[0].className="nothing";
	document.getElementById("p"+x+"_"+y).className="player";
}
function makeOnMap() //Makes the position ON the map
{
	if(x == -1) x++;
	if(x == SIZE) x--;
	if(y == -1) y++;
	if(y == SIZE) y--;
}
function leftArrow()
{
	x--;
	makeOnMap();
	display();
}
function rightArrow()
{
	x++;
	makeOnMap();
	display();
}
function upArrow()
{
}
function otherKey()
{
}
function keydown(event)
{
	var key = event.key.toLowerCase();
	if(key=="arrowup"||key=="w") {
		upArrow();
	} else if(key=="arrowleft"||key=="a") {
		leftArrow();
	} else if(key=="arrowright"||key=="d") {
		rightArrow();
	} else {
		upArrow();
	}
	//Remeber the property used for the key pressed. And the arrow keys
	//ARROW KEY LEFT OR A- Moves the player left, and then falls or jumps
	//ARROW KEY RIGHT OR D- Moves the player right, and then falls or jumps
	//ARROW KEY UP OR W- Jumps or does nothing
}
