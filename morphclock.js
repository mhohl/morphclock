/*
 *
 * morphclock.js
 * version 1.0
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
var h;
var m;
var s;
var t;

var maxh;
var maxHx;

/* booleans */
var show_seconds;
var show_daytime;

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
              
var svg_source = {};

function quickMorph() {
   return Math.round(t/10);
}

function slowMorph() {
   return Math.round(((main['xS']-5)*1000+t)/50);
}

function doubleDigit(x) {
   var res;
   res = x < 10 ? x = "0" + x : x ;
   return res > 99 ? "00" : res ; 
}

function addNextDigit(x) {
   return doubleDigit(x * 10 + x + 1);
}

function getMorphclockElement(){
    return document.getElementById('morphclock');
}

function getTimeFormat() {
    var format = getMorphclockElement().getAttribute('data-format');
    return format;
}

function resetMorph(){
    for (var idx in morph) {
       morph[idx] = "00";
    }
}

function setCSS() {
    var style = document.createElement("style");
    var morphId = document.createTextNode("#morphclock { position: relative; width: 100%; padding: 0px; white-space: nowrap; stroke: black; }");
    var svgClass = document.createTextNode(".svg-path { fill: none; stroke: inherit; stroke-linejoin: round; stroke-linecap: round; opacity: inherit; }");
    style.appendChild(morphId);
    style.appendChild(svgClass);
    document.head.appendChild(style);
}

function calcCharWidth(data) {
    var widthArray = [];
    var width = 100/data.length;
    for (var i=0; i < data.length; i++) {
        widthArray[i] = width;
    }
    console.log(widthArray);
    return widthArray;
}

function calcCharLeft(data) {
    var leftArray = [];
    var left = 0;
    for (var i=0; i < data.length; i++) {
        leftArray[i] = left;
        left -= 6;
    }
    console.log(leftArray);
    return leftArray;
}
    

