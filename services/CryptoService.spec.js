// no crypto algorithm tests - only functionality
var crypto = require('./CryptoService');

var assert = require('assert');
var sinon = require('sinon');

describe('CryptoService', function() {

    it('should dervice key from password', function() {
        assert.notDeepStrictEqual('secret', crypto.deriveKey('secret'));
    });

    it('should encrypt and decrypt given same password', function() {
        var plain = { data: 1 };
        crypto.encrypt(plain, 'secret')
            .then(_cipher => {
                assert.notDeepStrictEqual(plain, _cipher)

                crypto.decrypt(_cipher, 'secret')
                    .then(_plain => assert.deepStrictEqual(plain, _plain))
            });
    });

    it('should return 500 if data is encrypted and decrypted with different passwords', function() {
        var plain = { data: 1 };

        crypto.encrypt(plain, 'secret')
            .then(_cipher => {
                assert.notDeepStrictEqual(plain, _cipher);
                crypto.decrypt(_cipher, 'not_secret')
                    .then(_plain => assert.fail(), err => assert.strictEqual(500, err));
            });
    });
});
