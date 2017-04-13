// https://developers.google.com/web/fundamentals/getting-started/primers/promises
module.exports = (function() {

    const crypto = require('crypto');
    const algorithm = 'aes-256-ctr';
    const salt = '123123123';

    return {
        deriveKey: function(password) {
            return new Promise(function(resolve, reject) {
                crypto.pbkdf2(password, 'salt', 100000, 512, 'sha512', (err, key) => {
                    if (err) reject(Error("It broke"));
                    resolve(key.toString('hex'));
                });
            });
        },

        encrypt: function(plain, key) {
            return new Promise(function(resolve, reject) {
                var cipher = crypto.createCipher(algorithm, key)
                var crypted = cipher.update(plain, 'base64', 'hex')
                crypted += cipher.final('hex');
                resolve(crypted);
            });
        },

        decrypt: function(crypted, key) {
            return new Promise(function(resolve, reject) {
                var decipher = crypto.createDecipher(algorithm, key)
                var plain = decipher.update(crypted, 'hex', 'base64')
                plain += decipher.final('base64');
                resolve(plain);
            });
        }
    };

})();
