import mongoose from "mongoose";


const userSchema =  new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true,unique:true },
    password: { type: String, required: true },
    location:{type:String,required:true},
    isAdmin :{type:Boolean,default:false},
    date:{
        type:Date,
        default:Date.now()
    }
})

const UserModel =  mongoose.models.UserModel || mongoose.model("UserModel", userSchema); 
export default UserModel;