const appScript = require('./dist/manifest.json')['app.js'];
const found = appScript.match(/^app\.([a-f,0-9]+)\.js/);

console.log(found ? found[1] : 'undefined');
