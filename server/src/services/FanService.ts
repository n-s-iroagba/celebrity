import { Fan } from "../models/Fan";
import { User } from "../models/User";

export class FanService {

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