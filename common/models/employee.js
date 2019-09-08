'use strict';

module.exports = function (Employee) {
    Employee.getAssetAmountForEmployee = async(id) => {
        var filter = {
            include: {
                relation: 'assets',
                scope: {
                    fields: ['purchasePrice']
                }
            }
        };

        try {
            let emp = await Employee.findById(id, filter)
            let empObj = emp.toJSON();
            let totalAmount = 0;
            empObj.assets.forEach((empAsset => {
                totalAmount += empAsset.purchasePrice;
            }))
            return totalAmount
        } catch (err) {
            console.log(err)
        }

        // promise style
        /*         return Employee.findById(id, filter)
                .then ((emp)=>{
                    let empObj = emp.toJSON();
                    console.log(empObj);
                    let totalAmount = 0;
                    for(let i= 0 ; i < empObj.assets.length; i++){
                        totalAmount += empObj.assets[i].purchasePrice;
                    }
                    return totalAmount
                })
                .catch((err)=>{
                    console.log(err);
                }) */
        // callback style
        /*         Employee.findById(id, filter, (err, emp)=>{
                    if(err){
                        console.log(err);
                    }
                    let empObj = emp.toJSON();
                    console.log(empObj);
                    let totalAmount = 0;
                    for(let i= 0 ; i < empObj.assets.length; i++){
                        totalAmount += empObj.assets[i].purchasePrice;
                    }
                    cb(null,totalAmount);
                }); */
    }
    Employee.remoteMethod('getAssetAmountForEmployee', {
        descrption: "Returns the asset amount for the employee",
        accepts: {
            arg: 'id',
            type: 'number',
            required: true
        },
        http: {
            path: '/:id/getAssetTotalForEmployee',
            verb: 'get'
        },
        returns: {
            arg: 'amount',
            type: 'number'
        }
    })
};
