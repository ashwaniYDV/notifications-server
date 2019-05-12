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
        feedSchema: Joi.object().keys({
            feedPoster: Joi.string().required(),
            eventVenue: Joi.string().required(),
            eventName: Joi.string().required(),
            eventDescription: Joi.string().required(),
            eventImageUrl: Joi.string(),
            guests: Joi.array(),
            coordinators: Joi.array(),
            postLinks: Joi.array(),
            eventDate: Joi.number().required()
        })
    }
}