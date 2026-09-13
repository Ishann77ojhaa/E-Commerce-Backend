const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    console.log("Starting email...");

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    console.log("Transporter created");

    await transporter.verify();

    console.log("Transporter verified");

    const mailOptions = {
        from: `"IshShop" <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    console.log("Sending email...");

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.messageId);

    return info;
};

module.exports = sendEmail;