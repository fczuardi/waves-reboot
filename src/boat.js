var Sprite = require("pixi.js").Sprite;
var P2 = require("p2");

var {Body, Convex} = P2

class Boat {
  constructor({ image }) {
    var sprite = new Sprite.fromImage(image);
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    var body = new Body({ mass: 1 });
    var shape = new Convex({
        vertices: [
            [ -24, -4],
            [ 0, -46],
            [ 25, 6],
            [ 2, 44]
        ],
    });
    body.addShape(shape);
    this.sprite = sprite;
    this.body = body;
  }
}

module.exports = Boat;
