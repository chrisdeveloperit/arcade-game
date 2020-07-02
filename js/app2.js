const GamesModule = (function () {
    const GameWidth = 550;
    const GamePiece = function (width, height, color, x, y) {
      this.width = width
      this.height = height
      this.speedX = Math.floor(Math.random() * 5) + 2
      this.speedY = 0
      this.x = x
      this.y = y
      this.color = color
    }
    let piece1 = new GamePiece(30, 30, 'blue', 10, 40);
    let piece2 = new GamePiece(30, 30, 'red', 10, 100);
    let piece3 = new GamePiece(30, 30, 'orange', 10, 200);
    const GameArea = {
      canvas: document.createElement('canvas'),
      initialized: false,
      objects: [piece1, piece2, piece3],
      start: function () {
        if (GameArea.initialized === true) {
          GameArea.restart();
          return;
        }
        this.canvas.width = GameWidth;
        this.canvas.height = 270;
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
          obj.speedX = 0
          obj.x = 10
        }
      },
      restart: function () {
        for (let obj of GameArea.objects) {
          obj.speedX = Math.floor(Math.random() * 4) + 1
        }
      },
    }
  
    GamePiece.prototype.update = function () {
      ctx = GameArea.context
      ctx.fillStyle = this.color
      ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    GamePiece.prototype.newPos = function () {
      // When reaching end of row reset position to 0, change speed to random num
      let randomSpeed = Math.floor(Math.random() * 4) + 1
      this.x >= GameWidth
        ? ((this.x = 0), (this.speedX = randomSpeed))
        : (this.x += this.speedX)
    }
    return {
      GameArea: GameArea,
    }
  })()
  