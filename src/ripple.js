var ease = require("eases/cubic-out");
var Pixi = require("pixi.js");
var P2 = require("p2");

var { Body, Circle } = P2;
var { Sprite, filters, Graphics } = Pixi;
var { DisplacementFilter } = filters;

var maxRadiuses = [100, 200, 400];
var animationTimes = [3, 6, 12];
var lineWidths = [3, 6, 9];

class Ripple {
  constructor(x, y, type, ticker, stage, world) {
    var body = new Body({ collisionResponse: false, position: [x, y] });
    body.addShape(new Circle({ radius: 3 }));
    var radius = maxRadiuses[type];
    // debug
    // var sprite = new Graphics()
    // .lineStyle(lineWidths[type], 0x00ffff, 1)
    // .drawCircle(0, 0, radius);
    // sprite.rotation = Math.PI / 2;
    var sprite = new Sprite.fromImage("./ripple_map.png");
    sprite.anchor.set(0.5, 0.5);
    sprite.position.set(x, y);
    sprite.scale.set(0, 0);
    body.label = "Ripple";
    this.sprite = sprite;
    this.body = body;
    this.stage = stage;
    this.type = type;
    this.speed = animationTimes[type];
    this.ticker = ticker;
    this.world = world;
    this.t = 0;

    this.stage.addChild(sprite);
    this.world.addBody(this.body);
    var newFilter = [new DisplacementFilter(this.sprite, 5)];
    var newFilters = stage.filters
      ? stage.filters.concat(newFilter)
      : newFilter;
    this.stage.filters = newFilters;
    ticker.add(this.step.bind(this));
  }

  step(d) {
    var deltaTime = d / this.ticker.FPS;
    var maxRadius = maxRadiuses[this.type];
    if (this.body.shapes[0].radius > maxRadius) {
      // TODO remove ripple from world and stage and remove this listener
      this.stage.removeChild(this.sprite);
      return null;
    }

    var p = ease(this.t / this.speed);
    var [x, y] = this.body.position;
    var newRadius = p * maxRadius;
    this.body.shapes[0].radius = newRadius;
    this.t += deltaTime;
    this.sprite.scale.set(p, p);
    this.sprite.alpha = 1 - p;
    // console.log({p})
  }
}

module.exports = Ripple;
