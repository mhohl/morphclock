#!/bin/bash
#
# digits.sh
#
from=${1-0}
to=${2-9999}
mpost digit.mpost

lualatex testdigit.tex > /dev/null

for (( i = from; i <= to; i++ )); do
   picfile="0000$i"
   picfile="${picfile:(-4)}"
   picfile="md-${picfile:0:2}-${picfile:2:2}.png"
   test -e digit-$i.mps && convert digit-$i.mps $picfile && echo $picfile
done

echo -n "Animationen abspielen? "
read -n1 jn;

if [ "$jn" == "j" ]; then
   animate -dispose previous md-01-*.png md-10-*.png &
   animate -dispose previous md-12-*.png md-21-*.png &
   animate -dispose previous md-01-*.png md-12-*.png \
                             md-20-*.png &
   animate -dispose previous md-01-*.png md-12-*.png \
                             md-23-*.png md-30-*.png &
   animate -dispose previous md-01-*.png md-12-*.png \
                             md-23-*.png md-34-*.png \
                             md-45-*.png md-50-*.png &
   animate -dispose previous md-01-*.png md-12-*.png \
                             md-23-*.png md-34-*.png \
                             md-45-*.png md-56-*.png \
                             md-67-*.png md-78-*.png \
                             md-89-*.png md-90-*.png &
else
   echo
fi
