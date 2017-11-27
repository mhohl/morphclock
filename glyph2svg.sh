#!/bin/bash
SOURCE=glyph.mpost
SVGDIR=./svgglyph/

test -d $SVGDIR || mkdir $SVGDIR

# siehe http://mywiki.wooledge.org/BashFAQ/071
chr () {
  local val
  [ "$1" -lt 256 ] || return 1
  printf -v val %o "$1"; printf "\\$val"
}

function format_name {
   local from
   local to
   local index
   local target
   local i=$1
   if [ $i -lt 100 ]; then
      to=$( chr $(( i + 32 )) )
      target="glyph-${to}"
   else
      from=$( chr $(( i / 10000 + 32 )) )
      i=$(( i % 10000 ))
      to=$( chr $(( i / 100 + 32 )) )
      printf -v index %02d $(( i % 100 ))
      target="glyph-${from}${to}${index}"
   fi
   echo $target
}

# generate svg files
cat $SOURCE | sed "s/\(outputtemplate[ ]*:=[ ]*\)\(.*\).mps\(.*\)/\1\2.svg\3/;
                       s/\(outputformat[ ]*:=[ ]*\"\)eps\(.*\)/\1svg\2/;
                       s/\(draft[ ]*:=[ ]*\).*;/\1 0;/" > $SVGDIR/$SOURCE
cd $SVGDIR
rm -rf *.svg
mpost -numbersystem=double $SOURCE > /dev/null
rm $SOURCE
for f in glyph*.svg; do
    # only files like glyph-*.svg are changed
    i=$( echo "${f%.svg}" | sed "s/glyph-//" )
    mv glyph-$i.svg $(format_name $i).svg
done
cd ..


