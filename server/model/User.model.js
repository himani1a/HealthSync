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
   
    height: 0, // Change to number type
    weight: 0, // Change to number type
    age: 0,    // Change to number type       // Add age field
    gender: { type: String },     // Add gender field
    activity: { type: String },   // Add activity field
    recommendations: {
        type: Object,
        default: null,
    },
})

export default mongoose.model.Users || mongoose.model("User", UserSchema);