function setSVGSlots(format) {
    var svg_slots = {};
    // initialize images
    var svg_data = svgData[format];
    console.log(svg_data);
    var char_width = calcCharWidth(svg_data);
    var char_left = calcCharLeft(svg_data);
    for (var i=0, len=svg_data.length; i < len; i++) {
        var id = svg_data[i];
        var svg = document.createElementNS (xmlns, "svg");
        svg.setAttribute('width', svg_width);
        svg.setAttribute('height', svg_height);
        svg.setAttribute('viewBox', "0 0 " + svg_width + " " + svg_height);
        svg.setAttribute('id', id);
        svg.setAttribute('style', "position: relative; top: 0px; left: " + char_left[i] + "%; width: " + char_width[i] + "%");
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

    maxh = time_format.slice(-2);
    maxh = ( maxh == 24 ? 23 : maxh );
    maxHx = Math.floor(maxh/10);

    show_seconds = time_format.includes('ss');
    show_daytime = (maxh == 12);

    if (show_daytime) {
       if (h == 0) {
          h = 12;
       }
       else if (h > 12) {
          h = h - 12;
          main['Dx'] = "pa";
       }
    }

    main['Hx'] = Math.floor(h/10);
    main['xH'] = h % 10;
    main['Mx'] = Math.floor(m/10);
    main['xM'] = m % 10;
    main['Sx'] = Math.floor(s/10);
    main['xS'] = s % 10;

    resetMorph();

    // hours part 1
    if (main['Hx'] == maxHx) {
       main['Hx'] = main['Hx'] + "0";
    }
    else {
       main['Hx'] = addNextDigit(main['Hx']);
    }

    // hours part 2
    if (h == maxh || main['xH'] == 9) {
       if (h == maxh && show_daytime ) {
          // transition "12" -> "01"
          main['xH'] = main['xH'] + "1";
       }
       else {
          main['xH'] = main['xH'] + "0";
       }
       if (main['Mx'] == 5 &&
           main['xM'] == 9 &&
           main['Sx'] == 5 &&
           main['xS'] >= 5) {
          morph['Hx'] = doubleDigit(slowMorph());
          if (h == maxh) { 
             morph['Dx'] = morph['Hx'];
             morph['xD'] = morph['Hx'];
          }
       }
    }
    else {
       main['xH'] = addNextDigit(main['xH']);
    }

    // minutes part 1
    if (main['Mx'] == 5) {
       main['Mx'] = main['Mx'] + "0";
       if (main['xM'] == 9 &&
           main['Sx'] == 5 &&
           main['xS'] >= 5) {
          morph['xH'] = doubleDigit(slowMorph());
       }
    }
    else {
       main['Mx'] = addNextDigit(main['Mx']);
    }
    
    // minutes part 2
    if (main['xM'] == 9) {
       main['xM'] = main['xM'] + "0";
       if (main['Sx'] == 5 &&
           main['xS'] >= 5) {
          morph['Mx'] = doubleDigit(slowMorph());
       }
    }
    else {
       main['xM'] = addNextDigit(main['xM']);
    }

    // seconds part 1
    if (main['Sx'] == 5) {
       main['Sx'] = main['Sx'] + "0";
       if (main['xS'] >= 5) {
          morph['xM'] = doubleDigit(slowMorph());
       }
    }
    else {
       main['Sx'] = addNextDigit(main['Sx']);
    }
    if (show_seconds) {
       morph['xS'] = doubleDigit(quickMorph());
       // seconds part 2
       if (main['xS'] == 9) {
          main['xS'] = main['xS'] + "0";
          morph['Sx'] = morph['xS'];
       }
       else {
          main['xS'] = addNextDigit(main['xS']);
       }
       /* colon stuff: the right colon is in sync with
        * the seconds, the left one has a 50% phase shift */
       morph['xC'] = morph['xS'];
       morph['Cx'] = doubleDigit((morph['xC'] + 50) % 100);
    }
    else {
       /* no seconds shown, the first (and only) colon
        * is in sync with the seconds */
       morph['Cx'] = doubleDigit(quickMorph());
    }

    // build actual image source
    svg_source['digit-' + time_format + '-Hx'] = main['Hx'] + "-" + morph['Hx'];
    svg_source['digit-' + time_format + '-xH'] = main['xH'] + "-" + morph['xH'];
    svg_source['digit-' + time_format + '-Mx'] = main['Mx'] + "-" + morph['Mx'];
    svg_source['digit-' + time_format + '-xM'] = main['xM'] + "-" + morph['xM'];
    svg_source['colon-' + time_format + '-Cx'] = main['Cx'] + "-" + morph['Cx'];
    if (show_seconds) {
       svg_source['digit-' + time_format + '-Sx'] = main['Sx'] + "-" + morph['Sx'];
       svg_source['digit-' + time_format + '-xS'] = main['xS'] + "-" + morph['xS'];
       svg_source['colon-' + time_format + '-xC'] = main['xC'] + "-" + morph['xC'];
    }
    if (show_daytime) {
       svg_source['alpha-' + time_format + '-Dx'] = main['Dx'] + "-" + morph['Dx'];
       svg_source['alpha-' + time_format + '-xD'] = main['xD'] + "-" + morph['xD'];
    }
    for (var src in svg_source) {
      svg_source[src] = "md-" + svg_source[src];
    }
    // apply changes to images
    for (var src in svg_source) {
        var svg = svg_slot[src];
        // remove old path entries
        while (svg.firstChild) {
              svg.removeChild(svg.firstChild);
        }
        // set new path information
        var path_array = morphpath[svg_source[src]];
        for (var i=0, len=path_array.length; i < len; i++) {
            var path = document.createElementNS (xmlns, "path");
            path.setAttribute ('class', "svg-path");
            path.setAttribute ('stroke-width', svg_strokewidth);
            path.setAttribute ('d', path_array[i]);
            svg.appendChild (path);
        }
    }
}

window.onload = function() {
    time_format = getTimeFormat();
    setCSS();
    svg_slot = setSVGSlots(time_format);
    renderTime();
}

