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
            eventVenue: Joi.string().required(),
            title: Joi.string().required(),
            description: Joi.string().required(),
            eventImageUrl: Joi.string(),
            speakersGuests: Joi.array(),
            eventCoordinators: Joi.array(),
            socialMediaPosts: Joi.array(),
            eventDate: Joi.number().required()
        })
    }
}