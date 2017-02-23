/*
 *
 * morphclock.js
 * version 1.1
 *
 */

// global variable declarations
var svg_slot = {}; // holds the references to the images
var time_fomat;    // the chosen time format

var refresh = 50; // refresh time in msec

var xmlns = "http://www.w3.org/2000/svg";
var svg_width = morphpath['width'];
var svg_height = morphpath['height'];
var svg_strokewidth = morphpath['stroke-width'];

/* the time variables */
var currentTime;
var h, m, s, t;
var Hx, xH, Mx, xM, Sx, xS;

var maxh;
var maxHx;

/* morph timing:
 * the slow morph starts when the last
 * second digit is >= slow_morph_start
 */
var slow_morph_start = 7;

/* booleans */
var show_seconds;
var show_daytime;
var slow_morph;

/* fractions for digit overlap */
var small_overlap = 0.2;
var big_overlap = 2 * small_overlap;

/* the supported time formats and the image sources */
var svgData = {
    'hhmm12':   [ 'digit-hhmm12-Hx',
                  'digit-hhmm12-xH',
                  'colon-hhmm12-Cx',
                  'digit-hhmm12-Mx',
                  'digit-hhmm12-xM',
                  'alpha-hhmm12-Dx',
                  'alpha-hhmm12-xD' ],
    'hhmm24':   [ 'digit-hhmm24-Hx',
                  'digit-hhmm24-xH',
                  'colon-hhmm24-Cx',
                  'digit-hhmm24-Mx',
                  'digit-hhmm24-xM' ],
    'hhmmss12': [ 'digit-hhmmss12-Hx',
                  'digit-hhmmss12-xH',
                  'colon-hhmmss12-Cx',
                  'digit-hhmmss12-Mx',
                  'digit-hhmmss12-xM',
                  'colon-hhmmss12-xC',
                  'digit-hhmmss12-Sx',
                  'digit-hhmmss12-xS',
                  'alpha-hhmmss12-Dx',
                  'alpha-hhmmss12-xD' ],
    'hhmmss24': [ 'digit-hhmmss24-Hx',
                  'digit-hhmmss24-xH',
                  'colon-hhmmss24-Cx',
                  'digit-hhmmss24-Mx',
                  'digit-hhmmss24-xM',
                  'colon-hhmmss24-xC',
                  'digit-hhmmss24-Sx',
                  'digit-hhmmss24-xS' ]
};

var main  = { 'Hx':'00', 'xH':'00', 'Mx':'00', 'xM':'00',
              'Sx':'00', 'xS':'00', 'Cx':'::', 'xC':'::',
              'Dx':'ap', 'xD':'mm' };

var morph = { 'Hx':'00', 'xH':'00', 'Mx':'00', 'xM':'00',
              'Sx':'00', 'xS':'00', 'Cx':'00', 'xC':'00',
              'Dx':'00', 'xD':'00' };

function quickMorph() {
   return doubleDigit(Math.floor(t/10));
}

function slowMorph(x) {
   return doubleDigit(Math.floor(((xS-x)*1000+t)/((10-x)*10)));
}

function doubleDigit(x) {
   return x < 10 ? x = "0" + x : x ;
}

function addNextDigit(x) {
   return doubleDigit(x * 10 + x + 1);
}

function getMorphclockElement(){
    return document.getElementById('morphclock');
}

function getTimeFormat() {
    time_format = getMorphclockElement().getAttribute('data-format');

    maxh = time_format.slice(-2);
    maxh = ( maxh == 24 ? 23 : maxh );
    maxHx = Math.floor(maxh/10);

    show_seconds = time_format.includes('ss');
    show_daytime = (maxh == 12);
}

function resetMorph(){
    for (var idx in morph) {
       morph[idx] = "00";
    }
}

function setCSS() {
    var style = document.createElement("style");
    var morphId = document.createTextNode(
        "#morphclock { " +
        "width: 100%; " +
        "position: relative;" +
        "white-space: nowrap; " +
        "stroke: black; }");
    var svgClass = document.createTextNode(
        ".svg-path { " +
        "fill: none; " +
        "stroke: inherit; " +
        "stroke-linejoin: round; " +
        "stroke-linecap: round; " +
        "opacity: inherit; }");
    style.appendChild(morphId);
    style.appendChild(svgClass);
    document.head.appendChild(style);
}

function setDivHeight() {
  var div = getMorphclockElement();
  /* the morphclock div's height is set to the height of the first
     child, i.e. the first svg element */
  div.style.height = div.children[0].getBoundingClientRect().height;
}

function calcCharWidth(data) {
    /* width is calculated by
     * width := 100/(number_of_chars -
                     number_of_small_overlaps*small_overlap -
                     number_of_big_overlaps*big_overlap)
     *
     * where big_overlap is used for ':' and the space bevore 'am/pm'
     */
    var n_of_chars, n_of_sover, n_of_bover;
    n_of_chars = data.length;
    n_of_sover = 2;
    n_of_bover = 2;
    if (show_daytime) {
       n_of_chars += 1; // add the space before 'am/pm'
       n_of_sover += 1; // one more small overlap between 'a|p' and 'm'
       n_of_bover += 2; // two more big overlaps for the additional space
    }
    if (show_seconds) {
       n_of_sover += 1; // one more small overlap for the seconds
       n_of_bover += 2; // two more big overlaps for the ':' before the seconds
    }
    return 100/(n_of_chars -
                n_of_sover * small_overlap -
                n_of_bover * big_overlap);
}

