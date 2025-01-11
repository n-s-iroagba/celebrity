import { Shoutout } from "../models/Shoutout";
import { Fan } from "../models/Fan";
import { Celebrity } from "../models/Celebrity";

export class ShoutoutService {

  static async createShoutiut(fanId: number, celebrityId: number, message: string): Promise<Shoutout> {
    try {
      const shoutout = await Shoutout.create({
        fanId,
        celebrityId,
        message,
        status: 'pending',
      });
      return shoutout;
    } catch (error:any) {
      throw new Error(`Failed to create shoutout: ${error.message}`);
    }
  }

  static async getShoutoutsByFan(fanId: number): Promise<Shoutout[]> {
    try {
      return await Shoutout.findAll({
        where: { fanId },
        include: [
          { model: Celebrity, attributes: ['id', 'name'] },
        ],
      });
    } catch (error:any) {
      throw new Error(`Failed to fetch shoutouts for fan: ${error.message}`);
    }
  }

  static async getShoutoutsByCelebrity(celebrityId: number): Promise<Shoutout[]> {
    try {
      return await Shoutout.findAll({
        where: { celebrityId },
        include: [
          { model: Fan, attributes: ['id', 'name'] },
        ],
      });
    } catch (error:any) {
      throw new Error(`Failed to fetch shoutouts for celebrity: ${error.message}`);
    }
  }

  static async getAllShoutouts(): Promise<Shoutout[]> {
    try {
      return await Shoutout.findAll();
    } catch (error:any) {
      throw new Error(`Failed to fetch all shoutouts: ${error.message}`);
    }
  }
}
