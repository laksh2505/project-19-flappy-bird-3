
var PLAY = 1;
var END = 2;

var gamestate = PLAY;
var ground, invisibleGround1, invisibleGround2, groundImg;
var obstacle1, obstacle1Img, obstacle2, obstacle2Img;
var balloon, balloonImg;
var coin, coinImg;
var getready, names, reset, getreadyImg, namesImg, resetImg;
var score;

function preload(){
groundImg  = loadImage("bg.png");
obstacle1Img = loadImage("rodbottom.png");
obstacle2Img = loadImage("rodtop.png");
balloonImg = loadImage("balloon.png");
coinImg = loadImage ("coin.png");
getreadyImg = loadImage("getready.png");
namesImg = loadImage("name.png");
resetImg = loadImage ("reset.png");

}

function setup() {
createCanvas(700, 400);

ground = createSprite(350,200,350,200);
ground.addImage("ground",groundImg);
ground.x = ground.width /2;
ground.scale = 0.8;
ground.x = 350;
ground.y = 200;
  
balloon = createSprite(50,200);
balloon.addImage("balloon", balloonImg);
balloon.scale = 0.15;
balloon.debug = false;
  
invisibleGround1 = createSprite(350,395,700,10);
invisibleGround1.visible = false;

invisibleGround2 = createSprite(350,5,700,10);
invisibleGround2.visible = false;
  
reset = createSprite(350,200);
reset.addImage(resetImg);
reset.scale = 0.1;
reset.visible = false;
reset.debug = false;
  
names = createSprite(350,160);
names.addImage(namesImg);
names.scale = 0.3;
names.visible = false;

getready = createSprite(350,350);
getready.addImage(getreadyImg);
getready.scale = 0.3;
getready.visible = false;
  


score = 0;

obstaclesGroup1 = createGroup();
obstaclesGroup2 = createGroup();
coinsGroup = createGroup();
}
function draw(){
  
//displaying score
fill("yellow")
text("Score: "+ score, 600,50);
 

if (gamestate === PLAY){
  reset.visible = false;
  ground.velocityX = -(4 + 3* score/200);
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
    //scoring
   
 
  if(keyDown("space")) {
    balloon.velocityY = -5;
  }
  balloon.velocityY = balloon.velocityY + 1;
  spawnObstacles1();
    spawnObstacles2();
  spawnCoins();
  if(obstaclesGroup1.isTouching(balloon)){
        //trex.velocityY = -12;jumpSound.play();
        gamestate = END;
  }
  if(obstaclesGroup2.isTouching(balloon)){
        //trex.velocityY = -12;jumpSound.play();
        gamestate = END;
  }
   if(balloon.isTouching(coinsGroup)){
      score = score + 5;
    }
}
 else if (gamestate === END) {
    reset.visible = true;
    balloon.velocityY = 0;
    ground.velocityX = 0;
    score = 0;
    obstaclesGroup1.destroyEach();
    obstaclesGroup2.destroyEach();
    coinsGroup.destroyEach();
   
 }
  


  balloon.collide(invisibleGround1);
  balloon.collide(invisibleGround2);
  
  if(mousePressedOver(reset)) {
      gamestate = PLAY;
    }
  drawSprites();
  score = score + Math.round(getFrameRate()/200);
}
function spawnObstacles1(){
 if (frameCount % 60 === 0){
   var obstacle1 = createSprite(700,365,10,40);
   obstacle1.addImage(obstacle1Img);
   obstacle1.scale = 1.0;
   obstacle1.velocityX = -(6 + score/100);
   obstacle1.y = Math.round(random(320,380));
   obstacle1.lifetime = 200;
   obstacle1.depth = balloon.depth;
   balloon.depth = balloon.depth + 1;
   obstacle1.debug = false;
   obstaclesGroup1.add(obstacle1);
   
 }
}

function spawnObstacles2(){
 if (frameCount % 60 === 0){
   var obstacle2 = createSprite(700,365,10,40);
   obstacle2.addImage(obstacle2Img);
   obstacle2.scale = 1.0;
   obstacle2.velocityX = -(6 + score/100);
   obstacle2.y = 80
   obstacle2.lifetime = 200;
   obstacle2.depth = balloon.depth;
   balloon.depth = balloon.depth + 1;
   obstacle2.debug = false;
   obstaclesGroup2.add(obstacle2);
   
 }
}

function spawnCoins(){
  if (frameCount % 70 === 0){
   var coin = createSprite(700,365,10,40);
   coin.addImage(coinImg);
   coin.scale = 0.03;
   coin.velocityX = -(6 + score/100);
   coin.y = Math.round(random(10,390));
   coin.lifetime = 200;
   coin.debug = false;
    coinsGroup.add(coin);
  
}
}

  

