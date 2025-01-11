import { Admin } from "../models/Admin";
import { NotificationService } from "./NotificationService";
import { WhatsAppService } from "./WhatsappService";


export class AdminService {
  // Update an admin's name fields (firstName and surname)
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

  // Delete an admin
  static async deleteAdmin(id: number): Promise<boolean> {
    const deleted = await Admin.destroy({ where: { id } });
    return deleted > 0;
  }

  static async notifyAdmin(adminId: number, notificationData: { subject: string, message?: string }): Promise<void> {
    try {
      const admin = await Admin.findByPk(adminId);
      if (!admin) {
        throw new Error("Admin not found");
      }

      const { subject, message = "You have a new notification" } = notificationData;

      await NotificationService.publishNotification(adminId, subject, message);

      if (admin.phoneNumber) {
        await WhatsAppService.sendAlert(admin.phoneNumber, message);
      }

    
      console.log(`Admin ${adminId} notified successfully`);

    } catch (error:any) {
      console.error(`Error notifying admin ${adminId}: ${error.message}`);
      throw new Error(`Failed to notify admin: ${error.message}`);
    }
  }
}
