import twilio from 'twilio';

export class WhatsAppService {
  private static client = twilio('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');

  static async sendAlert(phoneNumber: string, message: string): Promise<void> {
    try {
      await this.client.messages.create({
        body: message,
        from: 'whatsapp:+14155238886',  // Twilio WhatsApp Sandbox Number
        to: `whatsapp:${phoneNumber}`,
      });
      console.log(`WhatsApp message sent to ${phoneNumber}`);
    } catch (error:any) {
      console.error(`Error sending WhatsApp message to ${phoneNumber}: ${error.message}`);
      throw new Error(`Failed to send WhatsApp message: ${error.message}`);
    }
  }
}
