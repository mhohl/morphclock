#!/bin/bash
#
# digits.sh
#
from=${1-0}
to=${2-9999}

SVGDIR=./svg/
PNGDIR=./png/

test -d $SVGDIR || mkdir $SVGDIR
test -d $PNGDIR || mkdir $PNGDIR

indexarray=( "a" "p" "m" ":" )


function format_name {
   local target
   local i=$1
   if (( $i < 10000 )); then
      target="0000$i"
      target="${target:(-4)}"
      target="md-${target:0:2}-${target:2:2}"         
   else
      index_f="${i:1:1}"
      index_t="${i:2:1}"
      index_nn="${i:(-2)}"
      target="md-${indexarray[index_f]}${indexarray[index_t]}-${index_nn}"
   fi
   echo $target
}
       
mpost digit.mpost

lualatex testdigit.tex > /dev/null

# svg-Handling
cat digit.mpost | sed "s/\(outputtemplate[ ]*:=[ ]*\)\(.*\).mps\(.*\)/\1\2.svg\3/;
                       s/\(outputformat[ ]*:=[ ]*\"\)eps\(.*\)/\1svg\2/;
                       s/\(draft[ ]*:=[ ]*\).*;/\1 0;/" > $SVGDIR/digit.mpost
cd $SVGDIR
mpost digit.mpost
rm digit.mpost
for (( i = 0; i <= 13400; i++ )); do
    if test -e digit-$i.svg ; then
       mv digit-$i.svg $(format_name $i).svg
    fi
done
cd ..



for (( i = from; i <= to; i++ )); do
    if test -e digit-$i.mps ; then
       convert digit-$i.mps $PNGDIR/$(format_name $i).png
       echo $(format_name $i).png
    fi
done

echo -n "Animationen abspielen? "
#read -n1 jn;
jn="n"
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
