'use strict';

const spawn = require('child_process').spawn;

const ffmpeg = spawn('ffmpeg', [
    '-i',
    '-',
    '-f',
    'mpeg1video',
    '-b',
    '400k',
    'http://192.168.1.192:8082/password/340/240/'
]);

const video = spawn('raspivid', [
    '-n',
    '-vf',
    '-hf',
    '-ih',
    '-t',
    '0', 
    '-ISO',
    '800',
    '-ex',
    'night',
    '-w',
    '320',
    '-h',
    '240',
    '-fps', 
    '35', 
    '-b',
    '4000000',
    '-o',
    '-'
]);

video.stdout.on('data', (data) => {
  ffmpeg.stdin.write(data);
});

video.stderr.on('error', (error) => {
  console.log(error);
  return true;
});

ffmpeg.stderr.on('error', (error) => {
  console.log(error);
});

function initialize() {
  console.log(`raspivid started with PID: ${video.pid}`);
}

initialize();
