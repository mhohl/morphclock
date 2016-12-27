#!/bin/bash
#
# digits.sh
#
from=${1-0}
to=${2-9999}
mpost digit.mpost

lualatex testdigit.tex #> /dev/null

for (( i = from; i <= to; i++ )); do
   picfile="0000$i"
   picfile="pic${picfile:(-4)}.png"
   test -e digit-$i.mps && convert digit-$i.mps -background white -alpha remove $picfile && echo $picfile
done

# animate pic*.png &
