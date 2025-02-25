export class VerificationService {
    /**
     * Generates a random numeric code of the given length.
     * @param length Number of digits for the code.
     * @returns A string representing the random code.
     */
    private static generateRandomCode(length: number): string {
      let code = "";
      for (let i = 0; i < length; i++) {
        code += Math.floor(Math.random() * 10); // Generates a digit between 0 and 9
      }
      return code;
    }
  
    /**
     * Generates an email verification code.
     * Typically a 6-digit numeric code.
     * @returns A string representing the email verification code.
     */
    static generateEmailVerificationCode(): string {
      return this.generateRandomCode(6);
    }
  
    /**
     * Generates a social media verification code for either WhatsApp or Telegram.
     * You can adjust the code length or even algorithm based on platform if needed.
     * @param platform The social media platform ('whatsapp' | 'telegram').
     * @returns A string representing the social media verification code.
     * @throws Error if an invalid platform is provided.
     */
    static generateSocialMediaVerificationCode(platform: 'whatsapp' | 'telegram'): string {
      // You can easily adjust code length or include custom logic per platform.
      if (platform !== 'whatsapp' && platform !== 'telegram') {
        throw new Error("Invalid social media platform. Supported platforms: whatsapp, telegram");
      }
      return this.generateRandomCode(6);
    }
  }
  