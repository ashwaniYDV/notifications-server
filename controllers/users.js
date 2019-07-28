const JWT=require('jsonwebtoken');
const User=require('../models/user');
const {JWT_SECRET}=require('../configs/config');
const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');

signToken=(user)=>{
    return JWT.sign({
        iss: 'ashwani',
        sub: user.id, //here id and _id both are same(mongodb generated id)
        iat: new Date().getTime(), //current time
        exp: new Date().setDate(new Date().getDate()+30) //current time +30 day ahead
    },JWT_SECRET)
}

sendMail = async (email, code) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ashyadavash@gmail.com',
            pass: '9451937619'
        }
    });
    let mailOptions = {
        from: 'ashyadavash@gmail.com', // TODO: email sender
        to: email, // TODO: email receiver
        subject: 'IITP-App, Activate your account',
        text: `Your activation OTP is ${code}`
    };
    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        return false;
    }
}

module.exports={

    //signup api (access: all)
    signUp: async(req,res,next)=>{
        const {email,password,name}=req.value.body;

        const foundUser=await User.findOne({email: email})
        if(foundUser){
            return res.status(403).json({message: "Email is already registered"});
        }
        
        //initially setting isSuperUserProperty to false(this can be set true from database only)
        req.value.body.isSuperUser=false;

        //initially setting por to empty array (this can be set by admin only)
        req.value.body.por=[];

        let code = Math.floor(100000 + Math.random() * 900000);
        req.value.body.code=code;
        let mailresponse = await sendMail('1801ee13@iitp.ac.in', code);
        if(mailresponse === true) {
            console.log('yeessss');

            //create a new user
            const newUser=new User(req.value.body);
            await newUser.save();
            const token=signToken(newUser);
            res.status(200).json({
                token: token,
                user: newUser
            })
        } else {
            console.log('nooo');
            res.status(500).json({
                message: "Could not register your account"
            })
        }

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

    activateUser: async(req,res,next)=>{
        const { email, code } = req.body;
        const user = await User.findOne({email: email});
        if (user) {
            if (user.active === 1) {
                res.status(403).json({
                    "message": "User already activated"
                 });
            } else {
                if (user.code === code) {
                    User.findByIdAndUpdate({_id: user._id},{active: 1, code: 0},{new:true}).then((updatedUser)=>{
                        res.status(200).json({
                            user: updatedUser
                        });
                    });
                } else {
                    res.status(403).json({
                        "message": "Invalid activation code"
                     });
                }
            }
        } else {
            res.status(404).json({
                "message": "User not registered"
             });
        }
    },

    //secret resource api (access: superUser)
    secret: async(req,res,next)=>{
        const user=req.user;
        if (user.isSuperUser) {
            res.status(200).json({
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

    //patch particular user api (access: same user && superUser)
    patchUser: async(req,res,next)=>{
        const userId = req.params.userId;

        // if (userId==req.user._id || req.user.isSuperUser) {
        if (userId==req.user.id && !req.user.isSuperUser) {
            if(req.value.body.password!=undefined) {
                const pwd=req.value.body.password;
                const salt = await bcrypt.genSalt(10);
                const passwordHash = await bcrypt.hash(pwd, salt);
                req.value.body.password = passwordHash;
            }
            
            //setting isSuperUser value to false if user is not admin
            if(!req.user.isSuperUser) {
                req.value.body.isSuperUser=false;
            }
            req.value.body.isSuperUser=false;

            const user=await User.findOne({_id: userId});
            if(user){
                //restricting user to add pors if he/she is not superUser while updating his profile
                if(user.por.length==0) {
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
        } else if(userId!=req.user.id && req.user.isSuperUser) {
            var updateData={};
            if(req.value.body.por!=undefined) {
                updateData.por=req.value.body.por;
            }
            if(req.value.body.isSuperUser!=undefined) {
                updateData.isSuperUser=req.value.body.isSuperUser;
            }

            const user=await User.findOne({_id: userId});
            if(user){
                User.findByIdAndUpdate({_id: userId}, updateData, {new:true}).then((updatedUser)=>{
                    res.status(200).json({
                        user: updatedUser
                    });
                });
            } else {
                res.status(404).json({
                    message: "User not found"
                })
            }
        } else if(userId==req.user.id && req.user.isSuperUser) {
            const user=await User.findOne({_id: userId});
            if(user){
                User.findByIdAndUpdate({_id: userId}, req.value.body, {new:true}).then((updatedUser)=>{
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
                message: "Unauthorized request"
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