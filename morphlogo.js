/*
 *
 * morphlogo.js
 *
 */

// global variable declarations
var svg_slot = {}; // holds the references to the images

var refresh = 50; // refresh time in msec

var xmlns = "http://www.w3.org/2000/svg";
var svg_width = morphpath['width'];
var svg_height = morphpath['height'];
var svg_strokewidth = morphpath['stroke-width'];

/* the time variables */
var currentTime;
var h, m, s, t;
var clk;
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

var main  = [ 'm', 'o', 'r', 'p', 'h', 'c', 'l', 'clock-', 'c', 'k' ];

var morph = [ 0, 0, 0, 0, 0, 0, 0, 1, 0, 0];

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

function morphlogo(){
    return document.getElementById('morphlogo');
}


function resetMorph(){
    for (var idx in morph) {
       morph[idx] = "00";
    }
}

function setCSS() {
    var style = document.createElement("style");
    var morphId = document.createTextNode(
        "#morphlogo { " +
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

function morphlogoCalcHeight() {
  var div = morphlogo();
  /* the morphlogos div's height is set to the height of the first
     child, i.e. the first svg element */
  div.style.height = div.children[0].getBoundingClientRect().height;
}

function calcLogoCharWidth() {
    /* width is calculated by
     * width := 100/(number_of_chars -
                     number_of_small_overlaps*small_overlap -
                     number_of_big_overlaps*big_overlap)
     *
     * where big_overlap is used for ':' and the space bevore 'am/pm'
     */
    var n_of_chars, n_of_sover, n_of_bover;
    n_of_chars = "morphclock".length;
    n_of_sover = 2;
    n_of_bover = 0;
    return 100/(n_of_chars -
                n_of_sover * small_overlap -
                n_of_bover * big_overlap);
}

function calcLogoCharLeft(width) {
    var leftArray = [];
    var left = 0;
    leftArray[0] = left;
    for (var i=1; i < "morphclock".length; i++) {
        left = left + width*(1 - small_overlap);
        leftArray[i] = left;
    }
    return leftArray;
}

function setLogoSlots() {
    var logo_slots = {};
    // initialize svg images
    var char_width = calcLogoCharWidth();
    var char_left = calcLogoCharLeft(char_width);
    for (var i=0, len="morphclock".length; i < len; i++) {
        var id = i;
        var svg = document.createElementNS (xmlns, "svg");
        svg.setAttribute('width', char_width + "%");
        svg.setAttribute('viewBox', "0 0 " + svg_width + " " + svg_height);
        svg.setAttribute('id', id);
        svg.setAttribute('style', "position: absolute; " +
                                  "top: 0px; " +
                                  "left: " + char_left[i] + "%");
        morphlogo().appendChild(svg);
        logo_slots[id] = svg;
    }
    return logo_slots;
}

function renderTime() {
    currentTime = new Date();

    h = currentTime.getHours();
    m = currentTime.getMinutes();
    s = currentTime.getSeconds();
    t = currentTime.getMilliseconds();

    setTimeout('renderTime()',refresh);

    clk = (h % 12)*60 + m;


   // resetMorph();

    // apply changes to svg images
    for (var src in svg_slot) {
        var svg = svg_slot[src];
        // remove old paths
        while (svg.firstChild) {
              svg.removeChild(svg.firstChild);
        }
        // set new path information
        var idx = src.slice(-2);
        var morphidx = "";
        if (morph[idx] != 0) { morphidx = clk; }
        console.log(morph[idx], main[idx] + morphidx);
        var path_array = morphpath[main[idx] + morphidx];
        for (var i=0, len=path_array.length; i < len; i++) {
            var path = document.createElementNS (xmlns, "path");
            path.setAttribute ('class', "svg-path");
            path.setAttribute ('stroke-width', svg_strokewidth);
            path.setAttribute ('d', path_array[i]);
            svg.appendChild (path);
        }
    }
}

function morphlogoStart() {
    setCSS();
    svg_slot = setLogoSlots();
    morphlogoCalcHeight();
    window.addEventListener("resize", morphlogoCalcHeight);
    renderTime();
}


function morphlogoSetWidth(width) {
    morphlogo().style.width = width;
    morphlogoCalcHeight();
}

window.onload = function() {
    morphlogoStart();
}
