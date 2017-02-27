# Makefile für »digits«
TARGET = digit

SHELL = /bin/bash
.SUFFIXES:
.SUFFIXES: .png .mpost .mps .pdf .js

# executables
MPEXEC = mpost

${TARGET}-*.mps: ${TARGET}.mpost
	mpost $<

svg/*.svg: ${TARGET}.mpost
	bash generate_svg.sh

testdigit.pdf: testdigit.tex ${TARGET}-*.mps
	lualatex $<

morphpaths.js: svg/*.svg
	bash extract_paths_to_js.sh $^ > $@

morphclock.min.js: morphpaths.js morphclock.js
	cat $^ > ___temp.js
	curl -X POST -s --data-urlencode 'input@___temp.js' https://javascript-minifier.com/raw > $@
	rm ___temp.js

*.html: morphpaths.js morphclock.js
	sed -i "/last-modified/ s/\(content=\).*\(\"\)/\1\"$(shell date +"%Y-%m-%d@%T %Z" )\2/" $@

.PHONY: test paths min html all install
test: testdigit.pdf

paths: morphpaths.js

min: morphclock.min.js

html: *.html

all: test min html

install:
	bash upload_morph.sh





