/*
   morphclock.js
   © 2018 Marc Hohl
*/

/* TODO:
   Uhrzeit, 2a,2b, 1->3
   Buttons
   Tests!!!
*/

"use strict";
/* Container für alle morph-Objekte und Funktionen
   Morph und Morph.path werden in morphpaths.js
   definiert/gefüllt.
*/
Morph.elements = [];
Morph.elements.clock = [];
Morph.elements.date = [];
Morph.elements.logo = [];

/* Morph.data enthält die Struktur der angezeigten Daten/Zeiten;
   in den Slots steht 'x' als Platzhalter für die unbeteiligte
   Stelle, und ein Buchstabe für:
   s Sekunde
   m Minute
   h Stunde
   c Doppelpunkt (colon); C phasenverschobener Doppelpunkt
   d Wechsel am/pm (day time)
   D Tag
   M Monat (zweistellig: in Ziffern, dreistellig: Abkürzung)
   Y Jahr
   W Wochentag (dreistellig als Abkürzung)
   Unter 'default' sind die Formate angegeben, die ohne explizite
   Vorgabe angezeigt werden.
*/

Morph.data = {
  default: {
    clock: 'hhmmss24',
    date:  'D.M.Y',
    logo:  'default'
  },

  clock: {
    hhmmss24: [
      { glyph: '20-00', slot: 'hx' },
      { glyph: '30-00', slot: 'xh' },
      { glyph: '::-00', slot: 'Cx' },
      { glyph: '50-00', slot: 'mx' },
      { glyph: '90-00', slot: 'xm' },
      { glyph: '::-00', slot: 'cx' },
      { glyph: '50-00', slot: 'sx' },
      { glyph: '90-00', slot: 'xs' }
    ],
    hhmm24: [
      { glyph: '20-00', slot: 'hx' },
      { glyph: '30-00', slot: 'xh' },
      { glyph: '::-00', slot: 'cx' },
      { glyph: '50-00', slot: 'mx' },
      { glyph: '90-00', slot: 'xm' },
    ],
    hhmmss12: [
      { glyph: '10-00', slot: 'hx' },
      { glyph: '21-00', slot: 'xh' },
      { glyph: '::-00', slot: 'Cx' },
      { glyph: '50-00', slot: 'mx' },
      { glyph: '90-00', slot: 'xm' },
      { glyph: '::-00', slot: 'cx' },
      { glyph: '50-00', slot: 'sx' },
      { glyph: '90-00', slot: 'xs' },
      { glyph: '~',     slot: null },
      { glyph: 'ap-00', slot: 'dx' },
      { glyph: 'mm-00', slot: 'xd' }
    ],
    hhmm12: [
      { glyph: '10-00', slot: 'hx' },
      { glyph: '21-00', slot: 'xh' },
      { glyph: '::-00', slot: 'cx' },
      { glyph: '50-00', slot: 'mx' },
      { glyph: '90-00', slot: 'xm' },
      { glyph: '~',     slot: null },
      { glyph: 'ap-00', slot: 'dx' },
      { glyph: 'mm-00', slot: 'xd' }
    ],
  },

  date: {
    'D/M/Y': [
      { glyph: '30-00', slot: 'Dx' },
      { glyph: '11-00', slot: 'xD' },
      { glyph: '/',     slot: null },
      { glyph: '10-00', slot: 'Mx' },
      { glyph: '21-00', slot: 'xM' },
      { glyph: '/',     slot: null },
      { glyph: '12-00', slot: 'Yxxx' },
      { glyph: '90-00', slot: 'xYxx' },
      { glyph: '90-00', slot: 'xxYx' },
      { glyph: '90-00', slot: 'xxxY' },
    ],
    'D.M.Y': [
      { glyph: '30-00', slot: 'Dx' },
      { glyph: '11-00', slot: 'xD' },
      { glyph: '.',     slot: null },
      { glyph: '10-00', slot: 'Mx' },
      { glyph: '21-00', slot: 'xM' },
      { glyph: '.',     slot: null },
      { glyph: '12-00', slot: 'Yxxx' },
      { glyph: '90-00', slot: 'xYxx' },
      { glyph: '90-00', slot: 'xxYx' },
      { glyph: '90-00', slot: 'xxxY' },
    ],
    'D-M-Y': [
      { glyph: '30-00', slot: 'Dx' },
      { glyph: '11-00', slot: 'xD' },
      { glyph: '-',     slot: null },
      { glyph: '10-00', slot: 'Mx' },
      { glyph: '21-00', slot: 'xM' },
      { glyph: '-',     slot: null },
      { glyph: '12-00', slot: 'Yxxx' },
      { glyph: '90-00', slot: 'xYxx' },
      { glyph: '90-00', slot: 'xxYx' },
      { glyph: '90-00', slot: 'xxxY' },
    ],
    'Y/M/D': [
      { glyph: '12-00', slot: 'Yxxx' },
      { glyph: '90-00', slot: 'xYxx' },
      { glyph: '90-00', slot: 'xxYx' },
      { glyph: '90-00', slot: 'xxxY' },
      { glyph: '/',     slot: null },
      { glyph: '10-00', slot: 'Mx' },
      { glyph: '21-00', slot: 'xM' },
      { glyph: '/',     slot: null },
      { glyph: '30-00', slot: 'Dx' },
      { glyph: '11-00', slot: 'xD' }
    ],
    'Y-M-D': [
      { glyph: '12-00', slot: 'Yxxx' },
      { glyph: '90-00', slot: 'xYxx' },
      { glyph: '90-00', slot: 'xxYx' },
      { glyph: '90-00', slot: 'xxxY' },
      { glyph: '-',     slot: null },
      { glyph: '10-00', slot: 'Mx' },
      { glyph: '21-00', slot: 'xM' },
      { glyph: '-',     slot: null },
      { glyph: '30-00', slot: 'Dx' },
      { glyph: '11-00', slot: 'xD' }
    ],
    'Month D,Y': [
      { glyph: 'dj-00', slot: 'Mxx' },
      { glyph: 'ea-00', slot: 'xMx' },
      { glyph: 'cn-00', slot: 'xxM' },
      { glyph: '~',     slot: null },
      { glyph: '30-00', slot: 'Dx' },
      { glyph: '11-00', slot: 'xD' },
      { glyph: ',',     slot: null },
      { glyph: '12-00', slot: 'Yxxx' },
      { glyph: '90-00', slot: 'xYxx' },
      { glyph: '90-00', slot: 'xxYx' },
      { glyph: '90-00', slot: 'xxxY' },
    ],
    'full': [
      { glyph: 'fs-00', slot: 'Wxx' },
      { glyph: 'ra-00', slot: 'xWx' },
      { glyph: 'it-00', slot: 'xxW' },
      { glyph: ',',     slot: null },
      { glyph: 'dj-00', slot: 'Mxx' },
      { glyph: 'ea-00', slot: 'xMx' },
      { glyph: 'cn-00', slot: 'xxM' },
      { glyph: '~',     slot: null },
      { glyph: '30-00', slot: 'Dx' },
      { glyph: '11-00', slot: 'xD' },
      { glyph: ',',     slot: null },
      { glyph: '12-00', slot: 'Yxxx' },
      { glyph: '90-00', slot: 'xYxx' },
      { glyph: '90-00', slot: 'xxYx' },
      { glyph: '90-00', slot: 'xxxY' },
    ],
  },

  logo: {
    default: [
      { glyph: 'm',       slot: null },
      { glyph: 'o',       slot: null },
      { glyph: 'r',       slot: null },
      { glyph: 'p',       slot: null },
      { glyph: 'h',       slot: null },
      { glyph: 'c',       slot: null },
      { glyph: 'l',       slot: null },
      { glyph: 'clock-0', slot: 'clock' },
      { glyph: 'c',       slot: null },
      { glyph: 'k',       slot: null }
    ]
  }
};

