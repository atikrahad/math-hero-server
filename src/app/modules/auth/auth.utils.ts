/* eslint-disable @typescript-eslint/no-explicit-any */
import config from "../../config";
import jwt from "jsonwebtoken";
import { transporter } from "../../config/mail/configMail";
import { confirmationEmail } from "../../config/mailTamplate/confirmationEmail";

export const sendconfirmationmail = async (user: any, otp: string) => {
    const mail = {
        from: `Zecon <${config.mail_username}>`,
        to: user.email,
        subject: 'Account confirmation',
        text: `<p> We are glad to have you on board! </p>`,
        html: confirmationEmail(user, otp),
    }
    transporter.sendMail(mail, (err: any, info: any) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
}


export const generateOtpToken = async (email: string) => {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpToken = await jwt.sign({ email, otp }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '2m' });
    return { otpToken, otp };
}

export const verifyOtpToken = (token: string, otp: string): boolean => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key') as { email: string; otp: string };
        return decoded.otp === otp;
    } catch (err) {
        console.log(err)
        return false;
    }
}