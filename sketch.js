var gamestate = "level1", backdrop, player, backdropimg, playerimg, satelliteimg, satellitegroup, oresgroup, gameover, score = 0
var button, gameoverimg, evilship, evilshipimg

function preload(){

  backdropimg = loadImage("backdropimg.png")
  playerimg = loadImage("playerimg.png")
  satelliteimg = loadImage("satelliteimg.png")
  gameoverimg = loadImage("gameover.png")
}


function setup() {
  createCanvas(1000,600);
 
  backdrop = createSprite(500,300,1000,600)
  backdrop.y = backdrop.width/2
  backdrop.shapeColor = "black"
  backdrop.addImage(backdropimg)
  backdrop.scale = 1.6
  player = createSprite(200,300,20,20)
  player.shapeColor = "red"
  player.addImage(playerimg)
  player.scale = 0.1
  backdrop.velocityY = 3
  satellitegroup = new Group()
  oregroup = new Group()
  gameover = createSprite(500,300)
  gameover.visible = false
  gameover.addImage(gameoverimg)
  gameover.scale = 1.5
  evilship = createSprite(random(50,850),20,30,30)
  evilship.visible = false
}

function draw() {
  console.log(gamestate)
  background("black");  
  edges = createEdgeSprites()
  player.bounceOff(edges)
  if(gamestate==="level1"){
  satellites()
  ores()
  if(backdrop.y>515){
    backdrop.y = backdrop.width/2
  }

  if(keyDown(UP_ARROW)){
    player.y = player.y - 10
  }
  if(keyDown(DOWN_ARROW)){
    player.y = player.y + 10
  }
  if(keyDown(LEFT_ARROW)){
    player.x = player.x - 10
  }
  if(keyDown(RIGHT_ARROW)){
    player.x = player.x + 10
  }

  if(satellitegroup.isTouching(player)){
  gamestate = "over"
  }
  if(oregroup.collide(player)){
  score = score+10
  oregroup.setLifetimeEach(1)
  }
  if(score>=10&&gamestate==="level1"){
   text("press space for next level",400,300)
  }
  if(score>=10 && keyDown("space")){
   /*button = createImg("button.png")
   button.position(400,100)
   button.size(180,90)
   button.mousePressed(mars)*/
   gamestate = "level2"
  }
}
if(gamestate==="over"){
  satellitegroup.setVelocityYEach(0)
  oregroup.setVelocityYEach(0)
  backdrop.velocityY = 0
  gameover.visible = true
}
if(gamestate==="level2"){
  //button.hide()
  mars()
}
  drawSprites();
  textSize(25)
  fill("white")
  text(score,900,50)

}

function satellites(){
  if(frameCount%60===0){
     satellite = createSprite(Math.round(random(30,950)),-60,20,20)
     satellite.shapeColor = "blue"
     satellite.velocityY = 5
     satellite.addImage(satelliteimg)
     satellite.scale = 0.2
     satellitegroup.add(satellite)
  } 
}

function ores(){
  if(frameCount%150===0){
     ore = createSprite(Math.round(random(200,900)),-20,20,20)
     ore.shapeColor = "yellow"
     ore.velocityY = 7
     oregroup.add(ore)
     //ore.scale = 0.2
  } 
}

function mars(){
  console.log("hi!")
  //gamestate = "level2"
  if(frameCount%10===0){
  evilship.visible = true
  evilship.velocityY = 3
  bullet = createSprite(evilship.x,evilship.y+20,10,10)
  bullet.velocityY = 9
  }
}


