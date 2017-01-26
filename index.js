var Pixi = require("pixi.js");

var { Graphics, Application } = Pixi;
var app = new Application();
var { view, stage, renderer, ticker } = app;

// Pixi.loader.add('boat', 'bunny.png').load(function(loader, resources) {
let sprite = new PIXI.Sprite.fromImage("./boat-small.png");

stage.addChild(sprite);

function screenCenter() {
  return [ window.screen.width / 2, window.screen.height / 2 ];
}

var center = screenCenter();

stage.setTransform(...center);

sprite.anchor.x = 0.5;
sprite.anchor.y = 0.5;

// ticker.add(function(t) {
// var nextX = stage.x - t;
// stage.setTransform(nextX);
// });
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
