'use strict';

EmployeeDataManipulation(result) {
  return "some modified data"
}

// TODO add winston logger
module.exports = function (Employee) {
  
      Employee.on('dataSourceAttached', (obj) => {
        
        // override inbuild crud and use use actual function inside that
        
        let org_Employee_findById = loan.findById.bind(loan);
        // override in build findById method
        loan.findById = async function (id) {
            try {
                let result = await org_Employee_findById(id);
                if (result) {
                    let modified_result = EmployeeDataManipulation(result);
                    return modified_result;
                }
                return result;
            } catch (e) {
                // logger.error({ "type": "Employee_findById", "error": e.message || e });
                if (e.status && e.message) {
                    throw err;
                } else {
                    const error = new Error("Internal Server Error");
                    error.status = 500;
                    throw error;
                }
            }
        }
    })
  
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
