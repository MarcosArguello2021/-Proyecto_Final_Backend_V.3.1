import nodemailer from "nodemailer";
import { logger } from "../utils/logger.js";

//ingresar usuario y contraseña
const mailAdmin={user: process.env.TEST_MAIL,
                pass: process.env.TEST_MAIL_PASS}

const transporter =nodemailer.createTransport({
    service: 'gmail',
    auth: mailAdmin,
});

export const enviarMail= async(asunto,datos)=>{
   try {
    const info= await transporter.sendMail({
        from:'servidor Node.js',
        to: mailAdmin.user,
        subject: asunto,
        html: datos,
        
    })
   logger.info(info)}
   catch(error){
        logger.error(error)
   }
}