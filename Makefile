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

.PHONY: test paths min all
test: testdigit.pdf

paths: morphpaths.js

min: morphclock.min.js

all: test min





