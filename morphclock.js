// global variable declarations
var img_slot = {}; // holds the references to the images
var time_fomat;    // the chosen time format

/* the digit variables: x_ is the digit on the left position,
 * _x the one on the right.
 *
 * we have [H]ours, [M]inutes, [S]econds, [C]olons and
 * [D]ay time variables:
 */

/* the time variables */
var currentTime;
var xh;
var xm;
var xs;
var xt;


/* the supported time formats and the image sources */
var imgData = { 
    'hhmm12':   { 'digit-hhmm12-Hx':'svg/md-00-00.svg',
                  'digit-hhmm12-xH':'svg/md-00-00.svg',
                  'colon-hhmm12-Cx':'svg/md-::-00.svg',
                  'digit-hhmm12-Mx':'svg/md-00-00.svg',
                  'digit-hhmm12-xM':'svg/md-00-00.svg',
                  'alpha-hhmm12-Dx':'svg/md-ap-00.svg',
                  'alpha-hhmm12-xD':'svg/md-mm-00.svg' },
    'hhmm24':   { 'digit-hhmm24-Hx':'svg/md-00-00.svg',
                  'digit-hhmm24-xH':'svg/md-00-00.svg',
                  'colon-hhmm24-Cx':'svg/md-::-00.svg',
                  'digit-hhmm24-Mx':'svg/md-00-00.svg',
                  'digit-hhmm24-xM':'svg/md-00-00.svg' },
    'hhmmss12': { 'digit-hhmmss12-Hx':'svg/md-00-00.svg',
                  'digit-hhmmss12-xH':'svg/md-00-00.svg',
                  'colon-hhmmss12-Cx':'svg/md-::-00.svg',
                  'digit-hhmmss12-Mx':'svg/md-00-00.svg',
                  'digit-hhmmss12-xM':'svg/md-00-00.svg',
                  'colon-hhmmss12-xC':'svg/md-::-00.svg',
                  'digit-hhmmss12-Sx':'svg/md-00-00.svg',
                  'digit-hhmmss12-xS':'svg/md-00-00.svg',
                  'alpha-hhmmss12-Dx':'svg/md-ap-00.svg',
                  'alpha-hhmmss12-xD':'svg/md-mm-00.svg' },
    'hhmmss24': { 'digit-hhmmss24-Hx':'svg/md-00-00.svg',
                  'digit-hhmmss24-xH':'svg/md-00-00.svg',
                  'colon-hhmmss24-Cx':'svg/md-::-00.svg',
                  'digit-hhmmss24-Mx':'svg/md-00-00.svg',
                  'digit-hhmmss24-xM':'svg/md-00-00.svg',
                  'colon-hhmmss24-xC':'svg/md-::-00.svg',
                  'digit-hhmmss24-Sx':'svg/md-00-00.svg',
                  'digit-hhmmss24-xS':'svg/md-00-00.svg' }
};

var main  = { 'H_':'00', '_H':'00', 'M_':'00', '_M':'00', 
              'S_':'00', '_S':'00', 'C_':'::', '_C':'::',
              'D_':'ap', '_D':'mm' }
              
var morph = { 'H_':'00', '_H':'00', 'M_':'00', '_M':'00', 
              'S_':'00', '_S':'00', 'C_':'00', '_C':'00',
              'D_':'00', '_D':'00' }
              
var img_source = {};

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
    

function setImageSlots(format) {
    var image_slots = {};
    // initialize images
    for (var id in imgData[format]) {
        var img = document.createElement('img');
        img.setAttribute('src', imgData[format][id]);
        img.setAttribute('id', id);
        getMorphclockElement().appendChild(img);
        image_slots[id] = img;
    }
    return image_slots;
}

