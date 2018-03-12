# Makefile für »morphclock«
TARGET = glyph

SHELL = /bin/bash
.SUFFIXES:
.SUFFIXES: .png .mpost .mps .pdf .js

# executables
MPEXEC = mpost
MPOPTS = "-numbersystem=double"

${TARGET}-*.mps: ${TARGET}.mpost
	@rm -f ${TARGET}-*.mps
	${MPEXEC} ${MPOPTS} $<

svg/*.svg: ${TARGET}.mpost
	bash generate_svg.sh

testglyph.pdf: testglyph.tex ${TARGET}-*.mps
	while lualatex $< > /dev/null ; grep -q "Rerun to" $(<:.tex=.log) ; do : ; done

morphpaths.js: svg/*.svg extract_paths.js
	node extract_paths.js > $@
# hier wurde vorher
# bash extract_paths_to_js.sh $^ > $@
# aufgerufen

morphclock.min.js: morphpaths.js morphclock.js
	uglifyjs $^ > $@

.PHONY: test paths min all
test: testglyph.pdf

paths: morphpaths.js

min: morphclock.min.js

all: test min
