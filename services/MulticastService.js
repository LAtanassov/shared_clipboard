// https://xgrommx.github.io/rx-book/content/getting_started_with_rxjs/subjects.html

module.exports = (function() {

    const dgram = require('dgram');
    const server = dgram.createSocket("udp4");
    
    var Rx = require('rx');
    var onErrorSubject = new Rx.Subject();
    var onMessageSubject = new Rx.Subject();
    var onOpenSubject = new Rx.Subject();

    server.on('error', (err) => onErrorSubject.onNext(err));
    server.on('message', (msg, rinfo) => onMessageSubject.onNext((msg, rinfo)));
    server.on('listening', () => onOpenSubject.onNext());

    server.bind(function() {
        server.setBroadcast(true);
        server.setMulticastTTL(128);
        server.addMembership('230.185.192.108');
    });

    return {
        on: function(event, callback) {
            return new Promise(function(resolve, reject) {
                switch (event) {
                    case 'error':
                        onErrorSubject.subscribe(err => callback(err));
                        break;
                    case 'message':
                        onMessageSubject.subscribe(msg => callback(msg));
                        break;
                    case 'open':
                        onOpenSubject.subscribe(() => callback());
                        break;
                }
                resolve();
            });
        }
    };
})();
