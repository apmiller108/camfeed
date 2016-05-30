'use strict';
let feed = require('./feed');

function initialize() {
  console.log(`raspivid started with PID: ${feed.raspivid.pid}`);
}

initialize();

feed.initialize();
