// https://xgrommx.github.io/rx-book/content/getting_started_with_rxjs/subjects.html

module.exports = (function() {
    const Rx = require('rx');

    const dgram = require('dgram');
    const server = dgram.createSocket("udp4");
    server.bind();
    server.setBroadcast(true)
    server.setMulticastTTL(128);
    server.addMembership('230.185.192.108');

    const onErrorSubject = Rx.Subject();
    const onMessageSubject = Rx.Subject();
    const onOpenSubject Rx.Subject();

    udpService.on('error', (err) => { onErrorSubject.onNext(err); });
    udpService.on('message', (msg, rinfo) => { onMessageSubject.onNext((msg, rinfo)); });
    udpService.on('listening', () => { onOpenSubject.onNext(); });

    return {
        on: function(event, callback) {
            return new Promise(function(resolve, reject) {
                switch (event) {
                    case 'error':
                        onErrorSubject.Subject(err => callback(err));
                        break;
                    case 'message':
                        onMessageSubject.Subject(msg => callback(msg));
                        break;
                    case 'open':
                        onOpenSubject.Subject(() => callback());
                        break;
                }
                resolve();
            });
        }
    };
})();
