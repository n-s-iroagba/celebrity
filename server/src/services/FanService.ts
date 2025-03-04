import { Role } from "../enums/Role";
import { Fan, FanCreationAttributes } from "../models/Fan";
import { User } from "../models/User";
import { MailService } from "./MailService";
import { UserService } from "./UserService";


export class FanService {

      static async createFan(fanData: Partial<Fan>,userData: Partial<User>): Promise<Fan> {
          const {
            firstName,
            surname,
            whatsappNumber,
            country,
            dateOfBirth,
          } = fanData;
        const {
          email,
          password,
        }= userData
          if (
            !firstName ||
            !surname ||
            !email||
            !password ||
            !whatsappNumber ||
            !country ||
            !dateOfBirth
          ) {
            throw new Error("Missing required fields");
          }
      
          const user = await UserService.createUser(Role.FAN, userData as {email:string, password:string})
    
         const fan = await Fan.create({
          firstName,
          surname,
          whatsappNumber,
          country,
          dateOfBirth,
          userId:user.id
        } as FanCreationAttributes);
    
        await MailService.sendVerificationEmail(user);
        return fan;
      }

  static async getAllFans(): Promise<Fan[]> {
    return await Fan.findAll();
  }

  static async getFanById(id: number): Promise<Fan | null> {
    return await Fan.findByPk(id);
  }

  static async updateFan(id: number, updates: Partial<Fan>): Promise<Fan | null> {
    const fan = await Fan.findByPk(id);
    if (!fan) return null;
    return await fan.update(updates);
  }

  static async deleteFan(userId: number): Promise<boolean> {
    const deleted = await User.destroy({ where: { id:userId
 } });
    return deleted > 0;
  }
}