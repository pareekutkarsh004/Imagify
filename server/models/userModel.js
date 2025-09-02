import mongoose, { Mongoose } from "mongoose";

const userSchema = new Mongoose.Schema({
name:{
type:String,
required:true
},
email:{
type:String,
required:true,
unique:true
},
password:{
type:String,
required:true,
},
creditBalance:{
type:Number,
default:5
}
})

const userModel = mongoose.models.user || mongoose.model("user", userSchema)

export default userModel;