/* morphdemo_index.js */
var mc = new MorphClock('morphclockdemo');
var md = new MorphDate('morphdatedemo');
var ml = new MorphLogo('morphlogodemo');
var mt = new MorphTimer('morphtimerdemo', "01:00");

$('#morphdemo_timertoggle').click(function() {
    console.log("toggle");
    mt.startstop();
});
$('#morphdemo_timerreset').click(function() {
    mt.reset();
});
$('[id^=morphdemo_]').click(function() {
    // filtere 'morphdemo_' weg
    var id = $(this).attr('id').substring(10);
    switch (id) {
        case 'red':
        case 'yellow':
        case 'green':
        case 'blue':
        case 'black':
            ml.container.style.stroke = id;
            break;
        case 'grad':
            ml.container.style.stroke = 'url(#Gradient-1)';
            break;
        case '50percent':
        case '75percent':
        case '100percent':
        case '666px':
            var size = id.replace("percent", "%");
            ml.width = size;
            break
        case 'D.M.Y':
        case 'D-M-Y':
        case 'D/M/Y':
        case 'Y-M-D':
        case 'Y/M/D':
        case 'full':
        case 'full-de':
            md.format = id;
            break;
        case 'MonthDY':
            md.format = 'Month D,Y';
        case 'hhmm12':
        case 'hhmmss12':
        case 'hhmm24':
        case 'hhmmss24':
            mc.format = id;
            break;
        default:
            // keine vernünftige Eingabe
    }
});
