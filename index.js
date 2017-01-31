var Pixi = require("pixi.js");
var P2 = require("p2");
var Boat = require("./src/boat");
var Camera = require("./src/camera");

var { Graphics, Application, Point, Sprite } = Pixi;
var { World, Body } = P2;

var { view, stage, renderer, ticker } = new Application();

//p2
// gravity 0 world to simulate a top view of our lake
var world = new World({ gravity: [ 0, 0 ] });
world.sleepMode = World.BODY_SLEEPING;

// debug background
var bg = new Sprite.fromImage("./bg.png");
bg.setTransform(0, 0, 1, 1);

stage.addChild(bg);

var boat = new Boat({ stage, world });
var boat2 = new Boat({ x: 100, stage, world });
var boats = [ boat, boat2 ];

var camera = new Camera(stage, boat.body);

function onClick(e) {
  var x = e.clientX;
  // var y = e.clientY;
  var width = window.screen.width;
  var direction = x < width / 2 ? 1 : -1;
  var impulsePoint = [ 0, 0 ];
  boat.body.applyImpulse([ direction * 20, 0 ], impulsePoint);
}

var fixedTimeStep = 1 / 60;

var lastBoatSleepState = boats[0].body.sleepState;

function isInsideViewport(subject) {
  var relativeX = subject.interpolatedPosition[0] + stage.x;
  var relativeY = subject.interpolatedPosition[1] + stage.y;
  return relativeX > 0 &&
    relativeX < window.screen.width &&
    relativeY > 0 &&
    relativeY < window.screen.height;
}

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
      camera.startCameraFollow();
    }
    lastBoatSleepState = currentBoatSleepState;
  }
  if (!isInsideViewport(boat.body) && !camera.isMoving) {
    camera.startCameraFollow();
  }
  camera.cameraFollowStep(deltaTime);
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
window.addEventListener("click", onClick);
