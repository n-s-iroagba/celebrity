import axios from "axios";
import twilio from "twilio";
import dotenv from "dotenv";
import { Fan } from "../models/Fan";

dotenv.config();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);


export class WhatsappService {

static generateAndSendWhatsappCodeAndUpdateFan = async (fan:Fan)=>{
  const verificationCode = Math.floor(100000 + Math.random() * 900000);
  fan.whatsappCode = String(verificationCode);
  await WhatsappService.sendWhatsAppVerification(fan.whatsappNumber, verificationCode);
 
}

static  sendWhatsAppVerification = async (phoneNumber: string, verificationCode:number) => {
  await client.messages.create({
    from: "whatsapp:+14155238886", 
    to: `whatsapp:${phoneNumber}`,
    body: `Your verification code is: ${verificationCode}`,
  });
};

}
