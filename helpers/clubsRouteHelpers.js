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
        clubSchema: Joi.object().keys({
            name: Joi.string().required(),
            bio: Joi.string().required(),
            description: Joi.string().optional().allow(''),
            pages: Joi.array(),
            website: Joi.string().optional().allow(''),
            image: Joi.string().optional().allow('')
        }).unknown(true)
    }
}