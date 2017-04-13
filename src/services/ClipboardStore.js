module.exports = (function() {
    const cryptho = require("./CryptoService");
    var store = {};

    return {
        put: function(data, password) {
            return new Promise(function(resolve, reject) {
                cryptho.deriveKey(password)
                    .then(key => {
                        data = cryptho.encrypt(data, key);
                        (store[key]) ? store[key].push(data): store[key] = [data];
                        resolve();
                    });
            });
        },


        get: function(password) {
            return new Promise(function(resolve, reject) {
                cryptho.deriveKey(password)
                    .then(key => {
                        resolve(store[key]);
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
