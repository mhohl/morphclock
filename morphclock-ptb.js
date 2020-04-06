/*
  morphclock-ptb.js
  © 2020 Marc Hohl
 */
/*
 * Morph.io ist die Schnittstelle an den Zeitserver der PTB, die
 * mit morphclock-ptb.js aktiviert wird.
 * Vielen Dank an Dr. Martin Gutbrod von der PTB, der die Einwilligung
 * gegeben hat, dass sein Code hier einfließen darf!
 *
 * https://www.ptb.de/cms/fileadmin/internet/publikationen/ptb_mitteilungen/mitt2019/PTB-Mitteilungen_2019_Heft_4.pdf
 * https://uhr.ptb.de/wst/paper
 *
 */
if (typeof Morph === 'undefined') {
    throw new Error("morphclock-ptb.min.js ist nur in Verbindung mit morphclock.min.js nutzbar!");
}
Morph.io.websocket = 0; // WebSocket
Morph.io.active = false; // Verbindung aktiv?
Morph.io.redo = 60000; // zeitlicher Abstand der WebSocket-Anfragen in ms
Morph.io.ppTimeout = 0; // ID des Ping-Pong-Timers, der nach 'redo' wieder aktiv wird
Morph.io.rcTimeout = 0; // ID des Reconnect-Timers
Morph.io.pings = 5; // Anzahl der "Pings"
Morph.io.deltaArray = []; // Array für Laufzeitberechnungen
Morph.io.timeDelta = 0; // Differenz zwischen lokaler Zeit und Serverzeit
Morph.io.leap = 0; // Schaltsekunde?
Morph.io.accuracy = ''; // Genauigkeit
Morph.io.timediff = "--"; // Zeitunterschied local/Server
Morph.io.connected = function(c) {
    if (typeof c !== 'undefined') {
        // wenn keine Verbindung, dann Transparenz
        for (let type in Morph.elements) {
            Morph.elements[type].forEach(m => m.div.style.opacity = c ? 1 : 0.5)
        }
        Morph.io.connected.status = c;
    }
    return Morph.io.connected.status;
}
Morph.io.connected.status = false;
Morph.io.connectWebSocket = function() {
    Morph.io.websocket = new WebSocket('wss://uhr.ptb.de/time', 'time');
    Morph.io.websocket.onmessage = function(ev) {
        var sdata = JSON.parse(ev.data);
        var dtB = performance.now() - sdata.c; // [d]elta [t] [B]rowser
        var tmDlt = performance.now() - sdata.s - (dtB / 2);
        Morph.io.deltaArray.push([tmDlt, dtB, sdata.e]);
        // ist die nächste if-Abfrage notwendig?
        if (Morph.io.deltaArray.length > Morph.io.pings) {
            Morph.io.deltaArray.shift();
            alert("SHIFT called!");
        }
        // sortiere nach kleinstem dtB
        Morph.io.deltaArray.sort((a, b) => a[1] - b[1]);
        // setze tmDlt vom kleinsten dtB-Wert als Zeitkorrektur
        Morph.io.timeDelta = Morph.io.deltaArray[0][0];
        Morph.io.leap = 0;
        Morph.io.accuracy = Math.round((Morph.io.deltaArray[0][1] + Morph.io.deltaArray[0][2]) / 2);
        console.log('#', Morph.io.deltaArray.length, dtB / 2, Morph.io.accuracy, sdata.l);
        if (Morph.io.deltaArray.length < Morph.io.pings) {
            Morph.io.websocket.send(JSON.stringify({
                c: performance.now()
            }));
        } else {
            Morph.io.active = false;
            Morph.io.leap = sdata.l || 0;
            Morph.io.ppTimeout = setTimeout(function() {
                if (Morph.io.websocket.readyState === Morph.io.websocket.OPEN) {
                    Morph.io.deltaArray = [];
                    Morph.io.active = true;
                    Morph.io.websocket.send(JSON.stringify({
                        c: performance.now()
                    }));
                }
            }, Morph.io.redo);
        }
    }
    Morph.io.websocket.onopen = function() {
        if (!Morph.io.active) {
            clearTimeout(Morph.io.ppTimeout);
            clearTimeout(Morph.io.rcTimeout);
            Morph.io.checkWebSocket.init();
            Morph.io.deltaArray = [];
            Morph.io.active = true;
            console.log('Time request start; reason: onopen websocket');
            Morph.io.websocket.send(JSON.stringify({
                c: performance.now()
            }));
            Morph.io.connected(true);
        }
    }
    Morph.io.websocket.onclose = function() {
        clearTimeout(Morph.io.ppTimeout);
        Morph.io.connected(false);
        Morph.io.rcTimeout = setTimeout(Morph.io.checkWebSocket, Morph.io.checkWebSocket.wait);
    }
    Morph.io.websocket.onerror = function() {
        Morph.io.active = false;
        Morph.io.rcTimeout = setTimeout(Morph.io.checkWebSocket, Morph.io.checkWebSocket.wait);
    }
}
Morph.io.checkWebSocket = function(e) {
    if (!Morph.io.websocket || Morph.io.websocket.readyState === 3) {
        console.log('Try reconnect', Morph.io.checkWebSocket.wait);
        Morph.io.connectWebSocket();
        if (!e && Morph.io.checkWebSocket.wait < 120000) {
            Morph.io.checkWebSocket.wait *= 1.3;
        }
    }
}
Morph.io.checkWebSocket.init = function() {
    // Wartezeit zwischen 1 und 2 Sekunden
    Morph.io.checkWebSocket.wait = Math.random() * 1000 + 1000;
}
Morph.io.checkWebSocket.launch = function() {
    Morph.io.checkWebSocket.init();
    Morph.io.checkWebSocket();
}
Morph.io.checkWebSocket.focus = function(e) {
    console.log('focus');
    Morph.io.checkWebSocket(e);
}
if (window.addEventListener) {
    window.addEventListener("load", Morph.io.checkWebSocket.launch);
    window.addEventListener("focus", Morph.io.checkWebSocket.focus);
} else if (window.attachEvent) {
    window.attachEvent("onload", Morph.io.checkWebSocket.launch);
    window.attachEvent("onfocus", Morph.io.checkWebSocket.focus);
}
/*
window.onfocus = function(e) {
    console.log('focus');
    Morph.io.checkWebSocket(e);
}
*/
/*
// Die Funktionen zur Verbindung mit dem Zeitserver
Morph.io.websocket.on('connect', function() {
    if (!Morph.io.active) {
        clearTimeout(Morph.io.ppTimeout);
        Morph.io.deltaArray = [];
        Morph.io.active = true;
        Morph.io.connected(true);
        Morph.io.websocket.emit('pi!', {
            i: 0,
            ct: performance.now()
        });
    }
});
Morph.io.websocket.on('disconnect', function() {
    clearTimeout(Morph.io.ppTimeout);
    Morph.io.connected(false);
});
Morph.io.websocket.on('error', function() {
    Morph.io.connected(false);
});
Morph.io.websocket.on('po!', function(pong) {
    // Berechne die Differenz (in ms) between zwischen der
    // vom Server zurückgegebenen Zeit und performance.now();
    var dtB = performance.now() - pong.ct; // roundtrip to server
    var tmDlt = performance.now() - pong.st - (dtB / 2);
    // how many milliseconds is performance.now() away from UTC
    Morph.io.deltaArray.push([tmDlt, dtB, pong.rd]);
    // ist die nächste if-Abfrage notwendig?
    if (Morph.io.deltaArray.length > Morph.io.pings) {
        Morph.io.deltaArray.shift();
        alert("SHIFT called!");
    }
    Morph.io.deltaArray.sort((a, b) => a[1] - b[1]); // sort by dtb
    Morph.io.timeDelta = Morph.io.deltaArray[0][0]; // use tmDlt of fastest dtb as time correction value
    Morph.io.leap = 0;
    Morph.io.accuracy = '±' + Math.round((Morph.io.deltaArray[0][1] + Morph.io.deltaArray[0][2]) / 2) + ' ms';
    // use (dtB+rootdelay)/2 as uncertainty-value
    pong.i += 1;
    // wir pingen den Server so lange an, bis die maximale Anzahl an
    // Pings erreicht ist ...
    if (pong.i < Morph.io.pings) {
        Morph.io.websocket.emit('pi!', {
            i: pong.i,
            ct: performance.now()
        });
    }
    // ... anschließend wird die Verbindung auf 'inaktiv' gesetzt
    else {
        console.log("lokale Zeitabweichung:", Morph.io.timediff, "ms, Genauigkeit:", Morph.io.accuracy);
        Morph.io.active = false;
        if (pong.l == 3) { // leap = 3 => serverseitiger Synchronisationsfehler
            Morph.io.connected(false);
        } else {
            Morph.io.leap = pong.l;
        }
        // der nächste ping nach "redo" ms.
        Morph.io.ppTimeout = setTimeout(function() {
            if (Morph.io.websocket.connected) {
                Morph.io.deltaArray = [];
                Morph.io.active = true;
                Morph.io.websocket.emit('pi!', {
                    i: 0,
                    ct: performance.now()
                });
            }
        }, Morph.io.redo);
    }
});
*/