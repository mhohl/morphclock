# Makefile für »digits«
TARGET = digit

SHELL = /bin/bash
.SUFFIXES:
.SUFFIXES: .png .mpost .[0-9]

# executables
MPEXEC = mpost

${TARGET}.0: ${TARGET}.mpost
	mpost $<


.PHONY : png
png : ${TARGET}.0
	for (( i = 0; i < 999; i++ )); do picfile="000$$i"; picfile="pic$${picfile:(-3)}.png"; test -e digit.$$i && convert digit.$$i -background white -alpha remove $$picfile ; done
