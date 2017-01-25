var Pixi = require("pixi.js");

var { Graphics, Application } = Pixi;
var app = new Application();
var { view, stage, renderer, ticker } = app;

var myCircle = new Graphics()
  .lineStyle(1, 0x00ff00)
  .beginFill(0xff0000)
  .drawCircle(50, 50, 25);

myCircle.alpha = 0.5;

var myRectangle = new Graphics()
    .beginFill(0x00cc00)
    .drawRect(50, 200, 2000, 20);

// Pixi.loader.add('boat', 'bunny.png').load(function(loader, resources) {

let sprite = new PIXI.Sprite.fromImage('./boat-small.png');

sprite.x = 640;

stage.addChild(myCircle);
stage.addChild(myRectangle);
stage.addChild(sprite);

ticker.add(function(t){
    var nextX = stage.x - t;
    stage.setTransform(nextX);
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
