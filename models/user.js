const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true //so that ash@gmail.com and ASH@GMAIL.COM are treated same(by default they are diffrent in mongoose)
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  isSuperUser: {
    type: Boolean,
    dafault: false
  },
  por : {
    type : Array, 
    default : []
  },
  instituteId: {
    type: String,
    required: true,
    lowercase: true
  },
  batch: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true,
    lowercase: true
  },
  rollno: {
    type: String,
    required: true
  },
  registerDate: {
    type: Date,
    default: Date.now
  }
});

//we couldn't use the arrow function because we want to use this.email
userSchema.pre("save", async function(next){
    try{
        /*SALTING AND HASHING*/

        //generate a salt
        const salt = await bcrypt.genSalt(10);

        //generate a password hash(salt+hash)
        const passwordHash = await bcrypt.hash(this.password, salt);

        //reassign hashed version over original plain text password
        this.password = passwordHash;
        next();
    } 
    catch (error){
        next(error);
    }
});

userSchema.methods.isValidPassword=async function(newPassword){
    try{
        return await bcrypt.compare(newPassword,this.password) //returns boolean
    }
    catch(error){
        throw new Error(error);
    }
}

const User = mongoose.model("user", userSchema);
module.exports = User;
