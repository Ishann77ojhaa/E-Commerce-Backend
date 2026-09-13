const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (options) => {
    console.log("EMAIL 1: Sending email through Resend");

    const { data, error } = await resend.emails.send({
        from: `"IshShop <${process.env.EMAIL_USER}>"`,
        to: [options.email],
        subject: options.subject,
        text: options.message,
    });

    if (error) {
        console.error("RESEND ERROR:", error);
        throw new Error(error.message);
    }

    console.log("EMAIL 2: Email sent:", data.id);

    return data;
};

module.exports = sendEmail;