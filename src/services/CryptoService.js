// https://developers.google.com/web/fundamentals/getting-started/primers/promises
module.exports = (function() {

    const crypto = require('crypto');
    const algorithm = 'aes-256-ctr';
    const salt = '123123123';

    return {
        deriveKey: function(password) {
            return new Promise(function(resolve, reject) {
                crypto.pbkdf2(password, salt, 100000, 512, 'sha512', (err, key) => {
                    if (err) reject(Error(500));
                    resolve(key.toString('hex'));
                });
            });
        },

        encrypt: function(plain, key) {
            return new Promise(function(resolve, reject) {
                var cipher = crypto.createCipher(algorithm, key)
                var encrypted = cipher.update(new Buffer(JSON.stringify(plain)).toString('base64'), 'base64', 'hex')
                encrypted += cipher.final('hex');
                resolve(encrypted);
            });
        },

        decrypt: function(encrypted, key) {
            return new Promise(function(resolve, reject) {
                var decipher = crypto.createDecipher(algorithm, key)
                var plain = decipher.update(encrypted, 'hex', 'base64')
                plain += decipher.final('base64');
                try {
                    resolve(JSON.parse(new Buffer(plain, 'base64').toString()));
                } catch (err) {
                    reject(500);
                }
            });
        }
    };

})();
