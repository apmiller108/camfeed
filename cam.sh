raspivid -n -vf -hf -ih -t 0 -ISO 800 -ex night -w 320 -h 240 -fps 35 -b 4000000 -o - | ffmpeg -i - -f mpeg1video -b 400k http://192.168.1.192:8082/password/320/240/
