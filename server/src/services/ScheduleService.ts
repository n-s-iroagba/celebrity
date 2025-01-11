import { Schedule, ScheduleAttributes } from "../models/Schedule";
import { Admin } from "../models/Admin";
import { Op } from "sequelize";
import { AdminService } from "./AdminService";

export class ScheduleService {

  // Create a new Schedule entry
  static async createSchedule(data: Omit<ScheduleAttributes, 'id'>): Promise<Schedule> {
    try {
      const schedule = await Schedule.create(data);
      return schedule;
    } catch (error:any) {
      throw new Error(`Error creating schedule: ${error.message}`);
    }
  }

  // Get all Schedule entries
  static async getAllSchedules(): Promise<Schedule[]> {
    try {
      return await Schedule.findAll();
    } catch (error:any) {
      throw new Error(`Error fetching schedules: ${error.message}`);
    }
  }

  // Get Schedule entry by ID
  static async getScheduleById(id: number): Promise<Schedule | null> {
    try {
      return await Schedule.findByPk(id);
    } catch (error:any) {
      throw new Error(`Error fetching schedule by id: ${error.message}`);
    }
  }

  // Get all schedules by adminId
  static async getSchedulesByAdminId(adminId: number): Promise<Schedule[]> {
    try {
      return await Schedule.findAll({
        where: {
          adminId
        }
      });
    } catch (error:any) {
      throw new Error(`Error fetching schedules by admin ID: ${error.message}`);
    }
  }

  // Update the isBooked field and check if schedules are less than 4
  static async updateIsBooked(id: number, isBooked: boolean): Promise<Schedule | null> {
    try {
      const schedule = await Schedule.findByPk(id);
      if (!schedule) {
        throw new Error("Schedule not found");
      }

      // Update the isBooked status
      await schedule.update({ isBooked });

      // Check if the admin has less than 4 booked schedules
      const bookedSchedulesCount = await Schedule.count({
        where: {
          adminId: schedule.adminId,
          isBooked: false
        }
      });

      // If less than 4 booked schedules, update the Admin
      if (bookedSchedulesCount < 4) {
        const admin = await Admin.findByPk(schedule.adminId);
        if (admin) {
     
          await AdminService.notifyAdmin(admin.id,{subject:'booking count'});
        }
      }

      return schedule;
    } catch (error:any) {
      throw new Error(`Error updating isBooked status: ${error.message}`);
    }
  }

  // Update other fields of a Schedule entry
  static async updateSchedule(id: number, data: Partial<ScheduleAttributes>): Promise<Schedule | null> {
    try {
      const schedule = await Schedule.findByPk(id);
      if (!schedule) {
        throw new Error("Schedule not found");
      }

      return await schedule.update(data);
    } catch (error:any) {
      throw new Error(`Error updating schedule: ${error.message}`);
    }
  }

  // Delete a Schedule entry
  static async deleteSchedule(id: number): Promise<boolean> {
    try {
      const schedule = await Schedule.findByPk(id);
      if (!schedule) {
        throw new Error("Schedule not found");
      }

      await schedule.destroy();
      return true;
    } catch (error:any) {
      throw new Error(`Error deleting schedule: ${error.message}`);
    }
  }
}