Morph.init = function () {
  let divs = document.body.getElementsByTagName("div");

  // wir durchsuchen alle <div>-Elements nach data-type="morph..."
  for (let i = 0; i < divs.length; i++) {
    let datatype = divs[i].getAttribute("data-type");

    // Zur Sicherheit genauer Check:
    if (datatype == "morphclock" ||
        datatype == "morphdate" ||
        datatype == "morphlogo") {
      let type = datatype.slice(5); // morphclock -> clock etc.

      Morph.elements[type].push(new MorphDisplay(type, divs[i])
                         .createGlyphs());
    }
  }
}

Morph.update = function () {
  for (let type in Morph.elements) {
    Morph.elements[type].forEach(m => m.update());
  };
}

// der svg-namespace
const xmlns = "http://www.w3.org/2000/svg";


/* Das MorphDisplay-Objekt
   'type' bestimmt den dargestellten Typ (clock, date, logo),
   'div' das <div>-Element, das die Glyphen aufnimmt, sowie
   'glyphs' ein Array der einzelnen MorphGlyph-Objekte
*/

var MorphDisplay = class MorphDisplay {
  constructor(type, div, glyphs = [], slots = []) {
    this.type = type;
    this.div = div;
    this.format = div.getAttribute("data-format") || Morph.data.default[type];
    this.glyphs = glyphs;
    this.slots = slots;

    /* Die einzelnen Glyphen bzw. SVG-Elemente überlappen sich an den Rändern;
       Ziffern und Buchstaben um den Faktor smallOverlap, Interpunktionen und
       Leerzeichen um bigOverlap.
    */
    this.smallOverlap = 0.2;
    this.bigOverlap = 2 * this.smallOverlap;

    this.slowMorphStart = 7;
  }

  get charWidth() {
    // number of characters
    let n_of_chars = Morph.data[this.type][this.format].length;
     // number of [s]mall/[b]ig [over]laps
    let n_of_sover = 0;
    let n_of_bover = 0;

    if (this.type == "logo") {
      // n Zeichen -> n-1 Überlappungen
      n_of_sover = n_of_chars - 1;
    }
    else if (this.type == "clock") {
      // zwei small overlaps, je einer für Stunden und Minuten
      n_of_sover = 2;
      // zwei big overlaps für den ':' vor den Minuten
      n_of_bover = 2;
      if (this.showDaytime) {
        // small overlap zwischen 'a|p' and 'm'
        n_of_sover += 1;
        // zwei big overlaps für das Leerzeichen vor 'am|pm'
        n_of_bover += 2;
      }
      if (this.showSeconds) {
        // small overlap für die Sekunden
        n_of_sover += 1;
        // zwei big overlaps für den ':' vor den Sekunden
        n_of_bover += 2;
      }
    }
    else if (this.type == "date") {
      // 1x Tag, 1x Monat, 3x Jahr
      n_of_sover = 5;
      // je 2 pro Trenner (,.-/~)
      n_of_bover = 4;
      if (this.showMonth) {
        // Monat 3stellig statt 2stellig
        n_of_sover += 1;
      }
      if (this.showWeekday) {
        // 3stelliger Wochentag
        n_of_sover += 2;
        // zusätzlicher Trenner nach Wochentag
        n_of_bover += 2;
      }
    }

    return 100/(n_of_chars -
                n_of_sover * this.smallOverlap -
                n_of_bover * this.bigOverlap);
  }

  get charPos() {
    let positions = [];
    let pos = 0;
    let width = this.charWidth;

    positions.push(pos);
    let data = Morph.data[this.type][this.format];

    for (let i = 1, dlen = data.length; i < dlen; i++) {
      /* Die folgende if-Anweisung überprüft, ob
         entweder der Glyph aus einem der Zeichen ,.-:~/ besteht
         oder der slot nicht null ist
              und nicht mit einem x startet
              und auch nicht 'clock' lautet.
         Dann nämlich wird ein großer Überlapp notwendig
      */
      let d = data[i];
      if ([',', '.', '-', ':', '~', '/'].some(x => x == d.glyph) ||
          (d.slot && d.slot.charAt(0) != 'x' && d.slot != 'clock')) {
        pos += width * (1 - this.bigOverlap);
      }
      else {
        pos += width * (1 - this.smallOverlap);
      }
      positions.push(pos);
    }

    return positions;
  }

  get height() {
    let children = this.div.children;

    if (children.length > 0)
      return children[0].getBoundingClientRect().height;
    return 0;
  }

  get showDaytime() {
    return (this.type == "clock") &&
           (this.format.indexOf("12") > -1);
  }

  get showSeconds() {
    return (this.type == "clock") &&
           (this.format.indexOf("ss") > -1);
  }

  get showMonth() {
    return Morph.data[this.type][this.format].some(x => x.slot == 'Mxx');
  }

  get showWeekday() {
    return Morph.data[this.type][this.format].some(x => x.slot == 'Wxx');
  }
}

