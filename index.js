var html = require("bel");
var config = require("./config");

console.log(config);

var mybutton = html`
<canvas style="top:0; left:0; background-color:yellow; height: 100%; width:100%; position: absolute;"></canvas>
`;

console.log(mybutton);

document.body.appendChild(mybutton);
