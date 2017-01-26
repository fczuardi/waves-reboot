var Pixi = require("pixi.js");
var P2 = require("p2");
var Boat = require("./src/boat");

var { Graphics, Application } = Pixi;
var { World } = P2;

var { view, stage, renderer, ticker } = new Application();

var boat = new Boat({ image: "./boat-small.png" });

// gets the coordinates for the center of the screen
function screenCenter() {
  return [ window.screen.width / 2, window.screen.height / 2 ];
}

// center the stage
var center = screenCenter();
stage.setTransform(...center);

//p2
// gravity 0 world to simulate a top view of our lake
var world = new World({ gravity: [ 0, 0 ] });

// add boat to stage and world
stage.addChild(boat.sprite);
world.addBody(boat.body);

var fixedTimeStep = 1 / 60;

boat.body.applyImpulse([ 20, 0 ]);

//game loop
ticker.add(function step(t) {
  var deltaTime = 1000 * t / ticker.FPS;
  world.step(fixedTimeStep, deltaTime);
  boat.sprite.setTransform(...boat.body.interpolatedPosition);
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
