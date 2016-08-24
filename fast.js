var SIZE = 31; //The size of the array of boxes
var JUMP_HEIGHT = 2; //The height that the player can jump.
var FALLNOBUTTON = true; //Whether 'hard' mode is enabled, IT NOW DEFAULTS TO TRUE.
var HARDMODE = true; //Whether 'hard' mode is ever disabled

var x = 0; //The x position of the player
var y = 0; //The y position of the player
var duration = 1000;

var direction=0; //1 is up, 0 is no vertical movement or downwards.
var increments=0; //The number of movements to go till it stop

function NOTHING_TEXT(x,y){return "<div class='nothing' id='p"+x+"_"+y+"'></div>"; } //The div with nothing in it
function PLAYER_TEXT(x,y){return "<div class='player' id='p"+x+"_"+y+"'></div>"; } //The divs with the player in it

function init_display() //returns the initial text
{
	var i = SIZE-1;
	var j = 0;
	var res = "";
	while(i!=-1) //Iterates over the code so it can be indexed with the bottom left being (0,0)
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
	try
	{
		document.getElementsByClassName("player")[0].className="nothing"; //White square, no player
		document.getElementById("p"+x+"_"+y).className="player"; //Red square, the player
	}
	catch(e)
	{
		console.log("YOU Cannot win, move on and fail!"); //If an error is thrown, the player must have won
	}
}
function set_obstacle(x,y) //Sets the pixel to be a platform
{
	document.getElementById("p"+x+"_"+y).className = "obstacle"; //that's the class name
}
function makeOnMap() //Makes the position ON the map
{
	if(x == -1) x++; //Off the left side of the screen, move right one
	if(x == SIZE) x--; //Off the right side of the screen, move left one
	if(y == -1) y++; //Below the screen, shouldn't happen, but moves player up one square
	if(y == SIZE) y--; //Above the screen, causes player to move down for now
}
function getpixelclass(x,y) //Returns the class name of the pixel sepcified
{
	try
	{
		return document.getElementById("p"+x+"_"+y).className; //If the pixel is invalid, will throw error, SO catch it.
	}
	catch(e)
	{
		return "player"; //Some useless name that is never used in anything. Just in case the player is off screen
	}
}
function leftArrow() //The code for the left arrow or the 'a' key being pressed
{
	x--; //Move position to the left
	if(getpixelclass(x,y) == "obstacle") //If they ran in to an obstacle
	{
		x++; //'bump' them off
	}
	makeOnMap(); //Adjust to fit on the screen
	otherKey(); //Cause vertical movement
	display(); //Display
}
function rightArrow() //Right arrow or the 'd' key
{
	x++; //Move position to right
	if(getpixelclass(x,y) == "obstacle") //'bump' the player off of the platform
	{
		x--;
	}
	makeOnMap(); //Adjust to fit on screen
	otherKey(); //Cause vertical movement
	display(); //Display
}
function isStanding()
{
	if(y == 0) return true; //If the player is at the bottom of the screen
	if(getpixelclass(x,y-1)=="obstacle") return true; //They're on the platform
	return false; //Neither condition is met
}
function upArrow() //Up arrow or the 'w' key
{
	if(isStanding())
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
		increments--; //Decrease (increases of y) by
		y++; //Increase y by 1
		if(getpixelclass(x,y-(y==SIZE))=="obstacle") //If they ran into the obstacle
		{
			y--; //'bump' downwards
			increments = 0; //Reset jumps left
			direction = 0; //Reset direction
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
	if(key=="arrowup"||key=="w") //Up arrow key OR the 'w' key
	{ 
		upArrow();
	}
	else if(key=="arrowleft"||key=="a") //Left arrow key OR the 'a' key
	{
		leftArrow();
	}
	else if(key=="arrowright"||key=="d") //Right arrow key OR the 'd' key
	{ 
		rightArrow();
	}
	else //Some other key is pressed
	{ 
		otherKey();
	}
	if(!FALLNOBUTTON && HARDMODE) //If hard mode is turrned off, turn the corrresponding variable off
	{
		HARDMODE = false;
	}
}
var theInterval = window.setInterval(function()
{
	if(FALLNOBUTTON) //If 'hard' mode is enabled
	{
		otherKey(); //Force a fake key press
	}
},1000); //Code for hard mode.
