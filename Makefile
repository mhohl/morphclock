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
	lualatex $< > /dev/null

morphpaths.js: svg/*.svg
	bash extract_paths_to_js.sh $^ > $@

morphclock.min.js: morphpaths.js morphclock.js
	uglifyjs $^ > $@

.PHONY: test paths min all
test: testglyph.pdf

paths: morphpaths.js

min: morphclock.min.js

all: test min
