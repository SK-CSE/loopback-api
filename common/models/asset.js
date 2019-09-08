'use strict';

module.exports = function (Asset) {
    // override built-in CRUD function
    Asset.on('dataSourceAttached', function(obj){
        Asset.deleteById = function(id, cb) {
            console.log('override..!!')
            cb(null);
        }
    })
};
