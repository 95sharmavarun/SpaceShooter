var config = {
    type: Phaser.AUTO,
    width: 1300,
    height: 720,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
    	default: "arcade",
    	arcade:{
    		debug:false,
    		enable:false
    	}
    }
};

var game = new Phaser.Game(config);

function preload ()
{
	//this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#3498db");
	this.load.image('player','player.png');
	this.load.image('enemy','enemy.png');
	this.load.image('fire','fire.png');
	this.load.image('asteroid','asteroid.png');
	this.load.image('space','space.jpg');
	this.load.image('explosion','explosion.png');
	this.load.image('laser','laser.png');
	// this.load.audio('bg-music','bg-music.mp3');
	  // this.load.spritesheet('explosion', 'explode.png', { frameWidth: 1132, frameHeight: 1124 });

}

var sprite;
var fire;
var asteroid;
var player;
var explosion;
var laser;
var score = 0;
var scoreText;
var music;
var laserShot;
var blast;
var msg;

function create ()
{
	// music=this.add.audio('bg-music');
	// music.play();
music = new Audio('bg-music.mp3');
laserShot = new Audio('lasershot.wav');
blast = new Audio('blast.wav');
music.play();

let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'space')
let scaleX = this.cameras.main.width / image.width
let scaleY = this.cameras.main.height / image.height
let scale = Math.max(scaleX, scaleY)
image.setScale(scale).setScrollFactor(0)

scoreText = this.add.text(430, 0, 'Your Score: 0', { fontSize: '52px', fill: 'white' });
msg = this.add.text(330, 50, '', { fontSize: '32px', fill: 'white' });

    player = this.physics.add.sprite(100, 150, 'player');
    player.displayWidth=100;
    player.displayHeight=100;
	// player.setCollideWorldBounds(true);
	laser = this.physics.add.sprite(100, 150, 'laser');
    laser.displayWidth=80;
    laser.displayHeight=40;

    sprite = this.physics.add.sprite(1100, 150, 'enemy');
    sprite.displayWidth=280;
    sprite.displayHeight=240;

    fire = this.physics.add.sprite(1100, 150, 'fire');
    fire.displayWidth=80;
    fire.displayHeight=40;

    asteroid = this.physics.add.sprite(2000, 150, 'asteroid');
    asteroid.displayWidth=100;
    asteroid.displayHeight=70;

}

var fireSpeed=6;

function shoot(){
	var fire1=0;
	if(fire.x <=-24){
		fire.x=sprite.x;
		fire.y=sprite.y;
	}else{
		fire.x-=fireSpeed;	
	}
	if(fire.x<100){
		fire.x=sprite.x;
		fire.y=sprite.y;
	}

}


var count=0;
function updateEnemy(){


if(sprite.y<=540 && count==0){
	sprite.y +=4;
	shoot();
	
}

if(sprite.y>=150 && count==1){
	sprite.y -=4;
	shoot();
	
}

if(sprite.y>=540){
	count=1;
}
if(sprite.y <= 150){
	count=0;
}

}

var colchk=false;


function update ()
{



	var shootChk=false;
	var collide=this.physics.add.collider(player,asteroid,function(player){
		 if (!colchk) {
           player.setTexture('explosion');
            asteroid.setTexture('');
            fire.setTexture('');
            laser.setTexture('');
            colchk = true;
            // music.pause();
            blast.play();
            // blast.pause();
            msg.setText('Hahaha..!! Press F5 to Replay..!!');
            music.pause();
        }
	});

	var collide=this.physics.add.collider(player,fire,function(player){
		 if (!colchk) {
           player.setTexture('explosion');
          fire.setTexture('');
          laser.setTexture('');
            colchk = true;
             // music.pause();
             blast.play();
             msg.setText('Hahaha..!! Press F5 to Replay..!!');
            // blast.pause();
            music.pause();
        }
	});

	var collide=this.physics.add.collider(laser,sprite,function(laser){
		score++;
		scoreText.setText('Your Score: ' + score);
		laser.body.enable=false;
	});

if(!colchk){
	if(score > 35){
	 sprite.setTexture('explosion');
          laser.setTexture('');
          fire.setTexture('');
          asteroid.setTexture('');
          msg.setText('You Won..!! Press F5 to Replay..!!');
	colchk=true;
	music.pause();

}
	updateEnemy();
	shootAsteroid();
shootLaser();

	cursors = this.input.keyboard.createCursorKeys();
if (cursors.up.isDown && player.y > 40)
{
    player.y-=4;
    
}
else if (cursors.down.isDown)
{
	if(player.y < 620){
		 player.y+=4;
		 
	}
}

}


}

function shootLaser(){
var laser1=0;
	if(laser.x >= 1200){
		laser.body.enable=true;
		laser.x=player.x;
		laser.y=player.y;
	}else{
		laser.x +=6;	

}
}
var asteroidSpeed=2;
function shootAsteroid(){
	if(score > 10 && score < 15){
		asteroidSpeed=3;
		fireSpeed=7;
	}

	if(score > 15 && score < 20){
		asteroidSpeed=4;
		fireSpeed=8;
	}
	if(score > 20 && score < 25){
		asteroidSpeed=5;
		fireSpeed=9;
	}
	if(score > 25 && score < 30){
		asteroidSpeed=7;
		fireSpeed=10;
	}
	if(score > 30 ){
		asteroidSpeed=9;
		fireSpeed=11;
	}
	asteroid.x -=asteroidSpeed;
	if(asteroid.x < -50){
		asteroid.x=sprite.x+500;
		asteroid.y=sprite.y+asteroidSpeed;
	}
}