function calcCharLeft(width,data) {
    var leftArray = [];
    var left = 0;
    leftArray[0] = left;
    for (var i=1; i < data.length; i++) {
        if (data[i].includes("C")  ||
            data[i].includes("Mx") ||
            data[i].includes("Sx")) {
           left = left + width*(1 - big_overlap); }
        else if (data[i].includes("Dx")) {
           left = left + 2*width*(1 - big_overlap);
        }
        else {
           left = left + width*(1 - small_overlap);
        }
        leftArray[i] = left;
    }
    return leftArray;
}

function setSVGSlots() {
    var svg_slots = {};
    // initialize svg images
    var svg_data = svgData[time_format];
    var char_width = calcCharWidth(svg_data);
    var char_left = calcCharLeft(char_width,svg_data);
    for (var i=0, len=svg_data.length; i < len; i++) {
        var id = svg_data[i];
        var svg = document.createElementNS (xmlns, "svg");
        svg.setAttribute('width', char_width + "%");
        svg.setAttribute('viewBox', "0 0 " + svg_width + " " + svg_height);
        svg.setAttribute('id', id);
        svg.setAttribute('style', "position: absolute; " +
                                  "top: 0px; " +
                                  "left: " + char_left[i] + "%");
        getMorphclockElement().appendChild(svg);
        svg_slots[id] = svg;
    }
    return svg_slots;
}

function renderTime() {
    currentTime = new Date();

    h = currentTime.getHours();
    m = currentTime.getMinutes();
    s = currentTime.getSeconds();
    t = currentTime.getMilliseconds();

    setTimeout('renderTime()',refresh);

    if (show_daytime) {
       if (h == 0) {
          h = 12;
       }
       else if (h > 12) {
          h = h - 12;
          main['Dx'] = "pa";
       }
    }

    Hx = Math.floor(h/10);
    xH = h % 10;
    Mx = Math.floor(m/10);
    xM = m % 10;
    Sx = Math.floor(s/10);
    xS = s % 10;

    resetMorph();

    slow_morph = (xS >= slow_morph_start);

    // seconds
    if (Sx == 5) {
       main['Sx'] = Sx + "0";
       if (slow_morph) {
          morph['xM'] = slowMorph(slow_morph_start);
       }
    }
    else {
       main['Sx'] = addNextDigit(Sx);
    }
    if (show_seconds) {
       morph['xS'] = quickMorph();
       if (xS == 9) {
          main['xS'] = xS + "0";
          morph['Sx'] = morph['xS'];
       }
       else {
          main['xS'] = addNextDigit(xS);
       }
       /* colon stuff: the right colon is in sync with
        * the seconds, the left one has a 50% phase shift */
       morph['xC'] = morph['xS'];
       morph['Cx'] = doubleDigit((morph['xC'] + 50) % 100);
    }
    else {
       /* no seconds shown, the first (and only) colon
        * is in sync with the seconds */
       morph['Cx'] = quickMorph();
    }

    //minutes
    slow_morph = slow_morph && (Sx == 5);

    if (xM == 9) {
       main['xM'] = xM + "0";
       if (slow_morph) {
          morph['Mx'] = slowMorph(slow_morph_start);
       }
    }
    else {
       main['xM'] = addNextDigit(xM);
    }

    slow_morph = slow_morph && (xM == 9);

    if (Mx == 5) {
       main['Mx'] = Mx + "0";
       if (slow_morph) {
          morph['xH'] = slowMorph(slow_morph_start);
       }
    }
    else {
       main['Mx'] = addNextDigit(Mx);
    }

    slow_morph = slow_morph && (Mx == 5);

    // hours
    if (h == maxh || xH == 9) {
       if (h == maxh && show_daytime ) {
          // transition "12" -> "01"
          main['xH'] = xH + "1";
       }
       else {
          main['xH'] = xH + "0";
       }
       if (slow_morph) {
          morph['Hx'] = slowMorph(slow_morph_start);
          if (h == maxh) {
             morph['Dx'] = morph['Hx'];
             morph['xD'] = morph['Hx'];
          }
       }
    }
    else {
       main['xH'] = addNextDigit(xH);
    }

    if (Hx == maxHx) {
       main['Hx'] = Hx + "0";
    }
    else {
       main['Hx'] = addNextDigit(Hx);
    }

    // apply changes to svg images
    for (var src in svg_slot) {
        var svg = svg_slot[src];
        // remove old paths
        while (svg.firstChild) {
              svg.removeChild(svg.firstChild);
        }
        // set new path information
        var idx = src.slice(-2);
        var path_array = morphpath["md-" + main[idx] + "-" + morph[idx]];
        for (var i=0, len=path_array.length; i < len; i++) {
            var path = document.createElementNS (xmlns, "path");
            path.setAttribute ('class', "svg-path");
            path.setAttribute ('stroke-width', svg_strokewidth);
            path.setAttribute ('d', path_array[i]);
            svg.appendChild (path);
        }
    }
}

function startMorphclock() {
    getTimeFormat();
    setCSS();
    svg_slot = setSVGSlots();
    setDivHeight();
    window.addEventListener("resize", setDivHeight);
    renderTime();
}

window.onload = function() {
    startMorphclock();
}
