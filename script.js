const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = window.innerWidth;
const CANVAS_HEIGHT = canvas.height = window.innerHeight;
const imageSources = [
  'img/hercule_seghers1.jpg',
  'img/hercule_seghers2.jpg',
  'img/hercule_seghers3.jpg',
  'img/hercule_seghers4.jpg'
];

class Player{
  constructor(){
    this.image = new Image();
    this.image.src = 'img/parot_spritesheet_8frame(w103h92).png';
    this.x = 100;
    this.y = CANVAS_HEIGHT * 0.5;
    this.spriteWidth = 103;
    this.spriteHeight = 92;
    this.width = this.spriteWidth * 2.5;
    this.height = this.spriteHeight * 2.5;
    this.frame = 0; // for cycling through sprite sheet
    this.flapSpeed = 2; // low is faster
    this.flapIndex = 0;
  }

  draw(){
    ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
  }
  update(){
    this.flapIndex ++;
    if (this.flapIndex > this.flapSpeed){
      this.frame ++
      this.flapIndex = 0;
      if (this.frame > 7) {
        this.frame = 0;
      }
    }
  }
};

class bgImage{
  constructor(imageUrl, x_position){
    this.image = new Image();
    this.image.src = imageUrl;
    this.x = x_position;
  }
  draw(){
    ctx.drawImage(this.image, this.x, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

// Helper Functions
function addNextImage(x_postition){
  let imageUrl = imageSources[Math.floor(Math.random() * imageSources.length)];
  let nextImage = new bgImage(imageUrl, x_postition);
  currentBgArray.push(nextImage);
}

// Manage Background Movement
let currentBgArray = [];
addNextImage(0);
addNextImage(CANVAS_WIDTH);
function manageBackground(){
  for (img of currentBgArray){
    img.draw();
    img.x --;
    if (img.x + CANVAS_WIDTH < 0){
      currentBgArray = currentBgArray.slice(1);
      addNextImage(CANVAS_WIDTH);
    }
  }
}

let player = new Player;
//let background = new bgImage('img/hercule_seghers1.jpg');

function animate(){
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  //currentBgArray[0].draw();
  manageBackground();
  player.draw();
  player.update();
  requestAnimationFrame(animate);
}
animate();

