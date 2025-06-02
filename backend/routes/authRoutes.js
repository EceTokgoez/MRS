const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    logoutUser,
    refreshToken,
    forgotPassword,
    resetPassword,
    sendVerificationEmail,
    verifyEmail,
    changePassword
} = require('../controllers/authControllers');
const { validRegister, validLogin, validToken} = require('../middleware/validation');

router.post('/auth/register', validRegister , registerUser);
router.post('/auth/login', validLogin , loginUser);
router.post('/auth/logout', validToken, logoutUser);
router.post('/user/refreshAccessToken', refreshToken);
router.post('/user/forgotPassword', forgotPassword);
router.post('/user/resetPassword/:token', resetPassword)
//mail gönderilir email verify edilir
router.post('/user/send-verification', validToken, sendVerificationEmail);
//gelen token ile user bulunur
//token varsa user güncellenir
//token yoksa hata döner
router.get('/user/verify-email/:token', verifyEmail);
//eski şifre biliniyosa değişir
router.patch('/user/change-password', validToken, changePassword);



module.exports = router;









