const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    console.log("EMAIL 1: Creating transporter");

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,

        family: 4,

        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },

        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000,
    });

    console.log("EMAIL 2: Transporter created");

    await transporter.verify();

    console.log("EMAIL 3: Transporter verified");

    const info = await transporter.sendMail({
        from: `"IshShop" <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
    });

    console.log("EMAIL 4: Email sent:", info.messageId);

    return info;
};

module.exports = sendEmail;