function renderTime() {
    currentTime = new Date();

    xh = currentTime.getHours();
    xm = currentTime.getMinutes();
    xs = currentTime.getSeconds();
    xt = currentTime.getMilliseconds();

    setTimeout('renderTime()',100);
    
    var maxh = time_format.slice(-2);
    if (maxh == 24 ) { maxh = 23; }
    
    var show_seconds = time_format.includes('ss');
    var show_daytime = (maxh == 12);
    
    var maxH_ = Math.floor(maxh/10);
    
    if (show_daytime) {
       if (xh == 0) { xh = 12; }
       else if (xh > 12) { xh = xh - 12; main['D_'] = "pa"; }
    }
    
    main['H_'] = Math.floor(xh/10);
    main['_H'] = xh % 10;
    main['M_'] = Math.floor(xm/10);
    main['_M'] = xm % 10;
    main['S_'] = Math.floor(xs/10);
    main['_S'] = xs % 10;
    
    resetMorph();
    
    // hours part 1
    if (main['H_'] == maxH_) { main['H_'] = main['H_'] + "0"; }
    else if (main['H_'] == 0) { main['H_'] = main['H_'] + "1"; }
    else { main['H_'] = main['H_'] * 10 + (main['H_'] + 1); }
    
    // hours part 2
    if ((xh == maxh) || 
        (main['_H'] == 9)) {main['_H'] = main['_H'] + "0";
                     if (main['M_'] == 5 && main['_M'] == 9 && main['S_'] == 5 && main['_S'] >= 5) {
                        morph['H_'] = Math.round(((main['_S']-5)*1000+xt)/50);
                        if (morph['H_'] < 10) { morph['H_'] = "0" + morph['H_']; }
                        if (xh == maxh) {
                           morph['D_'] = morph['H_'];
                           morph['_D'] = morph['H_'];
                        } 
                     }
                   }
    else if (main['_H'] == 0) { main['_H'] = main['_H'] + "1"; }
    else { main['_H'] = main['_H'] * 10 + (main['_H'] + 1); }
    
    // minutes part 1
    if (main['M_'] == 5) { main['M_'] = main['M_'] + "0";
                   if (main['_M'] == 9 && main['S_'] == 5 && main['_S'] >= 5) {
                      morph['_H'] = Math.round(((main['_S']-5)*1000+xt)/50);
                      if (morph['_H'] < 10) { morph['_H'] = "0" + morph['_H']; }
                   }
                 }
    else if (main['M_'] == 0) { main['M_'] = main['M_'] + "1"; }
    else { main['M_'] = main['M_'] * 10 + (main['M_'] + 1); }
    
    // minutes part 2
    if (main['_M'] == 9) { main['_M'] = main['_M'] + "0";
                   if (main['S_'] == 5 && main['_S'] >= 5) {
                      morph['M_'] = Math.round(((main['_S']-5)*1000+xt)/50);
                      if (morph['M_'] < 10) { morph['M_'] = "0" + morph['M_']; }
                   }
                 }
    else if (main['_M'] == 0) { main['_M'] = main['_M'] + "1"; }
    else { main['_M'] = main['_M'] * 10 + (main['_M'] + 1); } 
    
    // seconds part 1
    if (main['S_'] == 5) { main['S_'] = main['S_'] + "0";
                   if (main['_S'] >= 5) { 
                      morph['_M'] = Math.round(((main['_S']-5)*1000+xt)/50);
                      if (morph['_M'] < 10) { morph['_M'] = "0" + morph['_M']; }
                   }
                 }
    else if (main['S_'] == 0) { main['S_'] = main['S_'] + "1"; }
    else { main['S_'] = main['S_'] * 10 + (main['S_'] + 1); }
    
    if (show_seconds) {
       // seconds part 2
       if (main['_S'] == 9) { main['_S'] = main['_S'] + "0";
                      morph['S_'] = morph['_S']; }
       else if (main['_S'] == 0) { main['_S'] = main['_S'] + "1"; }
       else  { main['_S'] = main['_S'] * 10 + (main['_S'] + 1); }
       // colon stuff: 
       morph['_S'] = Math.round(xt/10);
       if ( morph['_S'] <10 ) { morph['_S'] = "0" + morph['_S']; }
       morph['_C'] = morph['_S'];
       morph['C_'] = (morph['_C']+50) % 100;
       if ( morph['C_'] <10 ) { morph['C_'] = "0" + morph['C_']; }
    }
    else {
        morph['C_'] = Math.round(xt/10);
        if (morph['C_'] < 10) { morph['C_'] = "0" + morph['C_']; }
    }
    // build actual image source
    img_source['digit-' + time_format + '-Hx'] = "svg/md-" + main['H_'] + "-" + morph['H_'] + ".svg";
    img_source['digit-' + time_format + '-xH'] = "svg/md-" + main['_H'] + "-" + morph['_H'] + ".svg";
    img_source['digit-' + time_format + '-Mx'] = "svg/md-" + main['M_'] + "-" + morph['M_'] + ".svg";
    img_source['digit-' + time_format + '-xM'] = "svg/md-" + main['_M'] + "-" + morph['_M'] + ".svg";
    img_source['colon-' + time_format + '-Cx'] = "svg/md-" + main['C_'] + "-" + morph['C_'] + ".svg";
    if (show_seconds) {
       img_source['digit-' + time_format + '-Sx'] = "svg/md-" + main['S_'] + "-" + morph['S_'] + ".svg";
       img_source['digit-' + time_format + '-xS'] = "svg/md-" + main['_S'] + "-" + morph['_S'] + ".svg";
       img_source['colon-' + time_format + '-xC'] = "svg/md-" + main['_C'] + "-" + morph['_C'] + ".svg";
    }
    if (show_daytime) {
       img_source['alpha-' + time_format + '-Dx'] = "svg/md-" + main['D_'] + "-" + morph['D_'] + ".svg";
       img_source['alpha-' + time_format + '-xD'] = "svg/md-" + main['_D'] + "-" + morph['_D'] + ".svg";
    }
    // apply changes to images
    for (var slot in imgData[time_format]) {
        img_slot[slot].src = img_source[slot];
    }
}

window.onload = function() {
    time_format = getTimeFormat();
    img_slot = setImageSlots(time_format);
    renderTime();
}

