'use strict';
let feed = require('./feed');
let socket = require('socket.io-client')('http://192.168.1.192:3000');

function initialize() {
  console.log('Camfeed PI utility started');

}

socket.on('connect', () => {
  socket.emit('connection made', 'Camfeed PI is connected');
  console.log('Connected to API');

  socket.emit('room', '1234');
  socket.on('room', (data) =>{
    console.log(data);
  });
});

initialize();

// feed.initialize();
