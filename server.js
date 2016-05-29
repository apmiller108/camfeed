'use strict';

const spawn = require('child_process').spawn;

const ffmpeg = spawn('ffmpeg', [
    '-i',
    '-',
    '-f',
    'mpeg1video',
    '-b',
    '800k',
    '-r',
    '25',
    'http://192.168.1.192:8082/password/640/480/'
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
    '640',
    '-h',
    '480',
    '-fps', 
    '25', 
    '-b',
    '8000000',
    '-o',
    '-'
]);

// video.stdio[0].pipe(ffmpeg);
video.stdout.on('data', (data) => {
  // console.log(data);
  ffmpeg.stdin.write(data);
});

// video.stdout.pipe(ffmpeg.stdin);

video.stderr.on('err', (err) => {
  console.log(err);
});

function initialize() {
  console.log(`raspivid started with PID: ${video.pid}`);
  // console.log(`ffmpeg started with PID: ${ffmpeg.pid}`);
}

initialize();
