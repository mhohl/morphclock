#!/bin/bash
#
# digits.sh
#

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
       
mpost digit.mpost

echo -n "Generate test file ..."
lualatex testdigit.tex > /dev/null
echo " done."

# generate svg files
echo -n "Generate svg files ..."
cat digit.mpost | sed "s/\(outputtemplate[ ]*:=[ ]*\)\(.*\).mps\(.*\)/\1\2.svg\3/;
                       s/\(outputformat[ ]*:=[ ]*\"\)eps\(.*\)/\1svg\2/;
                       s/\(draft[ ]*:=[ ]*\).*;/\1 0;/" > $SVGDIR/digit.mpost
cd $SVGDIR
mpost digit.mpost > /dev/null
rm digit.mpost
for (( i = 0; i <= 13400; i++ )); do
    if test -e digit-$i.svg ; then
       mv digit-$i.svg $(format_name $i).svg
    fi
done
cd ..
echo " done."

# and collect the path information into a javascript file
echo -n "Collect svg paths (this may take a while) ..."
./extract_paths_to_js.sh svg/*.svg > morphpaths.js
echo " done."

# minify it
echo -n "Minify javascript files ..."
cat morphpaths.js morphclock.js > ___temp.js
curl -X POST -s --data-urlencode 'input@___temp.js' https://javascript-minifier.com/raw > morphclock.min.js
rm ___temp.js
echo " done."
