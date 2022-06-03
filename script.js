const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = window.innerWidth;
const CANVAS_HEIGHT = canvas.height = window.innerHeight;


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

let player = new Player;
player.draw();

let background = new Image();
background.src = 'img/hercule_seghers1.jpg';

function animate(){
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.drawImage(background, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  player.draw();
  player.update();
  requestAnimationFrame(animate);
}
animate();

