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

    const mailoptions = {
        from: `Online Store <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    console.log("Sending email...");

    await transporter.sendMail(mailoptions);

    console.log("Email sent successfully");
};

module.exports = sendEmail;