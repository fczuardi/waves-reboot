var Sprite = require("pixi.js").Sprite;
var Body = require("p2").Body;

class Boat {
  constructor({ image }) {
    var sprite = new Sprite.fromImage(image);
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    this.sprite = sprite;
    this.body = new Body({ mass: 1 });
  }
}

module.exports = Boat;
