module.exports = (function() {

    const multicast = require("MulticastService");
    const store = require("ClipboardStore");

    const express = require('express');
    const rest = express();
    const bodyParser = require('body-parser');

    rest.use(bodyParser.urlencoded({ extended: true }));
    rest.use(bodyParser.json());

    var router = express.Router();

    router.post('/documents/:password', function(req, res) {
        store.put(req.body, req.paras.password).then(data => {
        	res.status(201);
        }, err => {
        	res.status(err);
        });
    });

    router.get('/documents/:password', function(req, res) {
        store.get(req.params.password).then(data => res.json(data), err => res.status(err));
    });

    rest.use('/api', router);
    rest.listen(8080);
})();