// Erzeuge Glyphen aus den in Morph.data hinterlegten Formaten
MorphDisplay.prototype.createGlyphs = function() {
  let width = this.charWidth;
  let xpos = this.charPos;
  let data = Morph.data[this.type][this.format];

  for (let i = 0, dlen = data.length; i < dlen; i++){
    let newglyph = new MorphGlyph(data[i].glyph,
                             this.div,
                             width + "%",
                             xpos.shift() + "%");

    let slot = data[i].slot || data[i].glyph;
    // data[i].slot ist null bei ungemorphten Glyphen, wir wollen
    // eine aussagekräftigere Klassenbenennung
    newglyph.svg.setAttribute('class', this.type + "-" +
                                       this.format + "-" +
                                       slot);

    this.glyphs.push(newglyph);
    this.slots.push(slot);
  }
  // setze die Höhe des parent-div:
  this.div.style.height = this.height;

  return this;
}

// Funktionen zum Morphen
MorphDisplay.prototype.doubleDigit = function(x) {
  return x < 10 ? x = "0" + x : x ;
}

MorphDisplay.prototype.quickMorph = function(now) {
  return this.doubleDigit(Math.floor(now.milliseconds / 10));
}

MorphDisplay.prototype.slowMorph = function(now) {
  let xS = now.seconds % 10;
  let t = now.milliseconds;
  let x = this.slowMorphStart;
  return this.doubleDigit(Math.floor(((xS - x) * 1000 + t) / ((10 - x) * 10)));
}

