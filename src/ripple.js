var ease = require("eases/cubic-out");
var Pixi = require("pixi.js");
var P2 = require("p2");

var { Body, Circle } = P2;
var { Graphics } = Pixi;

var animationTime = 10;

class Ripple {
  constructor(x, y, maxRadius, ticker, stage, world) {
    var body = new Body({ collisionResponse: false, position: [ x, y ] });
    body.addShape(new Circle({ radius: 3 }));
    var sprite = new Graphics();
    body.label = "Ripple";
    this.sprite = sprite;
    this.body = body;
    this.stage = stage;
    this.ticker = ticker;
    this.world = world;
    this.maxRadius = maxRadius;
    this.t = 0;
    this.stage.addChild(this.sprite);
    this.world.addBody(this.body);
    ticker.add(this.step.bind(this));
  }

  drawSprite(alpha) {
    this.sprite.clear();
    this.sprite
      .beginFill(0x00FFFF, alpha)
      .drawCircle(
        this.body.position[0],
        this.body.position[1],
        this.body.shapes[0].radius
      )
      .endFill();
  }

  step(d) {
  var deltaTime = d / this.ticker.FPS;
    if (this.body.shapes[0].radius > this.maxRadius) {
      // TODO remove ripple from world and stage and remove this listener
      this.stage.removeChild(this.sprite);
      return null;
    }

    var p = ease(this.t / animationTime);
    var [ x, y ] = this.body.position;
    var newRadius = p * this.maxRadius;
    this.body.shapes[0].radius = newRadius;
    this.sprite.clear();
    this.drawSprite(1 - p);
    this.t += deltaTime;
  }
}

module.exports = Ripple;
