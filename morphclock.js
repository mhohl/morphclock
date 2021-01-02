/*
 * morphclock.js
 * © 2018-2020 Marc Hohl
 */
"use strict";
// the svg namespace:
Morph.xmlns = "http://www.w3.org/2000/svg";
/* Morph.data defines the structure of all shown morph types:
 *   'glyph' is a predefined placeholder for the actual glyph
 *    'slot' indicates type and position of the glyph:
 *           x indicates the actual position of the current slot relative
 *             to other slots of the same type,
 *             i.e. mx holds the "2" and xm holds the "3" of minute 23
 *           s seconds
 *           m minutes
 *           h hours
 *           c colon
 *           d day time (am/pm)
 *           D day (numeric)
 *           M month two-figure: numeric, three-figure: abbreviation
 *           Y Year
 *           W weekday
 * 'overlap' signals the overlap between the actual glyph and the preceding
 *           glyph; punctiation symbols and digits following these are placed
 *           with a bigger overlap. The overlap amount is defined in
 *           MorphDisplay.bigOverlap and .smallOverlap, respectively.
 *           Ann. 2020-12-25: hard-coding these values is actually much more
 *           reliable than trying to expand the fancy algorithm for the timer
 *           option.
 *
 * The 'default' entry contains default format options for clock, timer, date
 * and logo types.
 */
