var monkey , monkey_running, monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var score=0;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  var canvas = createCanvas(400,400);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
 //monkey.debug = true;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -8;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  foodGroup = new Group();
  obstacleGroup = new Group();

  
}


function draw() {
background(225);
  
  if(foodGroup.isTouching(monkey)) {
    score = Math.round(frameCount/frameRate())
  }
  
  stroke("black");
  textSize(15);
  fill(0);
  text("Score: " + score, 110,115);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.round(frameCount/frameRate())
  survivalTime = survivalTime+1;
  text("Survival Time: " + survivalTime, 110,90);
  
  /*if (foodGroup.isTouching(monkey)) {
    score = score+0.2;
  }*/
  
  
  if(ground.x < 0) {
   ground.x = ground.width/2;
 }
   
  if(keyDown("space")&& monkey.y >= 200 ) {
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 1;
  
  monkey.collide(ground);
  
  drawSprites();
  spawnFood();
  spawnObstacle();
  
}


function spawnFood() {
  //write code here to spawn the bananas
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,50,40,10);
    banana.y = Math.round(random(250,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -8;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    banana.setCollider("circle", 50,50);
//  banana.debug=true;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each banana to the group
    foodGroup.add(banana);
  }
}


function spawnObstacle() {
  //write code here to spawn the bananas
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(400,350,100,10);
    obstacle.y = Math.round(random(326,325));
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -8;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
    
    obstacle.setCollider("circle", 50,50);
//  obstacle.debug=true;
    
    //add each banana to the group
    obstacleGroup.add(obstacle);
  }
}

