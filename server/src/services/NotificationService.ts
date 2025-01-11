import { Notification } from "../models/Notification"; // Assuming you have a Notification model
import { Op } from "sequelize";

export class NotificationService {

  static async publishNotification(adminId: number, title: string, message: string): Promise<Notification> {
    try {
      const notification = await Notification.create({
        recepientId: adminId,
        title,
        message,
        read: false,
        
      });
      console.log(`Notification created for admin ${adminId}`);
      return notification;
    } catch (error:any) {
      console.error(`Error creating notification: ${error.message}`);
      throw new Error(`Failed to publish notification: ${error.message}`);
    }
  }

  static async getUnreadNotifications(adminId: number): Promise<Notification[]> {
    try {
      return await Notification.findAll({
        where: {
          recepientId: adminId,
          read: false,
        },
      });
    } catch (error:any) {
      console.error(`Error fetching unread notifications: ${error.message}`);
      throw new Error(`Failed to fetch unread notifications: ${error.message}`);
    }
  }

  static async markAsRead(notificationId: number): Promise<void> {
    try {
      const notification = await Notification.findByPk(notificationId);
      if (!notification) {
        throw new Error("Notification not found");
      }
      await notification.update({ read: true });
      console.log(`Notification ${notificationId} marked as read`);
    } catch (error:any) {
      console.error(`Error marking notification as read: ${error.message}`);
      throw new Error(`Failed to mark notification as read: ${error.message}`);
    }
  }
}
