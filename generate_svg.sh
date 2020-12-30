#!/bin/bash
SOURCE=glyph.mpost
SVGDIR=./svg/

test -d $SVGDIR || mkdir $SVGDIR

# generate svg files
cat $SOURCE | sed "s/\(outputtemplate[ ]*:=[ ]*\)\(.*\).mps\(.*\)/\1\2.svg\3/;
                   s/\(outputformat[ ]*:=[ ]*\"\)eps\(.*\)/\1svg\2/;
                   s/\(draft[ ]*:=[ ]*\).*;/\1 0;/" > $SVGDIR/$SOURCE
cd $SVGDIR
rm -f ./*.svg
mpost $SOURCE > /dev/null
rm $SOURCE
cd ..
