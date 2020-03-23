#!/bin/bash
SOURCE=glyph.mpost
DEMODIR=./demo/

test -d $DEMODIR || mkdir $DEMODIR

# generate png files
cat $SOURCE | sed "s/\(outputtemplate[ ]*:=[ ]*\)\(.*\).mps\(.*\)/\1\2.png\3/;
                   s/\(outputformat[ ]*:=[ ]*\"\)eps\(.*\)/\1png\2/;
                   s/\(draft[ ]*:=[ ]*\).*;/\1 1;/;
                   s/\(demo[ ]*:=[ ]*\).*;/\1 1;/" > $DEMODIR/$SOURCE
cd $DEMODIR
rm -f ./*.png
rm -f ./*.mp4
mpost $SOURCE > /dev/null
rm $SOURCE

# generate videos
for i in $(seq 50); do
	cp 23-$i.png img-$i.png
done
ffmpeg -framerate 10 -i img-%00d.png -c:v libx264 -profile:v high -crf 20 -pix_fmt yuv420p video_2_to_3_part_1.mp4
rm img-*.png

j=0
for i in $(seq 51 99); do
	cp 23-$i.png img-$j.png
	j=$((j + 1))
done
ffmpeg -framerate 10 -i img-%00d.png -c:v libx264 -profile:v high -crf 20 -pix_fmt yuv420p video_2_to_3_part_2.mp4
rm img-*.png

for i in $(seq 50); do
	cp or-$i.png img-$i.png
done
ffmpeg -framerate 10 -i img-%00d.png -c:v libx264 -profile:v high -crf 20 -pix_fmt yuv420p video_o_to_r_part_1.mp4
rm img-*.png

j=0
for i in $(seq 51 99); do
	cp or-$i.png img-$j.png
	j=$((j + 1))
done
ffmpeg -framerate 10 -i img-%00d.png -c:v libx264 -profile:v high -crf 20 -pix_fmt yuv420p video_o_to_r_part_2.mp4
rm img-*.png

# rename stills
mv 23-0.png  video_2_to_3_still_1.png
mv 23-51.png video_2_to_3_still_2.png
mv or-0.png  video_o_to_r_still_1.png
mv or-51.png video_o_to_r_still_2.png

# cleanup
find . -type f \! -name 'video*' -exec rm {} \;

cd ..
