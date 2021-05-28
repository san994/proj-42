var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var ground , backGround , backGrounddImage;
var reset,resetImage,gameOver,gameOverImage;
var collided = 0;

var thing;
var score = 0;
var resetT = ""

function preload(){
  
  backGroundImage = loadImage("jungle.jpg");
  
  monkey_running =loadAnimation("Monkey_01.png" ,"Monkey_02.png"  , "Monkey_03.png" , "Monkey_04.png" , "Monkey_05.png"  ,  "Monkey_06.png" , "Monkey_07.png" , "Monkey_08.png" , "Monkey_09.png" , "Monkey_10.png"  );
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  
  resetImage = loadImage("reset 1.png");
  gameOverImage = loadImage("gameOver.png");
 
}



function setup() {
  
  createCanvas(600,400);
  
 monkey = createSprite(50,300,10,10);
 monkey.addAnimation("runing",monkey_running); 
 monkey.scale = 0.1;
  
  ground = createSprite(10,350,900,10);
  
  backGround = createSprite(300,100,10,10)
  backGround.addImage("back" , backGroundImage);
  backGround.velocityX = -4;
  backGround.x = backGround.width/2;
  
  gameOver = createSprite(300,200,10,10)
    gameOver.addImage("g" , gameOverImage);
    gameOver.scale = 0.5
    
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
}


function draw() {

  background('white');
  gameOver.visible = false;
  ground.visible = false;

  if (gameState===PLAY){

    backGround.velocityX = -4
  
  if(backGround.x<100){
    
    backGround.x = 500;
    
  }
  
  monkey.collide(ground);

  if(keyDown("space")&&(monkey.y>=290)){
    
    monkey.velocityY = -15;
     
   }

   

  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  bananaSpawn();
  
  obstacleSpawn();
  
  if(monkey.isTouching(bananaGroup)&&frameCount%20===0){
    
    bananaGroup.destroyEach();

    monkey.scale +=0.03
    
    score = score+1

  
    
  }
  
    
  if (obstacleGroup.isTouching(monkey)){
    
   gameState = END
      
   score = 0;
    
  }
 
   obstacleGroup.setDepthEach(1);
   monkey.depth = monkey.depth+1;
    
   bananaGroup.setDepthEach(1);
   monkey.depth = monkey.depth+1;
    
   backGround.depth = 1;
   bananaGroup.depthEach = bananaGroup.setDepthEach(1);

   backGround.depth = 1;
   obstacleGroup.depthEach = obstacleGroup.setDepthEach(1);
    
   
   drawSprites();
  
  
  }else if(gameState===END){
    
   
  monkey.velocityY = 0;
  backGround.velocityX = 0;
    
  obstacleGroup.setVelocityEach(0);
  bananaGroup.setVelocityEach(0);
  
  obstacleGroup.setLifetimeEach(-1);
  bananaGroup.setLifetimeEach(-1);

  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();

  gameOver.visible = true

  textSize(26)
  fill("red")
  text("PRESS R TO RE-START"+resetT,200,300)

  
  monkey.scale = 0.1;
  

  }
  
  
 
  
  stroke ("white");
  fill ("white");
  textSize(24);
  text("score "+ score,300,30);

  
  

}

function bananaSpawn(){
  
  if(frameCount%80===0){
    
  var banana = createSprite(550,0,10,10);
  banana.addImage("image",bananaImage);
  banana.y = Math.ceil(random(150,250));
  banana.scale = 0.1;
  banana.velocityX = -4;
  banana.lifeTime = 150;
  
  banana.velocityX = -(8+2*(score/8));  
    
  bananaGroup.add(banana);  
    
  }
  
}

function obstacleSpawn(){
  
  if(frameCount%300===0){
    
    var obstacle = createSprite(0,320,10,10);
    obstacle.addImage("spawn",obstacleImage);
    obstacle.x = Math.ceil(random(300,600));
    obstacle.velocityX = -5;
    obstacle.scale = 0.2;
    obstacle.lifeTime = 120;
    
    obstacle.velocityX = -(7+2*(score/8));
    
    obstacleGroup.add(obstacle); 
    
  }
  
}

function restart(){

 // gameOver.visible = false;
  
  gameState = PLAY;

  //reset.visiblle = false;
  

}


function keyPressed(){

if(keyCode === 82){

  restart()

}

}
