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
        surveySchema: Joi.object().keys({
            questions: Joi.array(),
            anonymous: Joi.bool(),
            limit_responses: Joi.bool(),
            title: Joi.string().required(),
            description: Joi.string(),
        }).unknown(true),
        responseSchema: Joi.object().keys({
            response_details: Joi.array()
        }).unknown(true),
        questionSchema: Joi.object().keys({
            question_text: Joi.string().required(),
            question_description: Joi.string(),
            question_type: Joi.number().required(),
            required: Joi.bool(),
            question_options: Joi.array(),
            response_details: Joi.array()
        }).unknown(true)
    }
}