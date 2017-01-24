var Pixi = require("pixi.js");
var config = require("./config");

var { Graphics, Application } = Pixi;

var app = new Application();
var canvas = app.view;
var stage = app.stage;

var myCircle = new Graphics()
  .lineStyle(1, 0x00ff00)
  .beginFill(0xff0000)
  .drawCircle(50, 50, 25);

myCircle.alpha = 0.5;

stage.addChild(myCircle);

document.body.appendChild(canvas);
