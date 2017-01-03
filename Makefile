# Makefile für »digits«
TARGET = digit

SHELL = /bin/bash
.SUFFIXES:
.SUFFIXES: .png .mpost .mps .pdf

# executables
MPEXEC = mpost

${TARGET}-*.mps: ${TARGET}.mpost
	mpost $<

testdigit.pdf: testdigit.tex ${TARGET}-*.mps
	lualatex $<

.PHONY: test png
test: testdigit.pdf






