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
    this.y = CANVAS_HEIGHT * 0.1;
    this.spriteWidth = 103;
    this.spriteHeight = 92;
    this.width = this.spriteWidth * 2.5;
    this.height = this.spriteHeight * 2.5;
    this.frame = 0; // for cycling through sprite sheet
    this.flapSpeed = 2; // low is faster
    this.flapIndex = 0; // frame number on spritesheet
    this.glideToggle = false; // don't glide at initial state
    this.climbSpeed = 0.2;
    this.dropSpeed = 0.8;
  }
  draw(){
    ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
  }
  update(){
    if (this.glideToggle){ // in glide state
      this.frame = 1;
      this.y += this.dropSpeed;
      if (this.y + this.height >= CANVAS_HEIGHT){ // stop gliding at bottom of screen
        this.glideToggle = false;
      }
    } else { // in flap state
      this.y -= this.climbSpeed;
      this.flapIndex ++;
      if (this.y <= 0){ // stop exiting at top of screen.
        this.y = 0;
      }
      if (this.flapIndex > this.flapSpeed){ // controll flapping rate
        this.frame ++
        this.flapIndex = 0;
        if (this.frame > 7) {
          this.frame = 0;
        }
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
    img.x --; // scroll image leftward
    if (img.x + CANVAS_WIDTH < 0){
      currentBgArray = currentBgArray.slice(1); // remove offscreen images from array
      addNextImage(CANVAS_WIDTH);
    }
  }
}

let player = new Player;

window.addEventListener("keydown", function(e){
  if (e.key == " "){
    player.glideToggle = true;
  }
});
window.addEventListener("keyup", function(ev){
  if (ev.key == " "){
    player.glideToggle = false;
  }
});

function animate(){
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  manageBackground();
  player.update();
  player.draw();
  requestAnimationFrame(animate);
}
animate();