MorphDisplay.prototype.addNextDigit = function(x) {
  return this.doubleDigit(x * 10 + x + 1);
}

// Funktionen zum Update

MorphDisplay.prototype.logo = {};
MorphDisplay.prototype.clock = {};
MorphDisplay.prototype.date = {};

MorphDisplay.prototype.clock.update = function(now) {
  let h = now.hours;
  let m = now.minutes;
  let s = now.seconds;

  let main = {}, morph = {};

  // im 12h-Modus ist Mitternacht 12:00pm
  if (this.showDaytime) {
    main['xd'] = 'mm';
    if (h == 0) {
      h = 12;
      main['dx'] = 'pa';
    }
    else if (h >= 1 && h <= 12) {
      main['dx'] = 'ap';
    }
    else if (h > 12) {
      h = h - 12;
      main['dx'] = 'pa';
    }
  }

  let hx = Math.floor(h/10); // Zehner- und
  let xh = h % 10;           // Einerstelle
  let mx = Math.floor(m/10);
  let xm = m % 10;
  let sx = Math.floor(s/10);
  let xs = s % 10;

  let maxh = this.format.slice(-2); // 12h oder 24h?
  maxh = (maxh == 24 ? 23 : maxh);
  let maxhx = Math.floor(maxh/10); // maximal erreichbare Zehnerstelle

  main['cx'] = '::';
  main['Cx'] = '::';

  let slow_morph = (xs >= this.slowMorphStart);

  // Sekunden
  if (sx == 5) {
    main['sx'] = sx + "0";
    if (slow_morph) {
      morph['xm'] = this.slowMorph(now);
    }
  }
  else {
    main['sx'] = this.addNextDigit(sx);
  }

  morph['xs'] = this.quickMorph(now);

  if (xs == 9) {
    main['xs'] = xs + "0";
    morph['sx'] = morph['xs'];
  }
  else {
    main['xs'] = this.addNextDigit(xs);
  }
  /* Der rechte Doppelpunkt läuft synchron mit den
     Sekunden, der linke ist um 50% phasenverschoben.
  */
  morph['cx'] = morph['xs'];
  morph['Cx'] = this.doubleDigit((this.quickMorph(now) + 50) % 100);

  // Minuten
  slow_morph = slow_morph && (sx == 5);

  if (xm == 9) {
    main['xm'] = xm + "0";
    if (slow_morph) {
      morph['mx'] = this.slowMorph(now);
    }
  }
  else {
    main['xm'] = this.addNextDigit(xm);
  }

  slow_morph = slow_morph && (xm == 9);

  if (mx == 5) {
    main['mx'] = mx + "0";
    if (slow_morph) {
      morph['xh'] = this.slowMorph(now);
    }
  }
  else {
    main['mx'] = this.addNextDigit(mx);
  }

  slow_morph = slow_morph && (mx == 5);

  // Stunden
  if (h == maxh || xh == 9) {
    if (h == maxh && this.showDaytime) {
      // Übergang "12" -> "01"
      main['xh'] = xh + "1";
    }
    else {
      main['xh'] = xh + "0";
    }
    if (slow_morph) {
      morph['hx'] = this.slowMorph(now);
      if (h == maxh) {
        morph['dx'] = morph['hx'];
        morph['xd'] = morph['hx'];
      }
    }
  }
  else {
    main['xh'] = this.addNextDigit(xh);
  }

  if (hx == maxhx) {
    main['hx'] = hx + "0";
  }
  else {
    main['hx'] = this.addNextDigit(hx);
  }
  // wende Änderungen an ...
  /* Wir gehen von den main-Einträgen aus, da es auch Slots
     gibt, die null sind
  */
  for (let key of Object.keys(main)) {
    let idx = this.slots.findIndex(x => x == key);
    if (idx > -1) {
       this.glyphs[idx].type = main[key] + "-" + (morph[key] || "00");
    }
  }
}

