const Joi=require('joi');

module.exports={

    validateBody: (schema)=>{
        return (req,res,next)=>{
            
            req.body.timestamp=new Date().getTime();
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
        messSchema: Joi.object().keys({
            studentMongoId: Joi.string(),
            messChoice: Joi.number(),
            currentMeal: Joi.string(),
            takenMeals: Joi.array(),
            cancelledMeals: Joi.array(),
            timestamp: Joi.number(),
        }).unknown(true)
    }
}