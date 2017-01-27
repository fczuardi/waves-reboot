var Pixi = require("pixi.js");
var P2 = require("p2");
var Boat = require("./src/boat");

var { Graphics, Application, Point } = Pixi;
var { World } = P2;

var { view, stage, renderer, ticker } = new Application();

//p2
// gravity 0 world to simulate a top view of our lake
var world = new World({ gravity: [ 0, 0 ] });

var boat = new Boat({ stage, world });
var boat2 = new Boat({ x: 100, stage, world });
var boats = [ boat, boat2 ];

// gets the coordinates for the center of the screen
function screenCenter() {
  return [ window.screen.width / 2, window.screen.height / 2 ];
}

function onClick(e) {
  var direction = e.screenX < window.screen.width ? 1 : -1;
  boat.body.applyImpulse([ direction * 20, 0 ]);
}

// center the stage
var center = screenCenter();

stage.setTransform(...center);

var fixedTimeStep = 1 / 60;

//game loop
ticker.add(function step(t) {
  var deltaTime = 1000 * t / ticker.FPS;
  world.step(fixedTimeStep, deltaTime);
  boats.forEach(function updateSpritePosition(boat) {
    boat.sprite.setTransform(...boat.body.interpolatedPosition);
  });
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
