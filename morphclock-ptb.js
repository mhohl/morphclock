/*
  morphclock-ptb.js
  © 2020 Marc Hohl
 */
/*
 * Morph.io contains the interface to the PTB time server
 * Thanks to Dr. Martin Gutbrod (PTB) for allowing me to use his code in this extension!
 *
 * https://www.ptb.de/cms/fileadmin/internet/publikationen/ptb_mitteilungen/mitt2019/PTB-Mitteilungen_2019_Heft_4.pdf
 * https://uhr.ptb.de/wst/paper
 *
 */
if (typeof Morph === 'undefined') {
    throw new Error("morphclock-ptb.min.js needs morphclock.min.js included first!");
}
Morph.io.websocket = 0; // WebSocket
Morph.io.isActive = false; // connection isActive
Morph.io.redo = 60000; // time between websocekt pings in ms
Morph.io.ppTimeout = 0; // ID of ping pong timer reactivated after 'redo'
Morph.io.rcTimeout = 0; // ID the reconnect timer
Morph.io.pings = 5; // number of pings
Morph.io.deltaArray = []; // array for run time corrections
Morph.io.timeDelta = 0; // difference between local time and server time
Morph.io.leap = 0; // leap second?
Morph.io.accuracy = ''; // accuracy of run time corrections
Morph.io.connected = function(c) {
    if (typeof c !== 'undefined') {
        // no connection => set transparency
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
        // is the next code part ever triggered?
        if (Morph.io.deltaArray.length > Morph.io.pings) {
            Morph.io.deltaArray.shift();
            alert("SHIFT called!");
        }
        // sort by dtB ascending
        Morph.io.deltaArray.sort((a, b) => a[1] - b[1]);
        // set timeDelta of smallest dtB value as time correction
        Morph.io.timeDelta = Morph.io.deltaArray[0][0];
        Morph.io.leap = 0;
        Morph.io.accuracy = Math.round((Morph.io.deltaArray[0][1] + Morph.io.deltaArray[0][2]) / 2);
        console.log('#', Morph.io.deltaArray.length, dtB / 2, Morph.io.accuracy, sdata.l);
        if (Morph.io.deltaArray.length < Morph.io.pings) {
            Morph.io.websocket.send(JSON.stringify({
                c: performance.now()
            }));
        } else {
            Morph.io.isActive = false;
            Morph.io.leap = sdata.l || 0;
            Morph.io.ppTimeout = setTimeout(function() {
                if (Morph.io.websocket.readyState === Morph.io.websocket.OPEN) {
                    Morph.io.deltaArray = [];
                    Morph.io.isActive = true;
                    Morph.io.websocket.send(JSON.stringify({
                        c: performance.now()
                    }));
                }
            }, Morph.io.redo);
        }
    }
    Morph.io.websocket.onopen = function() {
        if (!Morph.io.isActive) {
            clearTimeout(Morph.io.ppTimeout);
            clearTimeout(Morph.io.rcTimeout);
            Morph.io.checkWebSocket.init();
            Morph.io.deltaArray = [];
            Morph.io.isActive = true;
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
        Morph.io.isActive = false;
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
    // initial wait between 1 and 2 seconds
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