#!/bin/bash
SVGDIR=./svg/

test -d $SVGDIR || mkdir $SVGDIR

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

# generate svg files
cat digit.mpost | sed "s/\(outputtemplate[ ]*:=[ ]*\)\(.*\).mps\(.*\)/\1\2.svg\3/;
                       s/\(outputformat[ ]*:=[ ]*\"\)eps\(.*\)/\1svg\2/;
                       s/\(draft[ ]*:=[ ]*\).*;/\1 0;/" > $SVGDIR/digit.mpost
cd $SVGDIR
rm -rf *.svg
mpost digit.mpost > /dev/null
rm digit.mpost
for f in *.svg; do
    i=$( echo "${f%.svg}" | sed "s/digit-//" )
    mv digit-$i.svg $(format_name $i).svg
done
cd ..


