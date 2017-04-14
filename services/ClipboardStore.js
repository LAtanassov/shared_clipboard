module.exports = (function() {
    const cryptho = require("./CryptoService");
    var store = {};


    return {
        put: function(data, password) {
            return new Promise(function(resolve, reject) {
                cryptho.deriveKey(password)
                    .then(key => {
                        cipher = cryptho.encrypt(data, key);
                        (store[key]) ? store[key].push(cipher): store[key] = [cipher];
                        resolve();
                    });
            });
        },


        get: function(password) {
            return new Promise(function(resolve, reject) {
                cryptho.deriveKey(password)
                    .then(key => {
                        data = store[key] ? store[key]
                            .map(cipher => cryptho.decrypt(cipher, key)
                                .then(plain => plain, err => reject(err))) : [];
                        resolve(data);
                    })
            });
        },

        clear: function() {
            return new Promise(function(resolve, reject) {
                store = {};
                resolve();
            });
        }
    };
})();
