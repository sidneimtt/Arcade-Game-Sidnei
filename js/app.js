
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    this.width = 60;
    this.height = 60;
    this.x = x;
    this.y = y;
};


Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x >= 600){
        this.x = -101;
        //set speed of the bugs when they restart from position X= -101
        this.speed = 50 + (Math.random() * 300);

    } else {
        this.x += this.speed * dt;
    }
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite =  'images/char-cat-girl.png'; /// player 
    this.width = 60;
    this.height = 60;
    this.x = 200;
    this.y = 400;
};



//Set boundaries and how much should the player move around X and Y position.
Player.prototype.handleInput = function(key) {
if (key === 'left' && this.x > 10) {
        this.x -= 100;
        console.log("current player X position is " + this.x);
    } else if (key === 'right' && this.x < 401){
        this.x += 100;
        console.log("current player X position is " + this.x);
    }  else if (key === 'up' && this.y > 10){
        this.y -= 85;
        console.log("current player Y position is " + this.y);
    } else if (key === 'down' && this.y < 320){
        this.y += 85;
        console.log("current player Y position is " + this.y);
    }

};


//if player touch the water play a sound and it goes back to the intial position
Player.prototype.update = function(dt) {
    if( this.y < 10) {
        swooshingP.play();
        swooshingP.play();
        this.reset(200,400);
    }
    //Check the X and Y position of the player to see if there is any collision and play a sound.
    var enemiesLenght = allEnemies.length;
    for (var i = 0; i < enemiesLenght; i++) {
        var enemy = allEnemies[i];
        if (this.x < enemy.x + enemy.width && this.x + this.width > enemy.x && this.y < enemy.y + enemy.height && this.height + this.y > enemy.y) {
            hitP.play();
            dieP.play();
            this.reset(200,400);
        }
    };
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//reset the position of the player
Player.prototype.reset = function(x, y) {
  this.x = x;
  this.y = y;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var ene1 = new Enemy(-100,59,160);
var ene2 = new Enemy(-100,140,120);
var ene3 = new Enemy(-100,225,180);
var allEnemies = [ene1, ene2, ene3];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});


// Add EventListener on canvas player in order to choose player.
function playerEventos() {
    $(".c1").on('click', function(evt) {
        var player1 = $(evt.target);
        checkPlayer(player1);
    });
};


// Check player that was choosen. 
function checkPlayer(playe) {
    var playEvt = playe[0].classList;
    if ( playEvt[0] == "cboy") {
            player.sprite = 'images/char-boy.png';
            chooseP.play();
    } else if ( playEvt[0] == "ccat") {
            player.sprite = 'images/char-cat-girl.png';
            chooseP.play();
    } else if ( playEvt[0] == "cprin") {
            player.sprite = 'images/char-princess-girl.png';
            chooseP.play();
    } else if ( playEvt[0] == "chorn") {
            player.sprite = 'images/charho.png';
            chooseP.play();
    } else if ( playEvt[0] == "cpink") {
            player.sprite = 'images/char-pink-girl.png';
            chooseP.play();
    }
    return;
};


// Load sounds
const chooseP = new Audio();
chooseP.src = "audio/sfx_point.wav";

const flapP = new Audio();
flapP.src = "audio/sfx_flap.wav";

const hitP = new Audio();
hitP.src = "audio/sfx_hit.wav";

const swooshingP = new Audio();
swooshingP.src = "audio/sfx_swooshing.wav";

const dieP = new Audio();
dieP.src = "audio/sfx_die.wav";




/*
TESTES DA FUNÇAO EVENT LISTENER COM ESCOLHA DO JOGADOR / TESTADO NO CONSOLE DO JAVASCRIPT NO CHROME,
CARREGADO A FUNCÃO EVENTOS(); E DEPOIS CLICKANDO NOS PLAYER PARA VER SE MUDAVA...NO HTML ...

function eventos() {
    $(".c1").on('click', function(evt) {
        var player1 = $(evt.target);
        var paX1 = $(evt.pageX);
        var paY1 = $(evt.pageY);
      //  document.getElementById("demo").innerHTML = player1;
    $("#log").text( "pageX: " + evt.pageX + ", pageY: " + evt.pageY + "Player:" + evt.target + "VALOR PASSADO:" + player1);
        checkPlayer(player1, paX1, paY1);
    });
};



function checkPlayer(playe, paX, paY) {
     //var x = document.getElementById("c1").classList;
     //document.getElementById("demo").innerHTML = x;
     var playEvt = playe[0].classList;
     document.getElementById("demo").innerHTML = playEvt;
    if ( playEvt == "cboy") {
            player.sprite = 'images/char-boy.png';
    } else if ( playEvt == "ccat") {
            player.sprite = 'images/char-cat-girl.png';
    } else if ( playEvt == "cprin") {
            player.sprite = 'images/char-princess-girl.png';
    } else if ( playEvt == "chorn") {
            player.sprite = 'images/charho.png';
    } else if ( playEvt == "cpink") {
            player.sprite = 'images/char-pink-girl.png';
    }
    $("#log2").text( "pageX: " + paX + ", pageY: " + paY + "Player NEW:" + player.sprite );
    return;
};

*/

