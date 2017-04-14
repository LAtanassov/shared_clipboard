(function() {

    const multicast = require("./services/MulticastService");
    const store = require("./services/ClipboardStore");

    const express = require('express');
    const rest = express();
    const bodyParser = require('body-parser');

    rest.use(bodyParser.urlencoded({ extended: true }));
    rest.use(bodyParser.json());
    
    var redirect = express.Router();
    redirect.get('/*', function(req, res) {
        res.redirect('/app/index.html');
    });

    var api = express.Router();

    api.post('/documents/:password', function(req, res) {
        store.put(req.body, req.paras.password).then(data => {
        	res.status(201);
        }, err => {
        	res.status(err);
        });
    });

    api.get('/documents/:password', function(req, res) {
        store.get(req.params.password).then(data => res.json(data), err => res.status(err));
    });

    rest.use('/api', api);
    rest.use('/app', express.static('app'));
    rest.use('/', redirect);

    rest.listen(8080);
    console.log('shared_clipboard listening on http://localhost:8080')
    console.log('stop service with CTRL + C')
})();
