var Pixi = require("pixi.js");
var config = require("./config");

var { Graphics, Application } = Pixi;

var app = new Application();

var { view, stage, renderer } = app;

var myCircle = new Graphics()
  .lineStyle(1, 0x00ff00)
  .beginFill(0xff0000)
  .drawCircle(50, 50, 25);

myCircle.alpha = 0.5;

stage.addChild(myCircle);

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
