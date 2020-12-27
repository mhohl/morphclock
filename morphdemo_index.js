/* morphdemo_index.js */
function setDIVMorphFormat(id, format) {
    let div = document.getElementById(id);
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
    div.setAttribute("data-format", format);
    Morph.init();
}

function setDIVStrokeColor(id, color) {
    let div = document.getElementById(id);
    div.style.stroke = color;
}

function setDIVWidth(id, width) {
    let div = document.getElementById(id);
    let type = div.getAttribute('data-type').slice(5); // entferne 'morph'
    div.style.width = width;
    // finde das passende MorphDisplay-Objekt
    Morph.elements[type].forEach(m => {
        if (m.div.id == id) {
            div.style.height = m.height + 'px';
        }
    });
}
$('[id^=morphdemo_]').click(function() {
    // filtere 'morphdemo_' weg
    var id = $(this).attr('id').substring(10);
    switch (id) {
        case 'red':
        case 'yellow':
        case 'green':
        case 'blue':
        case 'black':
            setDIVStrokeColor('morph-container-0', id);
            break;
        case 'grad':
            setDIVStrokeColor('morph-container-0', 'url(#Gradient-1)');
            break;
        case '50percent':
        case '75percent':
        case '100percent':
        case '666px':
            var size = id.replace("percent", "%");
            setDIVWidth('morph-container-0', size);
            break
        case 'D.M.Y':
        case 'D-M-Y':
        case 'D/M/Y':
        case 'Y-M-D':
        case 'Y/M/D':
        case 'full':
        case 'full-de':
            setDIVMorphFormat('morph-container-1', id);
            break;
        case 'MonthDY':
            setDIVMorphFormat('morph-container-1', 'Month D,Y');
        case 'hhmm12':
        case 'hhmmss12':
        case 'hhmm24':
        case 'hhmmss24':
            setDIVMorphFormat('morph-container-2', id);
            break;
        case 'timertoggle':
            Morph.elements.timer.forEach(m => {
                if (m.div.id == 'morph-container-3') {
                    m.timer.startstop();
                }
             });
            break;
        case 'timerreset':
            Morph.elements.timer.forEach(m => {
                if (m.div.id == 'morph-container-3') {
                    m.timer.reset();
                }
             });
            break;
        default:
            // keine vernünftige Eingabe
    }
});
