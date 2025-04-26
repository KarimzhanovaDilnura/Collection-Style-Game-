//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
let catcher;
let fallingObject;
let squareObject;
let bombObject;
let toggle = false;
let score = 0;

/* PRELOAD LOADS FILES */
function preload(){
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);

  //Create bomb object
  // bombObject = new Sprite(200,0,20,20);
  // bombObject.color = color(255,0,0);
  // bombObject.vel.y = 4;
}

/* DRAW LOOP REPEATS */
function draw() {
  if (toggle == false) {
    drawInstructions();
  } else {
    playGame();
  }
}

function drawInstructions() {
  background("#AEB0D8");


  // Draw instructions text
  fill(0);
  noStroke();
  textSize(16);
  textAlign(CENTER);
  text("INSTRUCTIONS",width/2,height/2-150);
  text("Use the left and right arrow keys\n  to move the catcher and intercept the falling items.", width/2, height/2-120);
  text("Catching a circle rewards you\nwith one point. Catching a square \ndeducts one point", width/2,height/2-30);
  text("Click anywhere on the screen to \nstart the game. You can halt the game by\n clicking anywhere on the screen.", width/2, height/2+60);
}

function playGame() {
  background("#AEB0D8");

  // Initialize catcher and objects if they don't exist
  if (!catcher) {
    initializeGameObjects();
  }

  // Move catcher
  if (kb.pressing("left")){
    catcher.vel.x = -3;
  } 
  else if (kb.pressing("right")){
    catcher.vel.x = 3;
  } 
  else {
    catcher.vel.x = 0;
  }

  // Constrain catcher within canvas
  if (catcher.x < 50){
    catcher.x = 50;
  }
  else if (catcher.x > 350){
    catcher.x = 350;
  }

  // shorten catcher when score > 10
  if (score > 10) {
    catcher.width = 60;
    catcher.height = 20;
  }

  // Handle collisions and reset positions for objects
  if (fallingObject.collide(catcher)) {
    resetFallingObject();
    score = score + 1;;
  } 
  else if (squareObject.collide(catcher)) {
    resetSquareObject();
    score = score - 1;
  }

  if (fallingObject.y >= height){
    resetFallingObject();
  }
  else if (squareObject.y >= height){
    resetSquareObject();
  }

  // Update sprites
  drawSprites();

  // Draw the score to screen
  fill(0, 128, 128);
  textAlign(LEFT);
  textSize(20);
  text("Score = " + score, 10, 30);
}


function initializeGameObjects() {
  // Create catcher
  catcher = createSprite(200, 380, 100, 20);
  catcher.shapeColor = color("#301934");
  catcher.collider = 'k';

  // Create falling object
  fallingObject = createSprite(random(width), 0, 10);
  fallingObject.shapeColor = color(0, 128, 128);
  fallingObject.velocity.y = 2;

  // Create square object
  squareObject = createSprite(random(width), 0, 10, 10);
  squareObject.shapeColor = color(255, 0, 0);
  squareObject.velocity.y = 1;

  // Lock rotation for square object
  squareObject.rotationLock = true;
}

function resetFallingObject() {
  fallingObject.position.y = 0;
  fallingObject.position.x = random(width);
  fallingObject.velocity.y = random(1, 5);
  fallingObject.direction = "down";
}

function resetSquareObject() {
  squareObject.position.y = 0;
  squareObject.position.x = random(width);
  squareObject.velocity.y = random(1, 5);
  squareObject.direction = "down";
}

function mousePressed(){
  toggle = !toggle;
}