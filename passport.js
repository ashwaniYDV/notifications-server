const passport=require('passport');
const JwtStrategy=require('passport-jwt').Strategy;
const {ExtractJwt}=require('passport-jwt');
const LocalStrategy=require('passport-local').Strategy;

const {JWT_SECRET}=require('./configs/config');
const User=require('./models/user')

//JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('auth-token'),
    secretOrKey: JWT_SECRET
},async(payload,done)=>{
    try{
        //find the user specified in token
        const user=await User.findById(payload.sub)

        //if user doesn't exist handle it
        if(!user){
            return done({ message: 'Anauthorized user' },false);
        }

        //otherwise return the user
        done(null,user);
    }
    catch(error){
        done(error,false);
    }
}));

//LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email'
},async(email,password,done)=>{
    try{
        //find the user given the email
        const user=await User.findOne({email: email});

        //if not handle it
        if(!user){
            return done({ message: 'User not found' }, false,);
        }

        //check if the password is correct
        const isMatch=await user.isValidPassword(password)

        //if not, handle it
        if(!isMatch){
            return done({ message: 'Wrong Password' }, false);
        }

        //otherwise return the user
        done(null,user);
    }
    catch(error){
        done(error,false);
    }

}))