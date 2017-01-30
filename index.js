var ease = require("eases/cubic-out");
var Pixi = require("pixi.js");
var P2 = require("p2");
var Boat = require("./src/boat");

var { Graphics, Application, Point, Sprite } = Pixi;
var { World, Body } = P2;

var { view, stage, renderer, ticker } = new Application();

//p2
// gravity 0 world to simulate a top view of our lake
var world = new World({ gravity: [ 0, 0 ] });
world.sleepMode = World.BODY_SLEEPING;

// debug background
var bg = new Sprite.fromImage("./bg.png");
bg.setTransform(-200, -200, 1, 1);

stage.addChild(bg);

var boat = new Boat({ stage, world });
var boat2 = new Boat({ x: 100, stage, world });
var boats = [ boat, boat2 ];

// gets the coordinates for the center of the screen
function screenCenter() {
  return [ window.screen.width / 2, window.screen.height / 2 ];
}

function onClick(e) {
  var x = e.clientX;
  // var y = e.clientY;
  var width = window.screen.width;
  var direction = x < width / 2 ? 1 : -1;
  var impulsePoint = [ 0, 0 ];
  boat.body.applyImpulse([ direction * 20, 0 ], impulsePoint);
}

var fixedTimeStep = 1 / 60;

var stageCenteringTime = 2000;
var stageX = stage.x;
var stageX0 = stage.x;
var stageY = stage.y;
var stageY0 = stage.y;
var deltaX = 0;
var deltaY = 0;
var stageT = 0;

var lastBoatSleepState = boats[0].body.sleepState;

//game loop
ticker.add(function step(t) {
  var deltaTime = 1000 * t / ticker.FPS;
  world.step(fixedTimeStep, deltaTime);
  boats.forEach(function updateSpritePosition(boat) {
    var [ x, y ] = boat.body.interpolatedPosition;
    boat.sprite.setTransform(x, y, 1, 1, boat.body.angle);
  });

  var currentBoatSleepState = boats[0].body.sleepState;
  if (currentBoatSleepState !== lastBoatSleepState) {
    if (currentBoatSleepState === Body.SLEEPY) {
      centerStage();
    }
    lastBoatSleepState = currentBoatSleepState;
  }
  if (stageT < stageCenteringTime) {
    var p = ease(stageT / stageCenteringTime);
    stage.setTransform(stageX0 + deltaX * p, stageY0 + deltaY * p);
    stageT = stageT + deltaTime;
  }
  renderer.render(stage);
});

function centerStage() {
  // code to recenter stage goes here
  var [ screenCenterX, screenCenterY ] = screenCenter();
  var [ boatX, boatY ] = boats[0].body.interpolatedPosition;
  stageX = screenCenterX - boatX;
  stageY = screenCenterY - boatY;
  stageX0 = stage.position.x;
  stageY0 = stage.position.y;
  stageT = 0;
  deltaX = stageX - stageX0;
  deltaY = stageY - stageY0;
}

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
window.addEventListener("click", onClick);
