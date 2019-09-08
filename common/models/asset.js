'use strict';

module.exports = function (Asset) {

    // standard set of validators
    Asset.validatesUniquenessOf('serialNumber', { 
        message:'serialNumber is not unique'
    });

    // custom validator
    Asset.validate('description', customValidator, {
        message:'bad name'
    })

    function customValidator(err){
        if(this.description === 'description'){
            err();
        }
    }
    
    // override built-in CRUD function
    Asset.on('dataSourceAttached', function(obj){
        Asset.deleteById = function(id, cb) {
            console.log('override..!!')
            cb(null);
        }
    })
};
