#!/bin/bash

first=true

version=$( grep Version glyph.log | sed "s/.*\"Version:[ ]*\(.*\)\".*/\1/" )

sortedargs=$( echo $@ | sort )
echo "morphpath = {"
echo "   version: '$version',"
for f in $sortedargs; do
   if [ "$first" ] ; then
      # some leading spaces
      echo -n "  "
      # we get the width and height from the first element,
      # replace '=' by ':', remove the '"' and add a ',' at the end:
      xpath -q -e '//svg/@width'  "$f" | sed "s/=/: /; s/\"//g; s/$/,/"
      echo -n "  "
      xpath -q -e '//svg/@height' "$f" | sed "s/=/: /; s/\"//g; s/$/,/"
      echo -n "  "
      xpath -q -e '//@style'  "$f" | sed "s/.*\(stroke-width\)\([^;]*\);.*/ '\1'\2/; s/$/,/" | uniq
      unset first
   fi
   if [ "$tmp" ]; then
      echo "${tmp%,} ],"
      # remove the last ',' before the closing ']'
   fi
   # we get the paths and feed them in an array [ ... ]
   tmp=$( xpath -q -e '//path/@d' $f | sed "s/d=/  /; s/^/   /; s/$/,/" )
   name=$( basename $f)
   echo "   '${name%.svg}' : ["
done
echo "${tmp%,} ]"

echo "};"
