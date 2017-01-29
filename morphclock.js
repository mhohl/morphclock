// global variable declarations
var img_slot = {}; // holds the references to the images
var time_fomat;    // the chosen time format

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

var main  = { 'Hx':'00', 'xH':'00', 'Mx':'00', 'xM':'00', 
              'Sx':'00', 'xS':'00', 'Cx':'::', 'xC':'::',
              'Dx':'ap', 'xD':'mm' };
              
var morph = { 'Hx':'00', 'xH':'00', 'Mx':'00', 'xM':'00', 
              'Sx':'00', 'xS':'00', 'Cx':'00', 'xC':'00',
              'Dx':'00', 'xD':'00' };
              
var img_source = {};

function quickMorph() {
   return Math.round(t/10);
}

function slowMorph() {
   return Math.round(((main['xS']-5)*1000+t)/50);
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

    h = currentTime.getHours();
    m = currentTime.getMinutes();
    s = currentTime.getSeconds();
    t = currentTime.getMilliseconds();

    setTimeout('renderTime()',100);

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
       main['xH'] = main['xH'] + "0";
       if (main['Mx'] == 5
        && main['xM'] == 9
        && main['Sx'] == 5
        && main['xS'] >= 5) {
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
       if (main['xM'] == 9
        && main['Sx'] == 5
        && main['xS'] >= 5) {
          morph['xH'] = doubleDigit(slowMorph());
       }
    }
    else {
       main['Mx'] = addNextDigit(main['Mx']);
    }
    
    // minutes part 2
    if (main['xM'] == 9) {
       main['xM'] = main['xM'] + "0";
       if (main['Sx'] == 5
        && main['xS'] >= 5) {
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
    img_source['digit-' + time_format + '-Hx'] = main['Hx'] + "-" + morph['Hx'];
    img_source['digit-' + time_format + '-xH'] = main['xH'] + "-" + morph['xH'];
    img_source['digit-' + time_format + '-Mx'] = main['Mx'] + "-" + morph['Mx'];
    img_source['digit-' + time_format + '-xM'] = main['xM'] + "-" + morph['xM'];
    img_source['colon-' + time_format + '-Cx'] = main['Cx'] + "-" + morph['Cx'];
    if (show_seconds) {
       img_source['digit-' + time_format + '-Sx'] = main['Sx'] + "-" + morph['Sx'];
       img_source['digit-' + time_format + '-xS'] = main['xS'] + "-" + morph['xS'];
       img_source['colon-' + time_format + '-xC'] = main['xC'] + "-" + morph['xC'];
    }
    if (show_daytime) {
       img_source['alpha-' + time_format + '-Dx'] = main['Dx'] + "-" + morph['Dx'];
       img_source['alpha-' + time_format + '-xD'] = main['xD'] + "-" + morph['xD'];
    }
    for (var src in img_source) {
      img_source[src] = "svg/md-" + img_source[src] + ".svg";
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

