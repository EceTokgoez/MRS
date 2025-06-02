const asyncHandler = require('express-async-handler');
const Authorization = require('../models/authorization.js');
const User = require('../models/user.js')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const TokenBlacklist = require('../models/tokenBlackList');



const registerUser =  asyncHandler(async(req,res)=>{
    const {name, surname, email, password, dateOfBirth, userName, preferences } = req.body;
    
    const isValidMail = await Authorization.findOne({email});
    const isValidUserName = await User.findOne({userName});
    if(isValidMail){
        res.status(400);
        throw new Error('This email is already used');
    }
    if(isValidUserName){
        res.status(400);
        throw new Error('This username is already used');
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new User({
        userName:userName,
        preferences:preferences
    })
    await newUser.save();
    const newAuthorization = await Authorization.create({
        name:name,
        surname:surname,
        email:email,
        password:hashedPassword,
        dateOfBirth:dateOfBirth,
        userId: newUser._id
    })

    return res.status(201).json({
        success:true,
        message:'User succesfully registered',
        data : {
            auth: newAuthorization,
            user: newUser
        } 
    })
  
})


const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;

    const auth = await Authorization.findOne({email});
    if(!auth){
        res.status(404);
        throw new Error("No corresponding account found");
    }
    //compare decrypt fonskiyonu
    if ((await bcrypt.compare(password, auth.password))) {
        const accessToken = jwt.sign({
            user: {
                name: auth.name,
                email: auth.email,
                role : auth.role,
                id : auth.userId
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "30m"
            }
        );

        const refreshToken = jwt.sign(
            { userId: auth.userId },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" }
        );

        auth.refreshToken = refreshToken;
        await auth.save();




    res.status(200).json({
        success:true, 
        message:'User successfully logged in!', 
        data : {
            accessToken : accessToken,
            refreshToken : refreshToken,
            auth: {
                name: auth.name,
                email: auth.email,
                role : auth.role,
                authId : auth._id,
                id : auth.userId
            }
        }})
    } 
    else{
        res.status(401);
        throw new Error("password is not valid");
        
    }
})

//tokenBlackList e gerek yok auth dakini null yap geç
const logoutUser = asyncHandler(async(req,res)=>{
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader && !authHeader.startsWith('Bearer')){
        res.status(401);
        throw new Error("Authorization header not found");
    }
    const token = authHeader.split(' ')[1];
    const tokenBlacklist = await TokenBlacklist.findOne({token});
    if(tokenBlacklist){
        res.status(400);
        throw new Error("Token is already blacklisted");
    }
    const blacklistedToken = new TokenBlacklist({
        token:token
    })
    await blacklistedToken.save();
    //refresh tokens blacklisted
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if(decoded && decoded.user){
        const user = await User.findById(decoded.user.id);
        if(user){
            user.refreshToken = null;
            await user.save();
        }
    }
    res.status(200).json({
        success:true,
        message:'User successfully logged out',
        data : {
            token:token
        }
    })
}
)

const refreshToken = asyncHandler(async(req,res)=>{
    const refreshToken = req.body.token;
    if(!refreshToken){
        res.status(401);
        throw new Error("Refresh token not found");
    }
    const auth = await Authorization.findOne({refreshToken});
    if(!auth){
        res.status(403);
        throw new Error("Refresh token is not valid");
    }
    const newAccessToken = jwt.sign({
        user: {
            name: auth.name,
            email: auth.email,
            role : auth.role,
            id : auth.userId
        },
    },
    process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "30m"
        }
    );
    res.status(200).json({
        success:true,
        message:'New access token generated',
        data : {
            accessToken : newAccessToken
        }
    })
})


const forgotPassword = asyncHandler(async(req,res)=>{
    const {email} = req.body;
    const auth = await Authorization.findOne({email});
    if(!auth){
        res.status(404);
        throw new Error("No corresponding account found");
    }
    const resetToken = crypto.randomBytes(20).toString('hex');

    auth.resetPasswordToken = resetToken;
    auth.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await auth.save();
    const resetUrl = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;
    const message = `You are receiving this email because you (or someone else) have requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;
    try{
        await sendEmail({
            to: auth.email,
            subject: "Password Reset Request",
            text: message
        });
        res.status(200).json({
            success:true,
            message:'Email sent successfully',
            data : {
                resetUrl:resetUrl
            }
        })
    }catch(error){
        auth.resetPasswordToken = undefined;
        auth.resetPasswordExpires = undefined;
        await auth.save();
        res.status(500);
        throw new Error("Email could not be sent");
    }
})


const resetPassword = asyncHandler(async(req,res)=>{
    const {password} = req.body;
    const resetToken = req.params.token;
    const auth = await Authorization.findOne({
        resetPasswordToken:resetToken,
        resetPasswordExpires: { $gt: Date.now() }
    });
    if(!auth){
        res.status(400);
        throw new Error("Invalid or expired token");
    }
    const hashedPassword = await bcrypt.hash(password,10);
    auth.password = hashedPassword;
    auth.resetPasswordToken = undefined;
    auth.resetPasswordExpires = undefined;
    await auth.save();
    res.status(200).json({
        success:true,
        message:'Password successfully reset',
        data : {
            auth:auth
        }
    })
})


const sendVerificationEmail = asyncHandler(async(req,res)=>{
    const auth = await Authorization.findById(req.user.id);
    if(auth.isVerified){
        res.status(400);
        throw new Error("Email is already verified");
    }
    const emailVerificationToken = crypto.randomBytes(20).toString('hex');
    auth.emailVerificationToken = emailVerificationToken;
    await auth.save();
    const verificationUrl = `${process.env.FRONTEND_URL}/verifyEmail/${emailVerificationToken}`;
    try {
        await sendEmail(
            auth.email,
            'Email Verification',
            `Click here to verify your email: ${verificationUrl}`
          );
      
          res.status(200).json({
              success: true,
              message: 'Verification email sent successfully',
          });
    } catch (error) {
        
        auth.emailVerificationToken = undefined;
        await auth.save();
        res.status(500);
        throw new Error('Email could not be sent');

    }
})


const verifyEmail = asyncHandler(async(req,res)=>{
    const {token} = req.params;
    const auth = await Authorization.findOne({
        emailVerificationToken: token,
        isVerified: false
    });
    if(!auth){
        res.status(400);
        throw new Error("Invalid or expired token");
    }
    auth.isVerified = true;
    auth.emailVerificationToken = undefined;
    await auth.save();
    res.status(200).json({
        success:true,
        message:'Email successfully verified',
        data : {
            auth:auth
        }
    })
})



const changePassword = asyncHandler(async(req,res)=>{
    const {oldPassword, newPassword} = req.body;
    const auth = await Authorization.findById(req.user.id);
    if(!auth){
        res.status(404);
        throw new Error("No corresponding account found");
    }
    if(!(await bcrypt.compare(oldPassword, auth.password))){
        res.status(401);
        throw new Error("Old password is not valid");
    }
    auth.password = await bcrypt.hash(newPassword,10);
    await auth.save();
    res.status(200).json({
        success:true,
        message:'Password successfully changed',
        data : {
            auth:auth
        }
    })
})

    




module.exports = {
    registerUser, 
    loginUser,
    logoutUser,
    refreshToken,
    forgotPassword,
    resetPassword,
    sendVerificationEmail,
    verifyEmail,
    changePassword
}
