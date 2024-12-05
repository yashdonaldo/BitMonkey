import nodeMailer from "nodemailer";

const sendMail = async(email, subject, content) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.SMPT_SERVICE,
        port: process.env.SMPT_PORT,
        secure: false,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASS,
        }
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: email,
        subject: subject,
        html: content
    }

    await transporter.sendMail(mailOptions)
}

export default sendMail