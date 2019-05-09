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

    //signup api (access: all)
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

    //signin api (access: all)
    signIn: async(req,res,next)=>{
        //generate token
        const user=req.user;
        const token=signToken(user);

        res.status(200).json({
            token: token,
            user: user
        });
    },

    //secret resource api (access: superUser)
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

    //get all user api (access: all)
    getAllUsers: async(req,res,next)=>{

        const users=await User.find({})
        if(users){
            res.status(200).json({
                users: users
            })
        } else {
            res.status(404).json({
                message: "No users found"
            })
        }

    },

    
    //get particular user api (access: all)
    getParticulerUser: async(req,res,next)=>{

        const userId = req.params.userId;

        const user=await User.findOne({_id: userId})
        if(user){
            res.status(200).json({
                user: user
            })
        } else {
            res.status(404).json({
                message: "User not found"
            })
        }

    },
}