#!/bin/bash
#
# digits.sh
#

mpost digit.mpost

for (( i = 0; i < 999; i++ )); do
   picfile="000$i"
   picfile="pic${picfile:(-3)}.png"
   test -e digit.$i && convert digit.$i -background white -alpha remove $picfile && echo $picfile
done

animate pic*.png &