MorphDisplay.prototype.date.update = function(now) {
  let Y = now.year;
  let M = now.month; // Januar = 1
  let D = now.day;
  let W = now.weekday;
  let h = now.hours;
  let m = now.minutes;
  let s = now.seconds;

  let Yxxx = Math.floor(Y/1000);
  let xYxx = Math.floor(Y/100) % 10;
  let xxYx = Math.floor(Y/10) % 10;
  let xxxY = Y % 10;
  let Mx = Math.floor(M/10);
  let xM = M % 10;
  let Dx = Math.floor(D/10);
  let xD = D % 10;

  const weekday = [
    // lies ↓ mon ↓ tue ↓ wed ...
    ['sm', 'mt', 'tw', 'wt', 'tf', 'fs', 'ss'],
    ['uo', 'ou', 'ue', 'eh', 'hr', 'ra', 'au'],
    ['nn', 'ne', 'ed', 'du', 'ui', 'it', 'tn']
  ];

  const month = [
    // Monat geht von 1 bis 12, daher ist der Eintrag mit Index 0 leer definiert
    ['', 'jf', 'fm', 'ma', 'am', 'mj', 'jj', 'ja', 'as', 'so', 'on', 'nd', 'dj'],
    ['', 'ae', 'ea', 'ap', 'pa', 'au', 'uu', 'uu', 'ue', 'ec', 'co', 'oe', 'ea'],
    ['', 'nb', 'br', 'rr', 'ry', 'yn', 'nl', 'lg', 'gp', 'pt', 'tv', 'vc', 'cn']
  ]

  const lastDayOfMonth = [-1, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (now.leapYear) {
    lastDayOfMonth[2] = 29;
  }

  let main = {};

  let morph = {};

  let slow_morph = (h == 23 && m == 59 && s >= (50 + this.slowMorphStart));

  if (slow_morph) {
    morph['xD'] = this.slowMorph(now);
    morph['Wxx'] = this.slowMorph(now);
    morph['xWx'] = this.slowMorph(now);
    morph['xxW'] = this.slowMorph(now);
  }

  // Tage

  let slow_morph_add = false; // um komplexere Bedingungen abzufangen

  main['Wxx'] = weekday[0][W];
  main['xWx'] = weekday[1][W];
  main['xxW'] = weekday[2][W];

  if (xD == 9) {
    main['xD'] = xD + "0";
    slow_morph_add = true;
    if (slow_morph) {
      morph['Dx'] = this.slowMorph(now);
    }
  }
  // Monatsende
  else if (D == lastDayOfMonth[M]) {
    main['xD'] = xD + "1";
    slow_morph_add = true;
    if (slow_morph) {
      morph['Dx'] = this.slowMorph(now);
    }
  }
  else {
    main['xD'] = this.addNextDigit(xD);
    slow_morph_add = false;
  }

  slow_morph = slow_morph && slow_morph_add;

  if (Dx == 3) {
    main['Dx'] = Dx + "0";
    slow_morph_add = true;
    if (slow_morph) {
      morph['xM'] = this.slowMorph(now);
      // Monatsname
      morph['xxM'] = this.slowMorph(now);
      morph['xMx'] = this.slowMorph(now);
      morph['Mxx'] = this.slowMorph(now);
    }
  }
  else if (M == 2 && D == 28 && !now.leapYear) {
    main['Dx'] = Dx + "0";
    slow_morph_add = true;
    if (slow_morph) {
      morph['xM'] = this.slowMorph(now);
      // Monatsname
      morph['xxM'] = this.slowMorph(now);
      morph['xMx'] = this.slowMorph(now);
      morph['Mxx'] = this.slowMorph(now);
    }
  }
  else if (M == 2 && D == 29) {
    main['Dx'] = Dx + "0";
    slow_morph_add = true;
    if (slow_morph) {
      morph['xM'] = this.slowMorph(now);
      // Monatsname
      morph['xxM'] = this.slowMorph(now);
      morph['xMx'] = this.slowMorph(now);
      morph['Mxx'] = this.slowMorph(now);
    }
  }
  else {
    main['Dx'] = this.addNextDigit(Dx);
    slow_morph_add = false;
  }

  slow_morph = slow_morph && slow_morph_add;

  // Monate

  main['Mxx'] = month[0][M];
  main['xMx'] = month[1][M];
  main['xxM'] = month[2][M];

  if (xM == 9) {
    main['xM'] = xM + "0";
    slow_morph_add = true;
    if (slow_morph) {
      morph['Mx'] = this.slowMorph(now);
    }
  }
  else if (M == 12) {
    main['xM'] = xM + "1";
    slow_morph_add = true;
    if (slow_morph) {
      morph['Mx'] = this.slowMorph(now);
    }
  }
  else {
    main['xM'] = this.addNextDigit(xM);
    slow_morph_add = false;
  }

  slow_morph = slow_morph && slow_morph_add;

  if (M == 12) {
    main['Mx'] = Mx + "0";
    if (slow_morph) {
      morph['xxxY'] = this.slowMorph(now);
    }
  }
  else {
    main['Mx'] = this.addNextDigit(Mx);
  }

  slow_morph = slow_morph && (M == 12);

  // Jahre

  if (xxxY == 9) {
    main['xxxY'] = xxxY + "0";
    if (slow_morph) {
      morph['xxYx'] = this.slowMorph(now);
    }
  }
  else {
    main['xxxY'] = this.addNextDigit(xxxY);
  }

  slow_morph = slow_morph && (xxxY == 9);

  if (xxYx == 9) {
    main['xxYx'] = xxYx + "0";
    if (slow_morph) {
      morph['xYxx'] = this.slowMorph(now);
    }
  }
  else {
    main['xxYx'] = this.addNextDigit(xxYx);
  }

  slow_morph = slow_morph && (xxYx == 9);

  if (xYxx == 9) {
    main['xYxx'] = xYxx + "0";
    if (slow_morph) {
      morph['Yxxx'] = this.slowMorph(now);
    }
  }
  else {
    main['xYxx'] = this.addNextDigit(xYxx);
  }

  if (Yxxx == 9) {
    main['Yxxx'] = Yxxx + "0";
  }

  else {
    main['Yxxx'] = this.addNextDigit(Yxxx);
  }

  for (let key of Object.keys(main)) {
    let idx = this.slots.findIndex(x => x == key);
    if (idx > -1) {
      this.glyphs[idx].type = main[key] + "-" + (morph[key] || "00");
    }
  }
}

MorphDisplay.prototype.logo.update = function(now) {
  let m = now.minutes;
  let h = now.hours;

  let glyphnum = (h * 60 + m) % 720;
  let idx = this.slots.findIndex(x => x == "clock");
  this.glyphs[idx].type = this.glyphs[idx].prefix + glyphnum;
}

MorphDisplay.prototype.update = function() {
  let offset = 0 * 24 * 60 * 60 * 1000 + // Tage
                    5 * 60 * 60 * 1000 + // Stunden
                        39 * 60 * 1000 ; // Minuten
  offset = 0;
  let now = new MorphTimeDate(offset);
  // wir übergeben 'this' an die jeweilige Funktion:
  this[this.type].update.call(this, now);
}


/* Das MorphGlyph-Objekt:
   'type' bestimmt die Art des Glyphen,
   'div' das übergeordnete <div> Element,
   'width' die Breite, sowie optimonal 'xpos', das – falls gesetzt –
   eine absolute Positionierung der Glyphen erlaubt

   '_glyphtype' ist die interne Variable, die den 'type'-Wert hält,
   während 'type' als setter definiert ist und 'prefix' den festen
   Anteil des Glyphtypen inkl. Bindestrich zurückliefert; somit
   kann der neue Glyph durch glyph.type = glyph.prefix + morph
   leicht geändert werden.
*/

var MorphGlyph = class MorphGlyph {
  constructor(_glyphtype, div, width, xpos) {
    this._glyphtype = _glyphtype;
    this.div = div;
    this.width = width;
    this.xpos = xpos;

    let svg = document.createElementNS (xmlns, "svg");
    svg.setAttribute('width', width);
    svg.setAttribute('viewBox', "0 0 " + Morph.path.metainfo.width
                                + " " + Morph.path.metainfo.height);
    if (xpos) {
      svg.setAttribute('style', "position: absolute; " +
                       "top: " + "0px" + "; " +
                       "left: " + xpos);
    }
    div.appendChild(svg);
    Morph.path[_glyphtype].forEach(p => svg.appendChild(this.buildPath(p)));
    this.svg = svg;
  }

  get prefix() {
    // der Teil des Glyphnamen ohne Morphanteil,
    //  z.B. 'am-00' -> 'am-'
    let idx = this._glyphtype.indexOf('-');

    if (idx > -1 )
      return this._glyphtype.slice(0, idx + 1);
    return this._glyphtype; // kein Morphanteil
  }

  set type(t) {
    // wir ändern die Pfadinformation nur wenn nötig!
    if (t != this._glyphtype) {
      let svg = this.svg;
      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }
      if (!Morph.path[t]) {
        console.log("Glyph ",t , " missing, using '*' instead.");
        t = '*';
      }
      Morph.path[t].forEach(p => svg.appendChild(this.buildPath(p)));
      this.svg = svg;
      this._glyphtype  = t;
    }
  }
}

