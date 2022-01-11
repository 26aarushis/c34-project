const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var trampoline, trampolineImg; 
var person, person1_img, person2_img, person3_img, person4_img;
var personArray = [];
var building, buildingImg;
var firemanImg, fireman1, fireman2, fireman3;
var bg_img;
var bg_music; 
var muteImg, mute_btn;
var canW;
var canH;
var score = 0;
var platform, platform2, platform3;
var right;
var left;
var i = personArray.length-1;


function preload() {
  bg_music = loadSound("bg_music.mp3");
  firemanImg = loadImage("fireman.png");
  bg_img = loadImage("bg_img.jpg");
  buildingImg = loadImage("building.png");
  trampolineImg = loadImage("trampoline.png");
  person1_img = loadAnimation("person1.png");
  person2_img = loadAnimation("person2.png");
  person3_img = loadAnimation("person3.png");
  person4_img = loadAnimation("person4.png");
  muteImg = loadImage("mute_btn.png");

  person1_img = loadImage("person1.png");
  person2_img = loadImage("person2.png");
  person3_img = loadImage("person3.png");
  person4_img = loadImage("person4.png");
}


function setup() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
 
  if (isMobile) {
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(displayWidth, displayHeight);
  }
  else {
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(windowWidth, windowHeight);
  }

  engine = Engine.create();
  world = engine.world;

  bg_music.play();
  bg_music.setVolume(0.5);

  building = createImg("building.png");
  building.position(-340, -43);
  building.size(800,800);

  trampoline = createSprite(canW/2+200, canH-100, 200, 100);
  trampoline.addImage(trampolineImg);
  trampoline.scale = 0.4;

  mute_btn = createImg("mute_btn.png");
  mute_btn.position(canW-70, 20);
  mute_btn.size(45,45);
  mute_btn.mouseClicked(mute);

  platform1 = createImg("platform.png");
  platform1.position(200,canH/2+30);
  platform1.size(200,25);

  platform2 = createImg("platform.png");
  platform2.position(200,canH/2-75);
  platform2.size(200,25);
  
  platform3 = createImg("platform.png");
  platform3.position(200,canH/2-180);
  platform3.size(200,25);

  fireman1 = createImg("fireman.png");
  fireman1.position(225, canH/2-50);
  fireman1.size(90,100);
  fireman1.mouseClicked(pushPeople);

  fireman2 = createImg("fireman.png");
  fireman2.position(225, canH/2-155);
  fireman2.size(90,100);
  fireman2.mouseClicked(pushPeople);

  fireman3 = createImg("fireman.png");
  fireman3.position(225, canH/2-270);
  fireman3.size(90,100);
  fireman3.mouseClicked(pushPeople);

  right = createImg("right.png");
  right.position(285,canH-125);
  right.size(100,100);

  left = createImg("left.png");
  left.position(190, canH-125);
  left.size(100,100);
}


function draw() 
{
  background(51);
  image(bg_img, 0, 0, canW, canH);
  Engine.update(engine);

  imageMode(CENTER);

  textSize(20);
  text("People saved: "+score, canW-250, 50);
  text("Click the fireman to push people", 250, 50);

  if(collide(personArray[i], trampoline, 80)) {
    score+1;
    delete personArray[i];
  }

  
  console.log(frameCount);

  spawnPeople();
  
  drawSprites();
}

function mute()
{
  if(bg_music.isPlaying())
     {
      bg_music.stop();
     }
     else{
      bg_music.play();
     }
}

function spawnPeople() {
  if(frameCount%200 ===0) {
    person = createSprite(350, canH/2-50, 90, 100);
    person.addImage(person1_img);
    person.scale = 0.2;
    person.visible = true;
    person.depth = building.depth+1;
    person.bounceOff(trampoline);
    personArray.push(person);

    var ran = Math.round(random(1,4));
    switch(ran) {
      case 1: person.addImage(person1_img);
        person.scale = 0.005;
        break;
      case 2: person.addImage(person2_img);
        person.scale = 0.2;
        break;
      default:
    }
    
    var ranY = Math.round(random(1,3));
    switch(ranY) {
      case 1: person.y = canH/2-50;
        break;
      case 2: person.y = canH/2-145;
        break;
      case 3: person.y = canH/2-255;
        break;
      default:
    }

    }
}

function collide(spriteA,spriteB,x)
{
  if(spriteA!=null)
        {
         var d = dist(spriteA.position.x,spriteA.position.y,spriteB.position.x,spriteB.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}

function pushPeople() {
  Matter.Body.applyForce(person, {x:0, y:0},{x:0.03,y:0});
}