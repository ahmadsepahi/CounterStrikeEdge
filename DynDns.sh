#!/bin/bash

File=$1
#or download file from remote server
serversArr=()
cnt=0
while read p; do
  echo "$p"
  serversArr+=($p)
  ((cnt = cnt+1))
done <$File
#echo 'ARRAY'
#for i in "${serversArr[@]}"; do echo "$i"; done

gameServer=0
echo "initial gameServer:${gameServer}"
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
	echo 'linux'
	sudo rm /etc/hosts

	echo "counter: ${cnt}"
	myrand=$(( $RANDOM % $cnt ))
	echo "random: ${myrand}"
	str="${serversArr[$myrand]}"
	echo "Str: ${str}"
	sudo bash -c 'echo -e "'${serversArr[$myrand]}'\tgameserver\n" >> /etc/hosts'
	gameServer=${serversArr[$myrand]}

elif [[ "$OSTYPE" == "darwin"* ]]; then
        # Mac OSX
	echo 'MAC'
	sudo dscacheutil -flushcache
	sudo killall -HUP mDNSResponder
	sudo rm /private/etc/hosts

	echo "counter: ${cnt}"
	myrand=$(( $RANDOM % $cnt ))
	echo "random: ${myrand}"
	str="${serversArr[$myrand]}"
	echo "Str: ${str}"
	sudo bash -c 'echo -e "'${serversArr[$myrand]}'\tgameserver\n" >> /private/etc/hosts'
	gameServer=${serversArr[$myrand]}


#elif [[ "$OSTYPE" == "cygwin" ]]; then
        # POSIX compatibility layer and Linux environment emulation for Windows
#elif [[ "$OSTYPE" == "msys" ]]; then
        # Lightweight shell and GNU utilities compiled for Windows (part of MinGW)
#elif [[ "$OSTYPE" == "win32" ]]; then
        # I'm not sure this can happen.
#elif [[ "$OSTYPE" == "freebsd"* ]]; then
        # ...
else
        # Unknown.
	echo 'others'
fi

echo $gameServer
node dist-server/main.js $gameServer
#sudo dscacheutil -flushcache
#sudo killall -HUP mDNSResponder
#sudo rm /private/etc/hosts

#myrand=$(( $RANDOM % 2 ))
#echo $(( $RANDOM % 10000 ))
#if [ $myrand -eq 0 ]
#then
#	sudo bash -c 'echo -e "127.0.0.1\timtest\n" >> /private/etc/hosts'
#else
#	sudo bash -c 'echo -e "127.0.0.2\timtest\n" >> /private/etc/hosts'
#fi
