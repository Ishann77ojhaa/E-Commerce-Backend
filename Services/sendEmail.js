const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    console.log("EMAIL 1: Creating transporter");

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000,
    });

    console.log("EMAIL 2: Transporter created");

    console.log("EMAIL 3: Verifying transporter");

    await transporter.verify();

    console.log("EMAIL 4: Transporter verified");

    const mailOptions = {
        from: `"IshShop" <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    console.log("EMAIL 5: Calling sendMail");

    const info = await transporter.sendMail(mailOptions);

    console.log("EMAIL 6: Email sent", info.messageId);

    return info;
};

module.exports = sendEmail;