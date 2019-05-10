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
        authSchemaSignIn: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }),
        authSchemaSignUp: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            name: Joi.string().required(),
            isSuperUser: Joi.boolean().required(),
            por: Joi.array().required(),
            instituteId: Joi.string().required(),
            batch: Joi.string().required(),
            branch: Joi.string().required(),
            rollno: Joi.string().required()
        }),
        userSchemaPatch: Joi.object().keys({
            email: Joi.string().email(),
            password: Joi.string(),
            name: Joi.string(),
            isSuperUser: Joi.boolean(),
            por: Joi.array(),
            instituteId: Joi.string(),
            batch: Joi.string(),
            branch: Joi.string(),
            rollno: Joi.string()
        }),
    }
}