Morph.data = {
    default: {
        clock: 'hhmmss24',
        date: 'D.M.Y',
        logo: 'default',
        timer: 'auto',
    },
    clock: {
        hhmmss24: [{
            glyph: '20-0',
            slot: 'hx',
            overlap: null
        }, {
            glyph: '30-0',
            slot: 'xh',
            overlap: 'small'
        }, {
            glyph: '::-0',
            slot: 'cx',
            overlap: 'big'
        }, {
            glyph: '50-0',
            slot: 'mx',
            overlap: 'big'
        }, {
            glyph: '90-0',
            slot: 'xm',
            overlap: 'small'
        }, {
            glyph: '::-0',
            slot: 'xc',
            overlap: 'big'
        }, {
            glyph: '50-0',
            slot: 'sx',
            overlap: 'big'
        }, {
            glyph: '90-0',
            slot: 'xs',
            overlap: 'small'
        }],
        hhmm24: [{
            glyph: '20-0',
            slot: 'hx',
            overlap: null
        }, {
            glyph: '30-0',
            slot: 'xh',
            overlap: 'small'
        }, {
            glyph: '::-0',
            slot: 'xc',
            overlap: 'big'
        }, {
            glyph: '50-0',
            slot: 'mx',
            overlap: 'big'
        }, {
            glyph: '90-0',
            slot: 'xm',
            overlap: 'small'
        }, ],
        hhmmss12: [{
            glyph: '10-0',
            slot: 'hx',
            overlap: null
        }, {
            glyph: '21-0',
            slot: 'xh',
            overlap: 'small'
        }, {
            glyph: '::-0',
            slot: 'cx',
            overlap: 'big'
        }, {
            glyph: '50-0',
            slot: 'mx',
            overlap: 'big'
        }, {
            glyph: '90-0',
            slot: 'xm',
            overlap: 'small'
        }, {
            glyph: '::-0',
            slot: 'xc',
            overlap: 'big'
        }, {
            glyph: '50-0',
            slot: 'sx',
            overlap: 'big'
        }, {
            glyph: '90-0',
            slot: 'xs',
            overlap: 'small'
        }, {
            glyph: '~',
            slot: null,
            overlap: 'big'
        }, {
            glyph: 'ap-0',
            slot: 'dx',
            overlap: 'big'
        }, {
            glyph: 'mm-0',
            slot: 'xd',
            overlap: 'small'
        }],
        hhmm12: [{
            glyph: '10-0',
            slot: 'hx',
            overlap: null
        }, {
            glyph: '21-0',
            slot: 'xh',
            overlap: 'small'
        }, {
            glyph: '::-0',
            slot: 'xc',
            overlap: 'big'
        }, {
            glyph: '50-0',
            slot: 'mx',
            overlap: 'big'
        }, {
            glyph: '90-0',
            slot: 'xm',
            overlap: 'small'
        }, {
            glyph: '~',
            slot: null,
            overlap: 'big'
        }, {
            glyph: 'ap-0',
            slot: 'dx',
            overlap: 'big'
        }, {
            glyph: 'mm-0',
            slot: 'xd',
            overlap: 'small'
        }],
    },
    date: {
        'D/M/Y': [{
            glyph: '30-0',
            slot: 'Dx',
            overlap: null
        }, {
            glyph: '11-0',
            slot: 'xD',
            overlap: 'small'
        }, {
            glyph: '/',
            slot: null,
            overlap: 'big'
        }, {
            glyph: '10-0',
            slot: 'Mx',
            overlap: 'big'
        }, {
            glyph: '21-0',
            slot: 'xM',
            overlap: 'small'
        }, {
            glyph: '/',
            slot: null,
            overlap: 'big'
        }, {
            glyph: '12-0',
            slot: 'Yxxx',
            overlap: 'big'
        }, {
            glyph: '90-0',
            slot: 'xYxx',
            overlap: 'small'
        }, {
            glyph: '90-0',
            slot: 'xxYx',
            overlap: 'small'
        }, {
            glyph: '90-0',
            slot: 'xxxY',
            overlap: 'small'
        }, ],
        'D.M.Y': [{
            glyph: '30-0',
            slot: 'Dx',
            overlap: null
        }, {
            glyph: '11-0',
            slot: 'xD',
            overlap: 'small'
        }, {
            glyph: '.',
            slot: null,
            overlap: 'big'
        }, {
            glyph: '10-0',
            slot: 'Mx',
            overlap: 'big'
        }, {
            glyph: '21-0',
            slot: 'xM',
            overlap: 'small'
        }, {
            glyph: '.',
            slot: null,
            overlap: 'big'
        }, {
            glyph: '12-0',
            slot: 'Yxxx',
            overlap: 'big'
        }, {
            glyph: '90-0',
            slot: 'xYxx',
            overlap: 'small'
        }, {
            glyph: '90-0',
            slot: 'xxYx',
            overlap: 'small'
        }, {
            glyph: '90-0',
            slot: 'xxxY',
            overlap: 'small'
        }, ],
        'D-M-Y': [{
            glyph: '30-0',
            slot: 'Dx',
            overlap: null
        }, {
            glyph: '11-0',
            slot: 'xD',
            overlap: 'small'
        }, {
            glyph: '-',
            slot: null,
            overlap: 'big'
        }, {
            glyph: '10-0',
            slot: 'Mx',
            overlap: 'big'
        }, {
            glyph: '21-0',
            slot: 'xM',
            overlap: 'small'
        }, {
            glyph: '-',
            slot: null,
            overlap: 'big'
        }, {
            glyph: '12-0',
            slot: 'Yxxx',
            overlap: 'big'
        }, {
            glyph: '90-0',
            slot: 'xYxx',
            overlap: 'small'
        }, {
            glyph: '90-0',
            slot: 'xxYx',
            overlap: 'small'
        }, {
            glyph: '90-0',
            slot: 'xxxY',
            overlap: 'small'
        }, ],
        'Y/M/D': [{
            glyph: '12-0',
            slot: 'Yxxx',
            overlap: null
        }, {
            glyph: '90-0',
            slot: 'xYxx',
            overlap: 'small'
        }, {
            glyph: '90-0',
            slot: 'xxYx',
            overlap: 'small'
        }, {
            glyph: '90-0',
            slot: 'xxxY',
            overlap: 'small'
        }, {
            glyph: '/',
            slot: null,
            overlap: 'big'
        }, {
            glyph: '10-0',
            slot: 'Mx',
            overlap: 'big'
        }, {
            glyph: '21-0',
            slot: 'xM',
            overlap: 'small'
        }, {
            glyph: '/',
            slot: null,
            overlap: 'big'
        }, {
            glyph: '30-0',
            slot: 'Dx',
            overlap: 'big'
        }, {
            glyph: '11-0',
            slot: 'xD',
            overlap: 'small'
        }],
        'Y-M-D': [{
            glyph: '12-0',
            slot: 'Yxxx',
            overlap: null
        }, {
            glyph: '90-0',
            slot: 'xYxx',
            overlap: 'small'
        }, {
            glyph: '90-0',
            slot: 'xxYx',
            overlap: 'small'
        }, {
            glyph: '90-0',
            slot: 'xxxY',
            overlap: 'small'
        }, {
            glyph: '-',
            slot: null,
            overlap: 'big'
        }, {
            glyph: '10-0',
            slot: 'Mx',
            overlap: 'big'
        }, {
            glyph: '21-0',
            slot: 'xM',
            overlap: 'small'
        }, {
            glyph: '-',
            slot: null,
            overlap: 'big'
        }, {
            glyph: '30-0',
            slot: 'Dx',
            overlap: 'big'
        }, {
            glyph: '11-0',
            slot: 'xD',
            overlap: 'small'
        }],
        'Month D,Y': [{
            glyph: 'dj-0',
            slot: 'Mxx',
            overlap: null
        }, {
            glyph: 'ea-0',
            slot: 'xMx',
            overlap: 'small'
        }, {
            glyph: 'cn-0',
            slot: 'xxM',
            overlap: 'small'
        }, {
            glyph: '~',
            slot: null,
            overlap: 'big'
        }, {
            glyph: '30-0',
            slot: 'Dx',
            overlap: 'big'
        }, {
            glyph: '11-0',
            slot: 'xD',
            overlap: 'small'
        }, {
            glyph: ',',
            slot: null,
            overlap: 'big'
        }, {
            glyph: '12-0',
            slot: 'Yxxx',
            overlap: 'big'
        }, {
            glyph: '90-0',
            slot: 'xYxx',
            overlap: 'small'
        }, {
            glyph: '90-0',
            slot: 'xxYx',
            overlap: 'small'
        }, {
            glyph: '90-0',
            slot: 'xxxY',
            overlap: 'small'
        }, ],
        'full': [{
            glyph: 'fs-0',
            slot: 'Wxx',
            overlap: null
        }, {
            glyph: 'ra-0',
            slot: 'xWx',
            overlap: 'small'
        }, {
            glyph: 'it-0',
            slot: 'xxW',
            overlap: 'small'
        }, {
            glyph: ',',
            slot: null,
            overlap: 'big'
        }, {
            glyph: 'dj-0',
            slot: 'Mxx',
            overlap: 'big'
        }, {
            glyph: 'ea-0',
            slot: 'xMx',
            overlap: 'small'
        }, {
            glyph: 'cn-0',
            slot: 'xxM',
            overlap: 'small'
        }, {
            glyph: '~',
            slot: null,
            overlap: 'big'
        }, {
            glyph: '30-0',
            slot: 'Dx',
            overlap: 'big'
        }, {
            glyph: '11-0',
            slot: 'xD',
            overlap: 'small'
        }, {
            glyph: ',',
            slot: null,
            overlap: 'big'
        }, {
            glyph: '12-0',
            slot: 'Yxxx',
            overlap: 'big'
        }, {
            glyph: '90-0',
            slot: 'xYxx',
            overlap: 'small'
        }, {
            glyph: '90-0',
            slot: 'xxYx',
            overlap: 'small'
        }, {
            glyph: '90-0',
            slot: 'xxxY',
            overlap: 'small'
        }, ],
        'full-de': [{
                glyph: 'fs-0',
                slot: 'Wxx',
                overlap: null
            }, {
                glyph: 'ra-0',
                slot: 'xWx',
                overlap: 'small'
            }, {
                glyph: '.',
                slot: null,
                overlap: 'big'
            }, {
                glyph: ',',
                slot: null,
                overlap: 'big'
            }, {
                glyph: '30-0',
                slot: 'Dx',
                overlap: 'big'
            }, {
                glyph: '11-0',
                slot: 'xD',
                overlap: 'small'
            }, {
                glyph: '.',
                slot: null,
                overlap: 'big'
            }, {
                glyph: 'dj-0',
                slot: 'Mxx',
                overlap: 'big'
            }, {
                glyph: 'ea-0',
                slot: 'xMx',
                overlap: 'small'
            }, {
                glyph: 'zn-0',
                slot: 'xxM',
                overlap: 'small'
            }, {
                glyph: '.',
                slot: 'M!=5',
                overlap: 'small'
            }, // no dot after "Mai"
            {
                glyph: '12-0',
                slot: 'Yxxx',
                overlap: 'small'
            }, {
                glyph: '90-0',
                slot: 'xYxx',
                overlap: 'small'
            }, {
                glyph: '90-0',
                slot: 'xxYx',
                overlap: 'small'
            }, {
                glyph: '90-0',
                slot: 'xxxY',
                overlap: 'small'
            },
        ],
    },
    logo: {
        default: [{
            glyph: 'm',
            slot: null,
            overlap: null
        }, {
            glyph: 'o',
            slot: null,
            overlap: 'small'
        }, {
            glyph: 'r',
            slot: null,
            overlap: 'small'
        }, {
            glyph: 'p',
            slot: null,
            overlap: 'small'
        }, {
            glyph: 'h',
            slot: null,
            overlap: 'small'
        }, {
            glyph: 'c',
            slot: null,
            overlap: 'small'
        }, {
            glyph: 'l',
            slot: null,
            overlap: 'small'
        }, {
            glyph: 'clock-0',
            slot: 'clock',
            overlap: 'small'
        }, {
            glyph: 'c',
            slot: null,
            overlap: 'small'
        }, {
            glyph: 'k',
            slot: null,
            overlap: 'small'
        }]
    },
    timer: {
        'ss': [{
            glyph: '05-0',
            slot: 'sx',
            overlap: null
        }, {
            glyph: '09-0',
            slot: 'xs',
            overlap: 'small'
        }, ],
        'mss': [{
            glyph: '09-0',
            slot: null,
            overlap: 'small'
        }, {
            glyph: '::-0',
            slot: 'xc',
            overlap: 'big'
        }, {
            glyph: '05-0',
            slot: 'sx',
            overlap: 'big'
        }, {
            glyph: '09-0',
            slot: 'xs',
            overlap: 'small'
        }, ],
        'mmss': [{
            glyph: '05-0',
            slot: 'mx',
            overlap: null
        }, {
            glyph: '09-0',
            slot: 'xm',
            overlap: 'small'
        }, {
            glyph: '::-0',
            slot: 'xc',
            overlap: 'big'
        }, {
            glyph: '05-0',
            slot: 'sx',
            overlap: 'big'
        }, {
            glyph: '09-0',
            slot: 'xs',
            overlap: 'small'
        }, ],
        'hmmss': [{
            glyph: '09-0',
            slot: 'xh',
            overlap: null
        }, {
            glyph: '::-0',
            slot: 'cx',
            overlap: 'big'
        }, {
            glyph: '05-0',
            slot: 'mx',
            overlap: 'big'
        }, {
            glyph: '09-0',
            slot: 'xm',
            overlap: 'small'
        }, {
            glyph: '::-0',
            slot: 'c',
            overlap: 'big'
        }, {
            glyph: '05-0',
            slot: 'sx',
            overlap: 'big'
        }, {
            glyph: '09-0',
            slot: 'xs',
            overlap: 'small'
        }, ],
        'hhmmss': [{
            glyph: '02-0',
            slot: 'hx',
            overlap: null
        }, {
            glyph: '03-0',
            slot: 'xh',
            overlap: 'small'
        }, {
            glyph: '::-0',
            slot: 'cx',
            overlap: 'big'
        }, {
            glyph: '05-0',
            slot: 'mx',
            overlap: 'big'
        }, {
            glyph: '09-0',
            slot: 'xm',
            overlap: 'small'
        }, {
            glyph: '::-0',
            slot: 'xc',
            overlap: 'big'
        }, {
            glyph: '05-0',
            slot: 'sx',
            overlap: 'big'
        }, {
            glyph: '09-0',
            slot: 'xs',
            overlap: 'small'
        }, ],
        'dhhmmss': [{
            glyph: '09-0',
            slot: 'xxd',
            overlap: null
        }, {
            glyph: '::-0',
            slot: 'cxx',
            overlap: 'big'
        }, {
            glyph: '02-0',
            slot: 'hx',
            overlap: 'big'
        }, {
            glyph: '03-0',
            slot: 'xh',
            overlap: 'small'
        }, {
            glyph: '::-0',
            slot: 'xcx',
            overlap: 'big'
        }, {
            glyph: '05-0',
            slot: 'mx',
            overlap: 'big'
        }, {
            glyph: '09-0',
            slot: 'xm',
            overlap: 'small'
        }, {
            glyph: '::-0',
            slot: 'xxc',
            overlap: 'big'
        }, {
            glyph: '05-0',
            slot: 'sx',
            overlap: 'big'
        }, {
            glyph: '09-0',
            slot: 'xs',
            overlap: 'small'
        }, ],
        'ddhhmmss': [{
            glyph: '09-0',
            slot: 'xdx',
            overlap: null
        }, {
            glyph: '09-0',
            slot: 'xxd',
            overlap: 'small'
        }, {
            glyph: '::-0',
            slot: 'cxx',
            overlap: 'big'
        }, {
            glyph: '02-0',
            slot: 'hx',
            overlap: 'big'
        }, {
            glyph: '03-0',
            slot: 'xh',
            overlap: 'small'
        }, {
            glyph: '::-0',
            slot: 'xcx',
            overlap: 'big'
        }, {
            glyph: '05-0',
            slot: 'mx',
            overlap: 'big'
        }, {
            glyph: '09-0',
            slot: 'xm',
            overlap: 'small'
        }, {
            glyph: '::-0',
            slot: 'xxc',
            overlap: 'big'
        }, {
            glyph: '05-0',
            slot: 'sx',
            overlap: 'big'
        }, {
            glyph: '09-0',
            slot: 'xs',
            overlap: 'small'
        }, ],
        'dddhhmmss': [{
            glyph: '09-0',
            slot: 'dxx',
            overlap: null
        }, {
            glyph: '09-0',
            slot: 'xdx',
            overlap: 'small'
        }, {
            glyph: '09-0',
            slot: 'xxd',
            overlap: 'small'
        }, {
            glyph: '::-0',
            slot: 'cxx',
            overlap: 'big'
        }, {
            glyph: '02-0',
            slot: 'hx',
            overlap: 'big'
        }, {
            glyph: '03-0',
            slot: 'xh',
            overlap: 'small'
        }, {
            glyph: '::-0',
            slot: 'xcx',
            overlap: 'big'
        }, {
            glyph: '05-0',
            slot: 'mx',
            overlap: 'big'
        }, {
            glyph: '09-0',
            slot: 'xm',
            overlap: 'small'
        }, {
            glyph: '::-0',
            slot: 'xxc',
            overlap: 'big'
        }, {
            glyph: '05-0',
            slot: 'sx',
            overlap: 'big'
        }, {
            glyph: '09-0',
            slot: 'xs',
            overlap: 'small'
        }, ],
    },
};
/* Morph.io provides the interface to the time server of the PTB activated by
 * loading morph-ptb.js. Here, we use dummy values:
 */
