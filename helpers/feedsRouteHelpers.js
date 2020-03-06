const Joi=require('joi');

module.exports={

    validateBody: (schema)=>{
        return (req,res,next)=>{
            
            req.body.eventId=new Date().getTime();
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
        feedSchema: Joi.object().keys({
            eventName: Joi.string().required(),
            eventDescription: Joi.string(),
            eventImageUrl: Joi.string().optional().allow(''),
            postLinks: Joi.array(),
        }).unknown(false)
    }
}