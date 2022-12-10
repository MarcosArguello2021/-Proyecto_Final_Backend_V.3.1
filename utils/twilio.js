import twilio from 'twilio';
import { logger } from './logger.js';

//completar con account SID auth Token y los numeros de twilio y de destino
const accountSid = process.env.ACCOUNT_SID
const AuthToken = process.env.AUTH_TOKEN 
const twilioNumber = process.env.NRO_TWILIO
const verifyNumber= process.env.NRO_WSP
const twilioNumberWSP = process.env.NRO_TWILIO;
const verifyNumberWSP = process.env.NRO_WSP;

const client = twilio(accountSid,AuthToken)

export const enviarSMS =async (SMSbody,tel)=>{
try {
    const mensaje= await client.messages.create({
        body: SMSbody,
        from: twilioNumber,
        to: tel || verifyNumber 
    })
    logger.info(mensaje)
} catch (error) {
    logger.error(error)
}
}

export const enviarWSP =async(body)=>{
try{
       const mensaje= await client.messages.create({
        body: body,
        from: 'whatsapp:'+twilioNumberWSP,
        to: 'whatsapp:'+verifyNumberWSP
    })
    logger.info(mensaje)
} catch (error) {
    logger.error(error)
}
}
