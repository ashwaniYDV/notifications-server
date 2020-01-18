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
        agendaSchema: Joi.object().keys({
            category: Joi.string().required(),
            status: Joi.string(),
            problem: Joi.string().required(),
            imageUrl: Joi.string()
        }).unknown(true)
    }
}