var store = require('./ClipboardStore');

var assert = require('assert');
var sinon = require('sinon');

describe('ClipboardStoreSpecs', function() {
    beforeEach(function() {
        store.clear();
    });

    it('should clear store', function() {
        var data = {data:1};
        store.put(data, 'secret')
            .then(() => store.clear())
            .then(() => assert.deepStrictEqual([], store.get('secret')));
    });

    it('should store pair of password, document', function() {
        var data = {data:1};
        store.put(data, 'secret')
            .then(() => assert.deepStrictEqual(data, store.get('secret')));
    });

    it('should store pair of password, documents', function() {
        var data = {data:1};
        store.put(data, 'secret')
            .then(() => store.put(data, 'secret'))
            .then(() => assert.deepStrictEqual([data, data], store.get('secret')));
    });
});
