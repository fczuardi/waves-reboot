var Sprite = require("pixi.js").Sprite;
var P2 = require("p2");

var { Body, Convex } = P2;

var defaultImage = "./boat-small.png";

var Boat = function({ image, x, y, stage, world } = {}) {
  var sprite = new Sprite.fromImage(image || defaultImage);
  var body = new Body({ mass: 1, position: [ x || 0, y || 0 ] });
  var polygon = [ [ -24, -4 ], [ 0, -46 ], [ 25, 6 ], [ 2, 44 ] ];
  sprite.anchor.x = 0.5;
  sprite.anchor.y = 0.5;
  body.fromPolygon(polygon);
  this.sprite = sprite;
  this.body = body;
  if (stage) {
    stage.addChild(this.sprite);
  }
  if (world) {
    world.addBody(this.body);
  }
};

module.exports = Boat;
