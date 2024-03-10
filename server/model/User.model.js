import mongoose from 'mongoose';


export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter unique username"],
        unique: [true, "Username already exists"]
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        unique: false,
    },
    email: {
        type: String,
        required: [true, "Please enter unique email"],
        unique: true,
    },
    // username: {
    //     type: String,
    //     required: function() { return this.operationType === 'signup'; }, // Dynamically set 'required'
    //     unique: [true, "Username already exists"]
    // },
    // password: {
    //     type: String,
    //     required: function() { return this.operationType === 'signup'; },
    //     unique: false, 
    // },
    // email: {
    //     type: String,
    //     required: function() { return this.operationType === 'signup'; },
    //     unique: true,
    // },

    // height: { type: Number },     // Add height field
    // weight: { type: Number },     // Add weight field
    // age: { type: Number },        // Add age field
    // gender: { type: String },     // Add gender field
    // activity: { type: String },   // Add activity field
    // recommendations: {
    //     type: Object,
    //     default: null,
    // },
})

export default mongoose.model("User", UserSchema);



