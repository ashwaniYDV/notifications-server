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
        notificationSchema: Joi.object().keys({
            title: Joi.string().required(),
            body: Joi.string().optional().allow(''),
            description: Joi.string().optional().allow(''),
            image_uri: Joi.string().optional().allow(''),
            link: Joi.string().optional().allow(''),
            audience: Joi.array().required(),
            club: Joi.string().required()
        }).unknown(true)
    }
}