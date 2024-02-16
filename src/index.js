window.addEventListener('load', ()=>{
    /* use document.addEventListener to add additional two functions for interactivity
    "mouseup" for stopPainting and "mousedown" for startPainting (10pts)
    */
    document.addEventListener('mousedown', startPainting);
    document.addEventListener('mouseup', stopPainting);
    document.addEventListener('mousemove', sketch); // when mouse move, we draw the lines
});
    
const canvas = document.querySelector('#myCanvas');
canvas.width = 800;
canvas.height = 500;
   
// Context for the canvas for 2 dimensional operations
const ctx = canvas.getContext('2d');
ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.lineWidth = 5;
ctx.strokeStyle = "white";

// use document.getElementById to get the slider and the corresponding value

var slider = document.getElementById("linecap");


//use document.getElementByName to get the line color

var radio = document.getElementsByName("color");


// define the current mode : draw or earse
var tooltype = 'erase'; //default to nothing, press Draw to start

// Stores the initial position of the cursor
let coord = {x:0 , y:0}; 
   
// This is the flag that we are going to use to 
// trigger drawing
let paint = false;
    
// Updates the coordianates of the cursor when 
// an event e is triggered to the coordinates where 
// the said event is triggered.

// To get the coordinates of X and Y, we have multiple ways: screenX, screeenY clientX, clientY, pageX, and pageY.
// You can explore these three ways and see what are the differences among these approaches.

function getPosition(event){   //page instead of client for tracking on scrolled page 
  coord.x = event.pageX - canvas.offsetLeft;
  coord.y = event.pageY - canvas.offsetTop;

}
  
function startPainting(event){
  paint = true;
  getPosition(event);
  ctx.beginPath();
}

function stopPainting(){
  paint = false;
}

    
function sketch(event){
  getPosition(event);
  if(paint&& coord.y<490){
    ctx.lineTo(coord.x, coord.y);
    ctx.stroke();
  }
}

//Line Width Listener

if(slider){
  slider.addEventListener("input", function(){
    paint = false;
    ctx.lineWidth = this.value;
  });
}

//Color Radio Listener
var lineColor = "green"; //default to green, var keeps color set while erase mode is on

function updateColor(event){
    switch(event.target.value){
      case "red" :
        lineColor = "red";
        break;
      case "green" :
        lineColor = "green";
        break;
      case "blue" :
        lineColor = "blue";
        break;
    }
    if(tooltype === "draw"){
      ctx.strokeStyle = lineColor;
    }
    else{
      ctx.strokeStyle = "white";
    }
  }

for(i = 0;i < radio.length;i++){ //listen for each of the radio elements (3)
  radio[i].addEventListener("click", updateColor);
}

//

/* define a fucntion that can change the draw or erase mode 
when user clicks the corresponding button on HTML (5pts)

*/

document.getElementById("draw").onclick = function(){
  tooltype = "draw";
  ctx.strokeStyle = lineColor;
}
document.getElementById("erase").onclick = function(){
  tooltype = "erase";
  ctx.strokeStyle = "white";
}