Morph.io = {
    leap: 0,
    connected: function(c) {
        return false;
    }
};
/**
 * the MorphDisplay class
 * @param type sets the type (clock, date, logo, timer),
 * @param container HTML element or element id containing the glyphs
 * @param args covers the remaining arguments. The API structure for
 * the derived classes is as follows:
 * MorphClock(container, format, options)
 * MorphDate(container, format, options)
 * MorphLogo(container, format, options)
 * MorphTimer(container, starttime, format, options)
 * Since the most important argument (after the container) is the format
 * in the first three cases, but the starttime (normally with format == 'auto')
 * in the last case, we use the rest operator and set the index accordingly.
 */
class MorphDisplay {
    constructor(type, container, ...args) {
        this.type = type;
        if (['clock', 'date', 'logo', 'timer'].indexOf(this.type) == -1) {
            return;
        }
        this.container = typeof container === 'string' ? document.getElementById(container) : container;
        if (!container) {
            return;
        }
        var formatIndex, optionIndex;
        if (this.type == 'timer') {
            formatIndex = 1;
            optionIndex = 2;
            this.startTime = args[0] || "00:00:00";
        } else {
            formatIndex = 0;
            optionIndex = 1;
            this.startTime = null;
        }
        this.glyphs = [];
        this.slots = [];
        this.options = args[optionIndex] || {};
        this.slowMorphStart = this.options.slowMorphStart || 57;
        this.colonAnimate = this.options.colonAnimate === false ? false : true;
        this.colonPhaseShift = this.options.colonPhaseShift === false ? false : true;
        // amount of overlap: small between digits, big for punctuation
        this.smallOverlap = this.options.smallOverlap || 0.225;
        this.bigOverlap = this.options.bigOverlap || 2 * this.smallOverlap;
        // apply format settings and start the update cycle
        this.applyFormat(args[formatIndex]);
        this.launch();
    }
    get format() {
        return this._format;
    }
    set format(format) {
        this.applyFormat(format);
        this.colonPhaseShiftAmount = this.calcColonPhaseShiftAmount();
    }
    get charWidth() {
        let data = this.data;
        let num_chars = data.length;
        // number of [s]mall/[b]ig overlaps
        let num_s = data.filter(x => x.overlap == 'small').length;
        let num_b = data.filter(x => x.overlap == 'big').length;
        return 100 / (num_chars - num_s * this.smallOverlap - num_b * this.bigOverlap);
    }
    get charPos() {
        let positions = [];
        let pos = 0;
        let width = this.charWidth;
        let data = this.data;
        data.forEach(d => {
            if (d.overlap == 'big') {
                pos += width * (1 - this.bigOverlap);
            } else if (d.overlap == 'small') {
                pos += width * (1 - this.smallOverlap);
            } else {
                pos += 0;
            }
            positions.push(pos);
        });
        return positions;
    }
    get height() {
        let children = this.container.children;
        if (children.length > 0) return children[0].getBoundingClientRect().height;
        return 0;
    }
    createGlyphs = () => {
        let width = this.charWidth;
        let xpos = this.charPos;
        let data = this.data;
        data.forEach(d => {
            let newglyph = new MorphGlyph(d.glyph, this.container, width + "%", xpos.shift() + "%");
            let slot = d.slot || d.glyph;
            // d.slot is null in case of unchanged glyps; we want a better class name
            newglyph.svg.setAttribute('class', this.type + "-" + this.format + "-" + slot);
            this.glyphs.push(newglyph);
            this.slots.push(slot);
        });
        // set height of container:
        this.container.style.height = this.height + "px";
    }
    applyColonPhaseShift = (index, unshifted) => {
        if (this.colonPhaseShift) {
            return (unshifted + index * this.colonPhaseShiftAmount) % 100;
        } else {
            //console.log('phaseshift inactive', index, unshifted);
            return unshifted;
        }
    }
    applyFormat = (format) => {
        this._format = format || Morph.data.default[this.type];
        this.isAutoFormat = false;
        if (this._format == "auto" && this.type == "timer") {
            this.isAutoFormat = true;
            this._format = this.timerAutoFormat(this.startTime || "00:00:00");
        }
        this.data = Morph.data[this.type][this._format];
        this.glyphs.forEach(g => g.clear());
        this.glyphs = [];
        this.slots = [];
        this.createGlyphs();
        // the colonPhaseShiftAmount depends on the format and is updated here
        this.colonPhaseShiftAmount = this.calcColonPhaseShiftAmount();
    }
    calcColonPhaseShiftAmount = () => {
        let num_colons = this.slots.filter(x => x.indexOf('c') > -1).length;
        if (num_colons == 0) {
            return 0;
        } else {
            return Math.floor(100 / num_colons);
        }
    }
    /* The following function uses the given starting time (for example 1:10:30:15)
     * splits them in single characters and reverses them:
     * '5', '1', ':', '0', '3', ':', '0', '1', ':', '1'
     * the digits were replaced by the current placeholder; a colon switches
     * to the next placeholder and is not inserted:
     * 's', 's', 'm', 'm', 'h', 'h', , 'd'
     * Reversing and joining them results in the format string: dhhmmss.
     *
     * ann 2021-01-01: only used in class MorphTimer, but has to be defined
     * here, because the super constructor calls applyFormat() before the
     * following methods are defined?
     */
    timerAutoFormat = arg => {
        var placeholder = ['s', 'm', 'h', 'd'];
        var colons = 0;
        return arg.split('').reverse().map(x => {
            if (x == ':') {
                colons++;
                return '';
            } else if ('0123456789'.includes(x)) {
                return placeholder[colons];
            }
            return x;
        }).reverse().join('');
    }
    quickMorph = now => Math.floor(now.milliseconds / 10);
    slowMorph = now => {
        let start = this.slowMorphStart;
        return Math.floor((((now.seconds + now.milliseconds / 1000) - start) * 100) / (60 - start));
    }
    addNextDigit = x => {
        var res = x * 11 + 1; //(x * 10 + x + 1);
        return res < 10 ? "0" + res : res;
    }
    launch = () => {
        var now = new MorphInternalTimeDate();
        this.update(now);
        window.requestAnimationFrame(this.launch);
    }
    update = now => {};
}
// extended Classes
class MorphClock extends MorphDisplay {
    constructor(container, format, options) {
        super('clock', container, format, options);
    }
    get showDaytime() {
        return (this.format.indexOf("12") > -1);
    }
    get showSeconds() {
        return (this.format.indexOf("ss") > -1);
    }
    update = now => {
        let h = now.hours;
        let m = now.minutes;
        let s = now.seconds;
        let main = {},
            morph = {};
        // midnight is 12:00pm in 12h-mode
        if (this.showDaytime) {
            main['xd'] = 'mm';
            if (h == 0) {
                h = 12;
                main['dx'] = 'pa';
            } else if (h >= 1 && h <= 12) {
                main['dx'] = 'ap';
            } else if (h > 12) {
                h = h - 12;
                main['dx'] = 'pa';
            }
        }
        let hx = Math.floor(h / 10); // tens
        let xh = h % 10; // unit position
        let mx = Math.floor(m / 10);
        let xm = m % 10;
        let sx = Math.floor(s / 10);
        let xs = s % 10;
        let maxh = this.format.slice(-2); // 12h or 24h?
        maxh = (maxh == 24 ? 23 : maxh);
        let maxhx = Math.floor(maxh / 10); // max value of hx
        main['xc'] = '::';
        main['cx'] = '::';
        let slow_morph = (s >= this.slowMorphStart);
        // seconds
        if (
            (sx == 5 && !now.transition['59->60']) || sx == 6) {
            // no positive leap second, therefore 5 -> 0, or
            // during positive leap second 6 -> 0
            main['sx'] = sx + "0";
            if (slow_morph) {
                morph['xm'] = this.slowMorph(now);
            }
        } else {
            main['sx'] = this.addNextDigit(sx);
        }
        morph['xs'] = this.quickMorph(now);
        if (xs == 9 || (xs == 0 && s == 60) || (xs == 8 && now.transition['58->00'])) {
            main['xs'] = xs + "0";
            morph['sx'] = morph['xs'];
        } else {
            main['xs'] = this.addNextDigit(xs);
        }
        if (this.colonAnimate) {
            // we start with the rightmost colon to be in sync with the seconds
            ['xc', 'cx'].forEach((val, key) => morph[val] = this.applyColonPhaseShift(key, morph['xs']));
        }
        // minutes
        slow_morph = slow_morph && (sx == 5);
        if (xm == 9) {
            main['xm'] = xm + "0";
            if (slow_morph) {
                morph['mx'] = this.slowMorph(now);
            }
        } else {
            main['xm'] = this.addNextDigit(xm);
        }
        slow_morph = slow_morph && (xm == 9);
        if (mx == 5) {
            main['mx'] = mx + "0";
            if (slow_morph) {
                morph['xh'] = this.slowMorph(now);
            }
        } else {
            main['mx'] = this.addNextDigit(mx);
        }
        slow_morph = slow_morph && (mx == 5);
        // hours
        if (h == maxh || xh == 9) {
            if (h == maxh && this.showDaytime) {
                // transition "12" -> "01"
                main['xh'] = xh + "1";
            } else {
                main['xh'] = xh + "0";
            }
            if (slow_morph) {
                morph['hx'] = this.slowMorph(now);
                if (h == maxh) {
                    morph['dx'] = morph['hx'];
                    morph['xd'] = morph['hx'];
                }
            }
        } else if (now.transition['1->2a']) {
            main['xh'] = "12a";
        } else if (now.transition['2a->2b']) {
            main['xh'] = "2a2b";
        } else if (now.transition['2b->3']) {
            main['xh'] = "2b3";
        } else if (now.transition['1->3']) {
            main['xh'] = "13";
        } else {
            main['xh'] = this.addNextDigit(xh);
        }
        if (hx == maxhx) {
            main['hx'] = hx + "0";
        } else {
            main['hx'] = this.addNextDigit(hx);
        }
        // apply computed changes
        // we iterate over the main keys set during the computation
        for (let key of Object.keys(main)) {
            let idx = this.slots.findIndex(x => x == key);
            if (idx > -1) {
                this.glyphs[idx].type = main[key] + "-" + (morph[key] || "0");
            }
        }
    }
}
class MorphDate extends MorphDisplay {
    constructor(container, format, options) {
        super('date', container, format, options);
    }
    get locale() {
        if (this.format == "full-de") return "de";
        return "en";
    }
    update = now => {
        let Y = now.year;
        let M = now.month; // january = 1
        let D = now.day;
        let W = now.weekday;
        let h = now.hours;
        let m = now.minutes;
        let s = now.seconds;
        let Yxxx = Math.floor(Y / 1000) % 10;
        let xYxx = Math.floor(Y / 100) % 10;
        let xxYx = Math.floor(Y / 10) % 10;
        let xxxY = Y % 10;
        let Mx = Math.floor(M / 10);
        let xM = M % 10;
        let Dx = Math.floor(D / 10);
        let xD = D % 10;
        const weekday = {
            en: [
                // read ↓ mon ↓ tue ↓ wed ...
                ['sm', 'mt', 'tw', 'wt', 'tf', 'fs', 'ss'],
                ['uo', 'ou', 'ue', 'eh', 'hr', 'ra', 'au'],
                ['nn', 'ne', 'ed', 'du', 'ui', 'it', 'tn']
            ],
            de: [
                // read ↓ mo  ↓ di  ↓ mi ...
                ['sm', 'md', 'dm', 'md', 'df', 'fs', 'ss'],
                ['oo', 'oi', 'ii', 'io', 'or', 'ra', 'ao'],
            ]
        };
        const month = {
            // month is 1...12, so index 0 is empty
            en: [
                ['', 'jf', 'fm', 'ma', 'am', 'mj', 'jj', 'ja', 'as', 'so', 'on', 'nd', 'dj'],
                ['', 'ae', 'ea', 'ap', 'pa', 'au', 'uu', 'uu', 'ue', 'ec', 'co', 'oe', 'ea'],
                ['', 'nb', 'br', 'rr', 'ry', 'yn', 'nl', 'lg', 'gp', 'pt', 'tv', 'vc', 'cn']
            ],
            de: [
                ['', 'jf', 'fm', 'ma', 'am', 'mj', 'jj', 'ja', 'as', 'so', 'on', 'nd', 'dj'],
                ['', 'ae', 'eä', 'äp', 'pa', 'au', 'uu', 'uu', 'ue', 'ek', 'ko', 'oe', 'ea'],
                ['', 'nb', 'br', 'rr', 'ri', 'in', 'nl', 'lg', 'gp', 'pt', 'tv', 'vz', 'zn']
            ]
        };
        const lastDayOfMonth = [-1, 31, now.leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let main = {},
            morph = {};
        let slow_morph = (h == 23 && m == 59 && s >= this.slowMorphStart);
        if (slow_morph) {
            morph['xD'] = this.slowMorph(now);
            morph['Wxx'] = this.slowMorph(now);
            morph['xWx'] = this.slowMorph(now);
            morph['xxW'] = this.slowMorph(now);
        }
        // Tage
        let loc = this.locale;
        main['Wxx'] = weekday[loc][0][W];
        main['xWx'] = weekday[loc][1][W];
        if (loc == 'en') {
            main['xxW'] = weekday['en'][2][W];
        }
        if (xD == 9) {
            main['xD'] = xD + "0";
            if (slow_morph) {
                morph['Dx'] = this.slowMorph(now);
            }
        }
        // end of month
        else if (D == lastDayOfMonth[M]) {
            main['xD'] = xD + "1";
            if (slow_morph) {
                morph['Dx'] = this.slowMorph(now);
            }
        } else {
            main['xD'] = this.addNextDigit(xD);
        }
        slow_morph = slow_morph && (xD == 9 || D == lastDayOfMonth[M]);
        if (Dx == 3) {
            main['Dx'] = Dx + "0";
            if (slow_morph) {
                morph['xM'] = this.slowMorph(now);
                // month names
                morph['xxM'] = this.slowMorph(now);
                morph['xMx'] = this.slowMorph(now);
                morph['Mxx'] = this.slowMorph(now);
            }
        } else if (M == 2 && D == lastDayOfMonth[M]) {
            main['Dx'] = Dx + "0";
            if (slow_morph) {
                morph['xM'] = this.slowMorph(now);
                // month names
                morph['xxM'] = this.slowMorph(now);
                morph['xMx'] = this.slowMorph(now);
                morph['Mxx'] = this.slowMorph(now);
            }
        } else {
            main['Dx'] = this.addNextDigit(Dx);
        }
        slow_morph = slow_morph && (Dx == 3 || (M == 2 && D == lastDayOfMonth[M]));
        // months
        main['Mxx'] = month[loc][0][M];
        main['xMx'] = month[loc][1][M];
        main['xxM'] = month[loc][2][M];
        // special handling for may
        main['M!=5'] = (M == 5 ? "~" : ".");
        if (xM == 9) {
            main['xM'] = xM + "0";
            if (slow_morph) {
                morph['Mx'] = this.slowMorph(now);
            }
        } else if (M == 12) {
            main['xM'] = xM + "1";
            if (slow_morph) {
                morph['Mx'] = this.slowMorph(now);
            }
        } else {
            main['xM'] = this.addNextDigit(xM);
        }
        slow_morph = slow_morph && (xM == 9 || M == 12);
        if (M == 12) {
            main['Mx'] = Mx + "0";
            if (slow_morph) {
                morph['xxxY'] = this.slowMorph(now);
            }
        } else {
            main['Mx'] = this.addNextDigit(Mx);
        }
        slow_morph = slow_morph && (M == 12);
        // years
        if (xxxY == 9) {
            main['xxxY'] = xxxY + "0";
            if (slow_morph) {
                morph['xxYx'] = this.slowMorph(now);
            }
        } else {
            main['xxxY'] = this.addNextDigit(xxxY);
        }
        slow_morph = slow_morph && (xxxY == 9);
        if (xxYx == 9) {
            main['xxYx'] = xxYx + "0";
            if (slow_morph) {
                morph['xYxx'] = this.slowMorph(now);
            }
        } else {
            main['xxYx'] = this.addNextDigit(xxYx);
        }
        slow_morph = slow_morph && (xxYx == 9);
        if (xYxx == 9) {
            main['xYxx'] = xYxx + "0";
            if (slow_morph) {
                morph['Yxxx'] = this.slowMorph(now);
            }
        } else {
            main['xYxx'] = this.addNextDigit(xYxx);
        }
        if (Yxxx == 9) {
            main['Yxxx'] = Yxxx + "0";
        } else {
            main['Yxxx'] = this.addNextDigit(Yxxx);
        }
        for (let key of Object.keys(main)) {
            let idx = this.slots.findIndex(x => x == key);
            if (idx > -1) {
                if (key == 'M!=5') {
                    this.glyphs[idx].type = main[key];
                } else {
                    this.glyphs[idx].type = main[key] + "-" + (morph[key] || "0");
                }
            }
        }
    }
}
class MorphLogo extends MorphDisplay {
    constructor(container, format, options) {
        super('logo', container, format, options);
    }
    update = now => {
        let m = now.minutes;
        let h = now.hours;
        let glyphnum = (h * 60 + m) % 720;
        let idx = this.slots.findIndex(x => x == "clock");
        this.glyphs[idx].type = this.glyphs[idx].prefix + glyphnum;
    }
}
class MorphTimer extends MorphDisplay {
    constructor(container, starttime, format, options) {
        super('timer', container, starttime, format, options);
        //this.startTime = this.options.startTime || '00:00:00';
        this.isInitialized = false;
        this.isRunning = false;
        this.isFinished = false;
        this.elapsed = 0;
        this.offset = 0;
        this.interval = this.timerToSeconds(this.startTime) * 1000;
    }
    get showDoubleMinutes() {
        return (this.format.indexOf("mm") > -1);
    }
    get showDoubleHours() {
        return (this.format.indexOf("hh") > -1);
    }
    start = () => {
        this.offset = Date.now();
        if (!this.isFinished) {
            this.isRunning = true;
        }
    }
    stop = () => {
        this.isRunning = false;
    }
    reset = () => {
        this.stop();
        this.isFinished = false;
        this.elapsed = 0;
        this.isInitialized = false;
    }
    end = () => {
        this.stop();
        this.isFinished = true;
    }
    startstop = () => {
        if (!this.isFinished) {
            this.isRunning ? this.stop() : this.start();
        }
    }
    subNextDigit = x => {
        var res = x * 11 - 1;
        return res;
    }
    /* To convert a time string to seconds, we split at the colons and reverse
     * the array, so we have 0 => s, 1 => m, 2 => h, 3 => d.
     * Because of m * 60 = s and h * 60 * 60 => s, we use the power function,
     * multiply and add up for index < 3. A day contains 24 * 60 * 60 seconds,
     * so we use this factor for the conversion of days.
     */
    timerToSeconds = arg => {
        return arg.split(':').reverse().reduce(
            (acc, val, idx) => acc + Number(val) * (idx < 3 ? Math.pow(60, idx) : 86400), 0);
    }
    update = now => {
        if (this.isInitialized && (this.isFinished || !this.isRunning)) {
            return this;
        }
        if (this.isRunning) {
            let ts = Date.now();
            let delta = ts - this.offset;
            this.offset = ts;
            this.elapsed += delta;
        }
        let rest = this.interval - this.elapsed;
        if (rest < 1) {
            this.end();
        } else {
            let cs = Math.floor(rest / 10) + 99; // centiseconds
            let d = Math.floor(cs / 8640000);
            cs -= d * 8640000;
            let h = Math.floor(cs / 360000);
            cs -= h * 360000;
            let m = Math.floor(cs / 6000);
            cs -= m * 6000;
            let s = Math.floor(cs / 100);
            cs -= s * 100;
            let quickmorph = 99 - cs; // runs from 0 .. 99, not backwards
            let dxx = Math.floor(d / 100);
            let xdx = Math.floor((d % 100) / 10);
            let xxd = d % 10;
            let hx = Math.floor(h / 10);
            let xh = h % 10;
            let mx = Math.floor(m / 10);
            let xm = m % 10;
            let sx = Math.floor(s / 10);
            let xs = s % 10;
            let main = {},
                morph = {};
            main['xxc'] = '::';
            main['xcx'] = '::';
            main['cxx'] = '::';
            let morph_now = (s == 0) && !(m == 0 && h == 0 && d == 0);
            // seconds
            if (sx == 0) {
                main['sx'] = sx + "5";
                if (morph_now) {
                    morph['xm'] = quickmorph;
                }
            } else {
                main['sx'] = this.subNextDigit(sx);
            }
            morph['xs'] = quickmorph;
            if (xs == 0) {
                main['xs'] = xs + "9";
                morph['sx'] = morph['xs'];
            } else {
                main['xs'] = this.subNextDigit(xs);
            }
            if (this.isInitialized && this.colonAnimate) {
                // we start with the rightmost colon to be in sync with the seconds
                ['xxc', 'xcx', 'cxx'].forEach((val, key) => morph[val] = this.applyColonPhaseShift(key, quickmorph));
            }
            // minutes
            morph_now = morph_now && (sx == 0);
            if (xm == 0) {
                main['xm'] = xm + "9";
                if (morph_now) {
                    morph['mx'] = quickmorph;
                }
            } else {
                main['xm'] = this.subNextDigit(xm);
            }
            morph_now = morph_now && (xm == 0);
            if (mx == 0) {
                main['mx'] = mx + "5";
                if (morph_now) {
                    morph['xh'] = quickmorph;
                }
            } else {
                main['mx'] = this.subNextDigit(mx);
            }
            morph_now = morph_now && (mx == 0);
            // hours
            if (xh == 0) {
                if (hx == 0) {
                    // transition 00 -> 23
                    main['xh'] = xh + "3";
                } else {
                    // transitions 10 -> 09 and 20 -> 19
                    main['xh'] = xh + "9";
                }
                if (morph_now) {
                    morph['hx'] = quickmorph;
                }
            } else {
                main['xh'] = this.subNextDigit(xh);
            }
            morph_now = morph_now && (xh == 0);
            if (hx == 0) {
                main['hx'] = hx + "2";
            } else {
                main['hx'] = this.subNextDigit(hx);
            }
            morph_now = morph_now && (hx == 0);
            // days
            if (xxd == 0) {
                main['xxd'] = xxd + "9";
            } else {
                main['xxd'] = this.subNextDigit(xxd);
            }
            if (morph_now) {
                morph['xxd'] = quickmorph;
            }
            morph_now = morph_now && (xxd == 0);
            if (xdx == 0) {
                main['xdx'] = xdx + "9";
            } else {
                main['xdx'] = this.subNextDigit(xdx);
            }
            if (morph_now) {
                morph['xdx'] = quickmorph;
            }
            morph_now = morph_now && (xdx == 0);
            if (dxx == 0) {
                main['dxx'] = dxx + "9";
            } else {
                main['dxx'] = this.subNextDigit(dxx);
            }
            if (morph_now) {
                morph['dxx'] = quickmorph;
            }
            if (!this.isInitialized) {
                // initialization without morph factors
                morph = {};
                let num_colons = Math.max(this.slots.filter(x => x.indexOf('c') > -1).length, 1);
                this.phaseShift = Math.floor(100 / num_colons);
            }
            for (let key of Object.keys(main)) {
                let idx = this.slots.findIndex(x => x == key);
                if (idx > -1) {
                    this.glyphs[idx].type = main[key] + "-" + (morph[key] || "0");
                }
            }
            this.isInitialized = true;
        }
    }
}
/* the MorphGlyph object:
 * @param _glyphtype type of the glyph,
 * @param container the HTML element containing this glyph
 * @param width of the glyph
 * @param xpos optional positioning parameter in x orientation
 */
class MorphGlyph {
    constructor(glyphtype, container, width, xpos) {
        this._glyphtype = glyphtype;
        this.container = container;
        this.width = width;
        this.xpos = xpos;
        let svg = document.createElementNS(Morph.xmlns, "svg");
        svg.setAttribute('width', width);
        svg.setAttribute('viewBox', "0 0 " + Morph.path.metainfo.width + " " + Morph.path.metainfo.height);
        if (xpos) {
            svg.setAttribute('style', "position: absolute; " + "top: " + "0px" + "; " + "left: " + xpos);
        }
        container.appendChild(svg);
        Morph.path[this._glyphtype].forEach(p => svg.appendChild(this.buildPath(p)));
        this.svg = svg;
    }
    get prefix() {
        // part of the glyph name without morph information,
        // i.e. 'am-42' -> 'am-'
        let idx = this._glyphtype.indexOf('-');
        if (idx > -1) return this._glyphtype.slice(0, idx + 1);
        return this._glyphtype;
    }
    // the setter allows for glyph.type = glyph.prefix + morph
    set type(t) {
        // we remove and re-initialize the svg paths only if necessary
        if (t != this._glyphtype) {
            let svg = this.svg;
            while (svg.firstChild) {
                svg.removeChild(svg.firstChild);
            }
            if (!Morph.path[t]) {
                console.log("Glyph ", t, " missing, using '*' instead.");
                t = '*';
            }
            Morph.path[t].forEach(p => svg.appendChild(this.buildPath(p)));
            this.svg = svg;
            this._glyphtype = t;
        }
    }
    buildPath(p) {
        // we build a <path> element from the stored raw path informations
        const path = document.createElementNS(Morph.xmlns, "path");
        const attrs = ['stroke-width', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'fill'];
        path.setAttribute('class', "morph-svg-path");
        attrs.forEach(attr => path.setAttribute(attr, Morph.path.metainfo[attr]));
        path.setAttribute('d', p);
        return path;
    }
    clear = () => {
        this._glyphtype = null;
        this.width = null;
        this.xpos = null;
        let container = this.container;
        // remove all svg elements from the container
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        this.svg = null;
        this.container = null;
    }
}
/* the MorphInternalTimeDate class is basically a copy of the Date object
 * with additional properties:
 * transition indicates a time change
 * on the last sunday in march 1:00 -> 3:00;
 * on the last sunday in october: 1:00 -> 2a:00 -> 2b:00 -> 3:00
 * The getters return the local time information, the month index is in the
 * 'natural' range 1...12
 */
class MorphInternalTimeDate {
    constructor(offset = 0) {
        // we use UTC to detect changes from/to daylight savings time
        var UTCdate;
        if (Morph.io.connected()) {
            UTCdate = new Date(performance.now() - Morph.io.timeDelta);
            let locdate = new Date();
            Morph.io.timediff = locdate.getTime() - UTCdate.getTime();
        } else {
            UTCdate = new Date();
            Morph.io.timediff = "--";
        }
        if (offset != 0) {
            // offset  for testing purposes
            UTCdate = new Date(UTCdate.valueOf() + offset);
        }
        let month = UTCdate.getUTCMonth();
        let weekday = UTCdate.getUTCDay();
        let day = UTCdate.getUTCDate();
        let hour = UTCdate.getUTCHours();
        this.transition = {};
        // time change DST and back
        if ((month == 2) && // march
            (day > 24) && (weekday == 0) && // last sunday
            (hour == 0)) { // at 0:00 UTC = 1:00 MEZ
            this.transition['1->3'] = true;
        } else if (month == 9) { // october
            if ((day > 23) && // saturday before the last sunday this month
                (day < 31) && // if october 24th is on a saturday, then october 31st
                (weekday == 6) && // as well, which is too late
                (hour == 23)) { // saturday 23:00 UTC = sunday, 1:00 MESZ
                this.transition['1->2a'] = true;
            } else if ((day > 24) && (weekday == 0)) { // last sunday
                if (hour == 0) { // 0:00 Uhr UTC = 2:00 MESZ
                    this.transition['2a->2b'] = true;
                } else if (hour == 1) { // 1:00 UTC = 2:00 MEZ
                    this.transition['2b->3'] = true;
                }
            }
        }
        // leap seconds
        if (Morph.io.leap) {
            let possibleLeapDay = [0, 0, 31, 0, 0, 30, 0, 0, 30, 0, 0, 31];
            let minute = UTCdate.getUTCMinutes();
            let second = UTCdate.getUTCSeconds();
            if (day == possibleLeapDay[month] && hour == 23 && minute == 59 && second == 60 - Morph.io.leap) {
                if (Morph.io.leap == 1) {
                    this.transition['59->60'] = true; // positive leap sec
                } else {
                    this.transition['58->00'] = true; // negative leap sec
                }
            }
        }
        let TZoffset = 1; // timezone offset
        if (
            (month > 2 && month < 9) // april to september
            || (
                (month == 2 && day > 24) && (
                    (weekday == 0 && hour >= 1) || (weekday > 0 && (day - weekday) > 24))) // or after 1:00 on the last sunday in march
            || (
                (month == 9) && !(
                    (day > 24) && (
                        (weekday == 0 && hour >= 1) || (weekday > 0 && (day - weekday) > 24)))) // or before 1:00 Uhr n the last sunday in october
        ) {
            TZoffset = 2;
        }
        this.localdate = new Date(UTCdate.valueOf() + TZoffset * 60 * 60 * 1000);
    }
    get year() {
        return this.localdate.getUTCFullYear();
    }
    get month() {
        // month within 1...12
        return this.localdate.getUTCMonth() + 1;
    }
    get day() {
        return this.localdate.getUTCDate();
    }
    get weekday() {
        return this.localdate.getUTCDay();
    }
    get hours() {
        // we use getUTCHours(), otherwise the time zone gets added!
        return this.localdate.getUTCHours();
    }
    get minutes() {
        return this.localdate.getUTCMinutes();
    }
    get seconds() {
        return this.localdate.getUTCSeconds();
    }
    get milliseconds() {
        return this.localdate.getUTCMilliseconds();
    }
    get leapYear() {
        let Y = this.year;
        return (Y % 100 == 0) ? (Y % 400 == 0) : (Y % 4 == 0);
    }
}
