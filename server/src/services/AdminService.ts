import { Role } from "../enums/Role";
import { Admin } from "../models/Admin";
import { User } from "../models/User";
import { MailService } from "./MailService";
import { NotificationService } from "./NotificationService";
import { UserService } from "./UserService";



export class AdminService {

  static async addAdmin(adminData: Partial <Admin>,userData: Partial<User>){
        const { firstName, surname,  } = adminData;
        const {
          email,
          password,
          whatsAppNumber
        }= userData
        if (
          !firstName ||
          !surname ||
          !email ||
          !password ||
          !whatsAppNumber
        ) {
          throw new Error("Missing required fields");
        }
    const user = await UserService.createUser(Role.ADMIN, userData as {email:string,password:string,whatsAppNumber:string})
    const admin = await Admin.create({
      firstName, surname, userId: user.id,
  
    })
    await MailService.sendVerificationEmail(user);
    return admin;

  }

  static async updateAdminName(
    id: number,
    updates: { firstName?: string; surname?: string }
  ): Promise<Admin> {
    const admin = await Admin.findByPk(id);
    if (!admin) {
      throw new Error("Admin not found");
    }

    if (updates.firstName) {
      admin.firstName = updates.firstName;
    }

    if (updates.surname) {
      admin.surname = updates.surname;
    }

    return await admin.save();
  }



  static async notifyAdmin(adminId: number, notificationData: { subject: string, message?: string }): Promise<void> {
    try {
      const admin = await Admin.findByPk(adminId);
      if (!admin) {
        throw new Error("Admin not found");
      }

      const { subject, message = "You have a new notification" } = notificationData;

      await NotificationService.publishNotification(adminId, subject, message);
    
      console.log(`Admin ${adminId} notified successfully`);

    } catch (error:any) {
      console.error(`Error notifying admin ${adminId}: ${error.message}`);
      throw new Error(`Failed to notify admin: ${error.message}`);
    }
  }
}
