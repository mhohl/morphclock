#!/bin/bash
#
# digits.sh
#
from=${1-0}
to=${2-999}
mpost digit.mpost

for (( i = from; i <= to; i++ )); do
   picfile="000$i"
   picfile="pic${picfile:(-3)}.png"
   test -e digit-$i.mps && convert digit-$i.mps -background white -alpha remove $picfile && echo $picfile
done

# animate pic*.png &
