const GameWidth = 550;
// Enemies our player must avoid
const Enemy = function(x,y) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'C:\source2\frontend-arcade-game\images\enemy-bug.png';
    this.speed = Math.floor(Math.random() * 5) + 2;
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 30;
   // this.style.zIndex = "10";
};

let enemy1 = new Enemy(10, 40);
let enemy2 = new Enemy(10, 100);
let enemy3 = new Enemy(10, 200);

const GameArea = {
    canvas: document.createElement('canvas'),
    initialized: false,
    objects: [enemy1, enemy2, enemy3],
    start: function () {
      if (GameArea.initialized === true) {
        GameArea.restart();
        return;
      }
      this.canvas.width = GameWidth;
      this.canvas.height = 300;
      this.context = this.canvas.getContext('2d');
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      GameArea.initialized = true;
      this.interval = setInterval(GameArea.updateGameArea, 40);
    },
    clear: function () {
      GameArea.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    updateGameArea: function () {
      GameArea.clear()
      for (let obj of GameArea.objects) {
        obj.newPos()
        obj.update()
      }
    },
    stop: function () {
      for (let obj of GameArea.objects) {
        obj.speed = 0
        obj.x = 10
      }
    },
    restart: function () {
      for (let obj of GameArea.objects) {
        obj.speed = Math.floor(Math.random() * 4) + 1
      }
    },
  }

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
   // this.x += speed * dt;
    ctx = GameArea.getContext("2d");
   // ctx.fillStyle = this.color
   // ctx.fillRect(this.x, this.y, this.width, this.height)
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.newPos = function () {
  // When reaching end of row reset position to 0, change speed to random num
  let randomSpeed = Math.floor(Math.random() * 4) + 1
  this.x >= GameWidth
    ? ((this.x = 0), (this.speed = randomSpeed))
    : (this.x += this.speed)
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollisions = function (position) {
    
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function() {

};
Player.prototype.render = function() {

};
Player.prototype.update = function() { };
Player.prototype.handleInput = function() { };

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];

let player = new Player();

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
