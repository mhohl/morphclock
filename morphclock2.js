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
   'glyphs' ein Array der einzelnen Glyph-Objekte
*/

var MorphDisplay = class MorphDisplay {
  constructor(type, div, glyphs, slots) {
    this.type = type;
    this.div = div;
    this.format = div.getAttribute("data-format") || Morph.data.default[type];
    this.glyphs = glyphs || [];
    this.slots = slots || [];

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
    return Morph.data[this.type][this.format].some(x => x.slot == 'xMx');
  }

  get showWeekday() {
    return Morph.data[this.type][this.format].some(x => x.slot == 'xWx');
  }
}

// Erzeuge Glyphen aus den in Morph.data hinterlegten Formaten
MorphDisplay.prototype.createGlyphs = function() {
  let width = this.charWidth;
  let xpos = this.charPos;
  let data = Morph.data[this.type][this.format];

  for (let i = 0, dlen = data.length; i < dlen; i++){
    let newglyph = new Glyph(data[i].glyph,
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
  return this.doubleDigit(Math.floor(now.getMilliseconds()/10));
}

MorphDisplay.prototype.slowMorph = function(now) {
  let xS = now.getSeconds() % 10;
  let t = now.getMilliseconds();
  let x = this.slowMorphStart;
  return this.doubleDigit(Math.floor(((xS-x)*1000+t)/((10-x)*10)));
}

MorphDisplay.prototype.addNextDigit = function(x) {
  return this.doubleDigit(x * 10 + x + 1);
}



// Funktionen zum Update

MorphDisplay.prototype.logo = {};
MorphDisplay.prototype.clock = {};
MorphDisplay.prototype.date = {};

MorphDisplay.prototype.clock.update = function(now) {
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();

  let main = { 'cx': '::',
               'Cx': '::',
               'dx': 'ap' };

  let morph = { 'sx': '00',
                'xm': '00',
                'mx': '00',
                'xh': '00',
                'hx': '00',
                'xd': '00',
                'dx': '00' };

  // im 12h-Modus ist Mitternacht 12:00pm
  if (this.showDaytime) {
    if (h == 0) {
      h = 12;
    }
    else if (h > 12) {
      h = h - 12;
      main['dx'] = "pa";
    }
  }

  let hx = Math.floor(h/10); // Zehner- und
  let xh = h % 10;           // Einerstelle
  let mx = Math.floor(m/10);
  let xm = m % 10;
  let sx = Math.floor(s/10);
  let xs = s % 10;

  let maxh = this.format.slice(-2); // 12h oder 24h?
  maxh = ( maxh == 24 ? 23 : maxh );
  let maxhx = Math.floor(maxh/10); // maximal erreichbare Zehnerstelle

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
  if (this.showSeconds) {
    morph['xs'] = this.quickMorph(now);
    if (xs == 9) {
      main['xs'] = xs + "0";
      morph['sx'] = morph['xs'];
    }
    else {
      main['xs'] = this.addNextDigit(xs);
    }
    /* Doppelpunkt: der rechte Doppelpunkt läuft synchron mit den
       Sekunden, der linke ist um 50% hasenverschoben.
    */
    morph['cx'] = morph['xs'];
    morph['Cx'] = this.doubleDigit((this.quickMorph(now) + 50) % 100);
  }
  else {
    /* Keine Sekunden angezeigt, der einzige Doppelpunkt ist
       synchron zu den Sekunden
    */
    morph['cx'] = this.quickMorph(now);
  }

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
    if (h == maxh && this.showDaytime ) {
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
  let keys = Object.keys(main);
  for (let key of keys) {
    let idx = this.slots.findIndex(x => x == key);
    if (idx > -1) {
       this.glyphs[idx].type = main[key] + "-" + morph[key];
    }
  }
}

MorphDisplay.prototype.date.update = function(now) {
  //console.log("date-update aufgerufen ...");
  let Y = now.getYear();
  let M = now.getMonth() + 1;
  let D = now.getDay();
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();
}

MorphDisplay.prototype.logo.update = function(now) {
  let m = now.getMinutes();
  let h = now.getHours();

  let glyphnum = (h * 60 + m) % 720;
  let idx = this.slots.findIndex(x => x == "clock");
  this.glyphs[idx].type = this.glyphs[idx].prefix + glyphnum;
}

MorphDisplay.prototype.update = function() {
  let now = new Date();
  // wir übergeben 'this' an die jeweilige Funktion:
  this[this.type].update.call(this, now);
}


/* Das Glyph-Objekt:
   'type' bestimmt die Art des Glyphen,
   'div' das übergeordnete <div>-Element,
   'width' die Breite, sowie optimonal 'xpos', das – falls gesetzt –
   eine absolute Positionierung der Glyphen erlaubt

   '_glyphtype' ist die interne Variable, die den 'type'-Wert hält,
   während 'type' als setter definiert ist und 'prefix' den festen
   Anteil des Glyphtypen inkl. Bindestrich zurückliefert; somit
   kann der neue Glyph durch glyph.type = glyph.prefix + morph
   leicht geändert werden.
*/

var Glyph = class Glyph {
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
      return this._glyphtype.slice(0,idx+1);
    return this._glyphtype; // kein Morphanteil
  }

  set type(t) {
    // wir ändern die Pfadinformation nur wenn nötig!
    if (t != this._glyphtype) {
      let svg = this.svg;
      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }
      Morph.path[t].forEach(p => svg.appendChild(this.buildPath(p)));
      this.svg = svg;
      this._glyphtype  = t;
    }
  }
}

// erstelle aus den gespeicherten Pfadinformationen ein <path>-Element

Glyph.prototype.buildPath = function (p) {
  const path = document.createElementNS (xmlns, "path");
  const attrs = ['stroke-width', 'stroke-linecap',
                 'stroke-linejoin', 'stroke-miterlimit',
                 'fill'];

  path.setAttribute('class', "morph-svg-path");
  for (let i = 0, alen = attrs.length; i < alen; i++ ) {
    let attr = attrs[i];
    path.setAttribute(attr, Morph.path.metainfo[attr]);
  }
  path.setAttribute ('d', p);
  return path;
}


window.onload = function() {
    Morph.init();
}