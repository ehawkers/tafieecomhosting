const rolesModel = require('.../models/roleModel/rolesModel');

module.exports.addRole = async(req,res)=> {
    const role = req.body.role 
    const permissions = req.body.permissions

    const newRole = await new roleModel({role,permissions})
    const isSaved = await newRole.save()

    if(isSaved){
        return res.send({code:200, message: 'role added'})
    } else {
        return res.send({code:500,message: 'server err'})
    }
}

module.exports.deleteRole = (req,res)=> {
    return res.send({code:200, message:'role deleted'})
}