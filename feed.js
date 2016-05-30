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

const raspivid = spawn('raspivid', [
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

let feed = {

  raspivid: raspivid,
  ffmpeg: ffmpeg,
  initialize: () => {

    feed.raspivid.stdout.on('data', (data) => {
      feed.ffmpeg.stdin.write(data);
    });

    feed.raspivid.stderr.on('error', (error) => {
      console.log(error);
      return true;
    });

    feed.ffmpeg.stderr.on('error', (error) => {
      console.log(error);
    });
  }
};

module.exports = feed;
