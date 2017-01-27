var img_slot = {};

var time_fomat;

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

function getMorphclockElement(){
    return document.getElementById('morphclock');
}

function getTimeFormat() {
    // get time format
    var format = getMorphclockElement().getAttribute('data-format');
    return format;
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

