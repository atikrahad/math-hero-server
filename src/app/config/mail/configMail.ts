import nodemailer from "nodemailer"
import config from "..";
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: config.mail_username as string,
        pass: config.mail_password as string,
    },
});