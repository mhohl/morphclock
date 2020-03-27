/* morphdemo_allglyphs.js */
/*
 * Wir verteilen die gesamten Pfade auf die drei Bereiche
 * standalone, transition und clock:
 */
const standalone = {};
const transition = {};
const exampleWidth = "12.5%";
for (let key of Object.keys(Morph.path)) {
    if (key.length < 3 && key != "~") { // 2a, 2b
        standalone[key] = Morph.path[key];
    } else if (key.slice(-2) == "-0" && key.indexOf('clock') < 0) {
        transition[key] = Morph.path[key];
    }
}
// die standalone-Glyphen
const skeys = Object.keys(standalone).sort();
const sglyphs = [];
const sdiv = document.getElementById('standalone');
for (let key of skeys) {
    sglyphs.push(new MorphGlyph(key, sdiv, exampleWidth));
}
// die transition-Glyphen
var tkeys = Object.keys(transition).sort();
const tglyphs = [];
const tdiv = document.getElementById('transition');
for (let key of tkeys) {
    tglyphs.push(new MorphGlyph(key, tdiv, exampleWidth));
}
// die Uhr
const cdiv = document.getElementById('clock');
const cglyph = new MorphGlyph('clock-0', cdiv, exampleWidth);
// wir stellen die Uhr auf die aktuelle Zeit:
let currentTime = new Date;
let h = currentTime.getHours();
let m = currentTime.getMinutes();
let s = currentTime.getSeconds();
let clockstart = (h * 60 + m) % 720;
let startmin = m;
let startsec = s;
cglyph.type = cglyph.prefix + clockstart;
Morph.update = function() {
    currentTime = new Date();
    m = currentTime.getMinutes();
    s = currentTime.getSeconds();
    t = currentTime.getMilliseconds();
    var morph = 0;
    tglyphs.forEach(g => {
        let xS = s % 5;
        if (xS == 0) {
            morph = "0";
        } else if (xS < 4) {
            // slowmorph-Definition
            morph = Math.floor(((xS - 1) * 1000 + t) / 30);
        } else {
            morph = "99";
        }
        g.type = g.prefix + morph;
    });
    // die Uhr läuft 60× schneller als gewöhnlich
    let offset = ((m - startmin) * 60 + (s - startsec));
    morph = (offset + clockstart) % 720;
    cglyph.type = "clock-" + morph;
}