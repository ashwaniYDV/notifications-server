const Joi=require('joi');

module.exports={
    validateBody: (schema)=>{
        return (req,res,next)=>{
            
            const result=Joi.validate(req.body,schema);
            if(result.error){
                return res.status(400).json(result.error)
            }
            if(!req.value){
                req.value={}
            }
            req.value['body']=result.value;
            next();
        }
    },
    //valiadtion schemas
    schemas: {
        maintenanceSchema: Joi.object().keys({
            category: Joi.number().required(),
            status: Joi.string(),
            problem: Joi.string(),
            imageUrl: Joi.string()
        }).unknown(true)
    }
}