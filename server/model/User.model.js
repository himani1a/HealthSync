import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true,"Please enter unique username"],
        unique : [true, "Username already exists"]
    },
    password : {
        type : String,
        required : [true,"Please enter password"],
        unique : false,
    },
    email: {
        type : String,
        required : [true,"Please enter unique email"],
        unique : true,
    },
    firstName : { type: String},
    lastName : { type: String},
    mobile : { type: Number},
    address : { type: String},
    profile: { type: String},
})

export default mongoose.model.Users || mongoose.model("User", UserSchema);



