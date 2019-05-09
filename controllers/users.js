const JWT=require('jsonwebtoken');
const User=require('../models/user');
const {JWT_SECRET}=require('../configs/config');

signToken=(user)=>{
    return JWT.sign({
        iss: 'ashwani',
        sub: user.id, //here id and _id both are same(mongodb generated id)
        isSuperUser: user.isSuperUSer,
        iat: new Date().getTime(), //current time
        exp: new Date().setDate(new Date().getDate()+1) //current time +1 day ahead
    },JWT_SECRET)
}

module.exports={
    signUp: async(req,res,next)=>{
        const {email,password,name}=req.value.body;

        //check if there is a user with same email
        const foundUser=await User.findOne({email: email})
        if(foundUser){
            return res.status(403).json({error: "email is already taken"});
        }
        
        //create a new user
        const newUser=new User(req.value.body);
        await newUser.save();

        //generate token
        const token=signToken(newUser);

        //respond with token
        res.status(200).json({
            token: token,
            user: newUser
        })
    },

    signIn: async(req,res,next)=>{
        //generate token
        const user=req.user;
        const token=signToken(user);

        res.status(200).json({
            token: token,
            user: user
        });
    },

    secret: async(req,res,next)=>{

        const user=req.user;
        if (user.isSuperUser) {
            res.json({ 
                secret: "Secret Resource",
                user: user
             });
        } else {
            res.json({ 
                secret: "Secret Resource",
                authorization: "Not super user"
             });
        }
           
    },
}