// erstelle aus den gespeicherten Pfadinformationen ein <path>-Element

MorphGlyph.prototype.buildPath = function (p) {
  const path = document.createElementNS (xmlns, "path");
  const attrs = ['stroke-width', 'stroke-linecap',
                 'stroke-linejoin', 'stroke-miterlimit',
                 'fill'];

  path.setAttribute('class', "morph-svg-path");
  for (let i = 0, alen = attrs.length; i < alen; i++) {
    let attr = attrs[i];
    path.setAttribute(attr, Morph.path.metainfo[attr]);
  }
  path.setAttribute ('d', p);
  return path;
}

/* Das MorphTimeDate-Objekt ist eine Kopie vom Date-Objekt
   mit zusätzlichen Eigenschaften
*/

//TODO

var MorphTimeDate = class MorphTimeDate {
  constructor (offset = 0) {
    // wir rechnen mit UTC-Zeiten, um die Zeitumstellung bestimmen zu können
    let UTCdate = new Date();
    let month = UTCdate.getUTCMonth();
    let weekday = UTCdate.getUTCDay();
    let day = UTCdate.getUTCDate();
    let hour = UTCdate.getUTCHours();

    this.transition = {};

    if ((month == 2) && // März
        (day > 24) &&
        (weekday == 0) && // am letzen Sonntag
        (hour == 1)) {    // um 1 Uhr UTC
      this.transition['1->3'] = true;
    }
    else if (month == 9) {  // Oktober
      if ((day > 23) &&     // am Samstag vor dem letzten Sonntag im Monat
          (day < 31) &&     // ist der Samstag der 24., dann ist am 31 wieder
          (weekday == 6) && // ein Samstag
          (hour == 23)) {
        this.transition['1->2a'] = true;
      }
      else if ((day > 24) &&
               (weekday == 0)) { // am letzen Sonntag
        if (hour == 0) {
          this.transition['2a->2b'] = true;
        }
        else if (hour == 1) {
          this.transition['2b->3'] = true;
        }
      }
    }

    let TZoffset = 1; // Timezone Offset
    if (
        (month > 2 && month < 9) // April bis September
        ||
        (
          (month == 2 && day > 24) &&
          (
            (weekday == 0 && hour>=1) ||
            (weekday > 0 && (day - weekday) > 24)
          )
        ) // oder nach 1:00 Uhr im letzen Sonntag im März
        ||
        (
          (month == 9) &&
          !(
            (day > 24) &&
            (
              (weekday == 0 && hour >= 1) ||
              (weekday > 0 && (day - weekday) > 24)
            )
          )
        ) // oder vor 1:00 Uhr im letzen Sonntag im Oktober
      ) {
      TZoffset = 2;
    }
    this.localdate = new Date(UTCdate.valueOf() +
                              TZoffset * 60 * 60 * 1000
                              + offset); // ggf. offset zum Testen
  }

  get year() {
    return this.localdate.getUTCFullYear();
  }

  get month() {
    return this.localdate.getUTCMonth() + 1;
  }

  get day() {
    return this.localdate.getUTCDate();
  }

  get weekday() {
    return this.localdate.getUTCDay();
  }

  get hours() {
    // wichtig: hier getUTCHours(), sonst wird die Zeitzone
    // nochmals dazuaddiert
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

var testnow = new MorphTimeDate();
console.log(testnow.year, testnow.leapYear);



window.onload = function() {
    Morph.init();
}