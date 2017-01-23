var html = require('bel')
var config = require('./config')

console.log(config);

var mybutton = html`
<button>Hello bel</button>
`;

console.log( mybutton);


document.body.appendChild(mybutton);

