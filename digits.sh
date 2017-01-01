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
   picfile="pic${picfile:(-4)}.png"
   test -e digit-$i.mps && convert digit-$i.mps -background white -alpha remove $picfile && echo $picfile
done

echo -n "Animationen abspielen? "
read -n1 jn;

if [ "$jn" != "n" ]; then
   animate pic01*.png pic10*.png &
   animate pic01*.png pic12*.png pic20*.png &
   animate pic01*.png pic12*.png pic23*.png pic30*.png &
   animate pic01*.png pic12*.png pic23*.png pic34*.png pic45*.png pic50*.png &
   animate pic01*.png pic12*.png pic23*.png pic34*.png pic45*.png pic56*.png pic67*.png pic78*.png pic89*.png pic90*.png &
fi
