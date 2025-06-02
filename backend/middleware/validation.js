const {validateRegister, validateLogin} = require('../validations/AuthValidations');
const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const verifyToken = promisify(jwt.verify);


const validRegister = asyncHandler(async(req,res,next)=>{
    const {error} = validateRegister(req.body);
    if(error){
        res.status(400);
        const err = new Error(error.details[0].message);
        return next(err); 
        
    }
    next();
})


const validLogin = asyncHandler(async(req,res,next)=>{
    const {error} = validateLogin(req.body);
    if(error){
        res.status(400);
        const err = new Error(error.details[0].message);
        return next(err); 
        
    }
    next();
})


// validToken yazılcak ama jwt.verify asynchronous olmalı yoksa event loop u bozar
// bunun için asyncHandler kullanıyoruz asynchronous yani await li işlemler barındıran kodları 
// try catch içine almana gerek kalmıyo o hata yönetimini kendi hallediyo
// jwt.verify ı asynchronous yapabilmek için promisify yapmamız lazım
// const promisify = require('util').promisify;
// const verify = promisify(jwt.verify); şeklinde bir kullanım olcak 

const validToken = asyncHandler(async(req,res,next)=>{
    let token;

    let authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader && !authHeader.startsWith('Bearer')){
        res.status(401);
        const err = new Error("Authorization header not found");
        return next(err);
    }
    token = authHeader.split(' ')[1];
    if(!token){
        res.status(401);
        const err = new Error("Authorization token not found");
        return next(err);
    }

    const decoded = await verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
    if(!decoded || !decoded.user){
        res.status(401);
        const error = new Error("Invalid token");
        return next(error);
    }
    req.user = decoded.user;
    next();

})

const validRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            
            res.status(403);
            const err = new Error("Erişim Reddedildi: Yetkiniz Yok!")
            return next(err);
        }
        next();
    };
};


module.exports = {
    validRegister,
    validLogin,
    validToken,
    validRole
}

