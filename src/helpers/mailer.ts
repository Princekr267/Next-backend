import nodemailer from 'nodemailer'
import User from '../models/user.model';
import bcrypt from 'bcryptjs';

export const sendEmail = async ({email, emailType, userId}: any) => {
    try{
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if(emailType == "VERIFY"){
            const updateUser = await User.findByIdAndUpdate(
                userId, {
                    $set: {
                        verifyToken: hashedToken, 
                        verifyTokenExpiry: Date.now() + 3600000
                    }
                }
            )
            console.log("Updated User", updateUser);
        } else if(emailType == "RESET"){
            await User.findByIdAndUpdate(userId, {
                $set: {
                    forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "9c91466ef0dec0",
                pass: "a8a271a0d23a10"
            }
        });

        
        const mailOption = {
            from: 'princekrr267@gmail.com', // sender address
            to: email, // list of recipients
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password", // subject line
            // text: "Hello world?", // plain text body
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType==="VERIFY" ? "Verify your email" : "Reset your password"}</p>`, // HTML body
        }

        const mailResponse = await transport.sendMail(mailOption)
        return mailOption


    } catch(err: any) {
        throw new Error(err.message)
    }
}