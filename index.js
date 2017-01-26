var Pixi = require("pixi.js");
var P2 = require("p2");

var { Graphics, Application } = Pixi;
var { World, Body, Circle, Plane } = P2;

// pixi
var app = new Application();
var { view, stage, renderer, ticker } = app;

// looks of our boat
var sprite = new PIXI.Sprite.fromImage("./boat-small.png");

// set anchor point to the center of the sprite
sprite.anchor.x = 0.5;
sprite.anchor.y = 0.5;

// gets the coordinates for the center of the screen
function screenCenter() {
  return [ window.screen.width / 2, window.screen.height / 2 ];
}

// center the stage
var center = screenCenter();
stage.setTransform(...center);

// add boat to stage
stage.addChild(sprite);

//p2
// gravity 0 world to simulate a top view of our lake
var world = new World({ gravity: [ 0.1, 0 ] });

// body of our boat
var boatBody = new Body({ mass: 1, position: [ 0, 3 ] });
world.addBody(boatBody);

var fixedTimeStep = 1 / 60;

//game loop
ticker.add(function step(t) {
  var deltaTime = t * 1000 / ticker.FPS;
  world.step(fixedTimeStep, deltaTime);
  sprite.setTransform(...boatBody.interpolatedPosition);
  renderer.render(stage);
});

renderer.autoResize = true;
renderer.backgroundColor = 0xcccccc;
view.style = `
top: 0;
left: 0;
position: absolute;
`;
var resizeCanvas = function() {
  renderer.resize(window.screen.width, window.screen.height);
};
document.body.appendChild(view);
resizeCanvas();
window.addEventListener("resize", function(e) {
  resizeCanvas();
});

