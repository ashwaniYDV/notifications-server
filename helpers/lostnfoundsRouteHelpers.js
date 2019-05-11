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
        lostnfoundSchema: Joi.object().keys({
            lostStatus: Joi.number().required(),
            name: Joi.string().required(),
            place: Joi.string().required(),
            time: Joi.string(),
            date: Joi.string(),
            description: Joi.string(),
            contact: Joi.string(),
            address: Joi.string()
        })
    }
}