var SIZE = 5; //The size of the array of boxes
var JUMP_HEIGHT = 2; //The height that the player can jump.
var FALLNOBUTTON = false; //Whether or not to automaticaly vertically move. Defaults to false

var x = 0; //The x position
var y = 0; //The y position

var direction=0; //1 is up, 0 is no vertical movement or downwards.
var increments=0; //The number of movements to go till it stop

function NOTHING_TEXT(x,y){return "<div class='nothing' id='p"+x+"_"+y+"'></div>"; } //The div with nothing in it
function PLAYER_TEXT(x,y){return "<div class='player' id='p"+x+"_"+y+"'></div>"; } //The divs with the player in it
function OBSTACLE_TEXT(x,y){return "<div class='obstacle' id='p"+x+"_"+y+"'></div>"; } //The divs with the platforms
function init_display() //returns the initial text, just a 2D array of divs via <br>
{
	var i = SIZE-1; //This is modified old code, don't want to comment it all out.
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
function display() //Redisplays the screen, by turning the previous player position to the 'nothing' class, and the current player position to the 'player' class
{
	document.getElementsByClassName("player")[0].className="nothing"; //White square, no player
	document.getElementById("p"+x+"_"+y).className="player"; //Red square, the player
}
function set_obstacle(x,y)
{
	document.getElementById("p"+x+"_"+y).className = "obstacle"; //Black square, obstacle/platform
}
function makeOnMap() //Makes the position ON the map
{
	if(x == -1) x++; //Off the left side of the screen, move right one
	if(x == SIZE) x--; //Off the right side of the screen, move left one
	if(y == -1) y++; //Below the screen, shouldn't happen, but moves player up one square
	if(y == SIZE) y--; //Above the screen, causes player to move down for now
}
function getpixelclass(x,y)
{
	try{
		return document.getElementById("p"+x+"_"+y).className; //This will throw an error if there's negative x or y
	}
	catch(e) { //So we use a try-catch clause to catch negative positions
		return "player"; //Since player is not a used class for this function
	}
}
function leftArrow() //The code for the left arrow or the 'a' key being pressed
{
	x--; //Move position to the left
	if(getpixelclass(x,y) == "obstacle") //If the pseudo-move is an obstacle
	{
		x++; //Stop player from moving into obstacle by reverting to original position
	}
	makeOnMap(); //Adjust to fit on the screen
	otherKey(); //Cause vertical movement
	display(); //Display
}
function rightArrow() //Right arrow or the 'd' key
{
	x++; //Move position to right
	if(getpixelclass(x,y) == "obstacle") //If the pseudo-move is an obstacle
	{
		x--; //Stop player from moving into obstacle by reverting to original position
	}
	makeOnMap(); //Adjust to fit on screen
	otherKey(); //Cause vertical movement
	display(); //Display
}
function isStanding()
{
	if(y == 0) return true; //If the player is at the bottom of the screen
	if(getpixelclass(x,y-1)=="obstacle") return true; //If below the player is an oobstacle
	return false; //Otherwise
}
function upArrow() //Up arrow or the 'w' key
{
	if(isStanding()) //If the player is on ground or a platform
	{
		direction = 1; //Say it's going to be moving up
		increments = JUMP_HEIGHT; //Reset the increases left counter
		
	}
	otherKey(); //Cause vertical movement
}
function otherKey() //Force to move down, or some other key is pressed
{
	if(direction == 1 && increments != 0) //If it is still jumping
	{
		increments--; //Decrease (increases of y) by 1
		y++; //Increase y by 1
		if(getpixelclass(x,y-(y==SIZE))=="obstacle") //If the current square is an obstacle, reset to previous position
		{
			y--; //
			increments = 0; //Reset counter of movements up to 0.
			direction = 0; //Say they can't move up
		}
		makeOnMap(); //Adjust position to fit on the map
	}
	else if(isStanding()) //If it is not jumping and on a platform
	{
		//Do nothing
	}
	else //Otherwise, not on a platform and should fall down
	{
		y--; //Cause to move down
		makeOnMap(); //Adjust position
	}
	display(); //Display to the screen
}
function keydown(event) //The event handler for keydown events.
{
	var key = event.key.toLowerCase(); //I forgot the casing, and I had something like this in another project.
	if(key=="arrowup"||key=="w") { //Up arrow key OR the 'w' key
		upArrow();
	} else if(key=="arrowleft"||key=="a") { //Left arrow key OR the 'a' key
		leftArrow();
	} else if(key=="arrowright"||key=="d") { //Right arrow key OR the 'd' key
		rightArrow();
	} else { //Some other key is pressed
		otherKey();
	}
}
window.setInterval(function(){if(FALLNOBUTTON)otherKey();},500); //Code for automatic falling and jumping.
