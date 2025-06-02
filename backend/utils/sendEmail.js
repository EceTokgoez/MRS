const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');


const sendEmail = asyncHandler(async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass : process.env.EMAIL_PASSWORD
        }
    })

    await transporter.sendEmail({
        from: process.env.EMAIL,
        to,
        subject,
        text
    })
    .then(() => {
        console.log('Email sent successfully');
    })
    .catch((error) => {
        console.error('Error sending email:', error);
    });
    

})

module.exports = sendEmail;