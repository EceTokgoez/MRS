const mongoose = require('mongoose');

const authorizationSchema = new mongoose.Schema({
    name: {type:String, required:true, min:2},
    surname: {type:String, required:true, min:2},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    dateOfBirth: {type:Date, required:true},
    role: {type:String, enum:['admin','user'], default:'user'},
    userId: {type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    isVerified: {type:Boolean, default:false},
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    refreshToken: { type: String },
    emailVerificationToken: { type: String },
},
{timestamps:true});

const Authorization = mongoose.model('Authorization', authorizationSchema);

module.exports = Authorization;
