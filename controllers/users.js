const JWT=require('jsonwebtoken');
const User=require('../models/user');
const {JWT_SECRET}=require('../configs/config');
const bcrypt = require("bcryptjs");

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
            return res.status(403).json({message: "email is already taken"});
        }
        
        //initially setting isSuperUserProperty to false(this can be set true from database only)
        req.value.body.isSuperUser=false;

        //initially setting por to empty array (this can be set by admin only)
        req.value.body.por=[];

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
            res.status(401).json({ 
                message: "Not super user"
             });
        }
    },

    //get all user api (access: auth users)
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

    
    //get particular user api (access: auth users)
    getUser: async(req,res,next)=>{
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

    //patch particular user api (access: same user)
    patchUser: async(req,res,next)=>{
        const userId = req.params.userId;

        if (userId==req.user._id || req.user.isSuperUser==true) {
            const pwd=req.value.body.password;

            //generate a salt
            const salt = await bcrypt.genSalt(10);
            //generate a password hash(salt+hash)
            const passwordHash = await bcrypt.hash(pwd, salt);
            //reassign hashed version over original plain text password
            req.value.body.password = passwordHash;

            //setting isSuperUser value to false if user is not admin
            if(!req.user.isSuperUSer) {
                req.value.body.isSuperUser=false;
            }

            const user=await User.findOne({_id: userId});
            if(user){
                //restricting user to add pors if he/she is not superUser while updating his profile
                if(user.por.length==0 && req.user.isSuperUSer==false) {
                    req.value.body.por=[];
                }
                User.findByIdAndUpdate({_id: userId},req.value.body,{new:true}).then((updatedUser)=>{
                    res.status(200).json({
                        user: updatedUser
                    });
                });
            } else {
                res.status(404).json({
                    message: "User not found"
                })
            }
        } else {
            res.status(401).json({
                message: "User not authorized"
            })
        }

        
    },

    //get user by instituteId api (access: auth users)
    getUserByInstituteId: async(req,res,next)=>{
        const instituteId = req.params.instituteId;

        const user=await User.findOne({instituteId: instituteId})
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

    //get users by batch api (access: auth users)
    getUsersByBatch: async(req,res,next)=>{
        const batch = req.params.batch;

        const users=await User.find({batch: batch})
        if(users){
            res.status(200).json({
                users: users
            })
        } else {
            res.status(404).json({
                message: "Users not found"
            })
        }
    },

    //get users by branch api (access: auth users)
    getUsersByBranch: async(req,res,next)=>{
        const branch = req.params.branch;

        const users=await User.find({branch: branch})
        if(users){
            res.status(200).json({
                users: users
            })
        } else {
            res.status(404).json({
                message: "Users not found"
            })
        }
    },

    //get users by batch and branch api (access: auth users)
    getUsersByBatchAndBranch: async(req,res,next)=>{

        const batch = req.params.batch;
        const branch = req.params.branch;

        const users=await User.find({batch: batch, branch: branch})
        if(users){
            res.status(200).json({
                users: users
            })
        } else {
            res.status(404).json({
                message: "Users not found"
            })
        }
    },
    

}